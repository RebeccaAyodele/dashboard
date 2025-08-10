import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { feature } from "topojson-client";

// Type for API data
type CountryData = {
  country: string;
  countryCode: string; // ISO_A3 code like 'NGA'
  visitors: string;
  percentage: number;
  color: string;
};

// Fetch API
const fetchCountryStats = async (): Promise<CountryData[]> => {
  const res = await axios.get("http://localhost:3000/worldMap");
  console.log("API response:", res.data);
  return res.data.worldMap?.flat() || [];
};

// Numeric country code (from topojson) to ISO_A3 mapping
const numericToISO3: Record<string, string> = {
  "840": "USA",
  "36": "AUS",
  "566": "NGA",
  "156": "CHN",
  "554": "NZL",
  "242": "Fiji",
  "834" : "Tanzania",
  "732": "W. Sahara",
  "124" : "Canada",
};

const getISO3FromNumeric = (id: unknown): string | undefined => {
  if (typeof id === "string" || typeof id === "number") {
    return numericToISO3[id.toString()];
  }
  return undefined;
};

const WorldMap = () => {
  const [geographies, setGeographies] = useState<any[]>([]);
  const { data: countryStats, isLoading } = useQuery({
    queryKey: ["countryStats"],
    queryFn: fetchCountryStats,
  });

  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Load country shape data and enrich with ISO_A3
  useEffect(() => {
    const fetchGeo = async () => {
      const res = await fetch(
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
      );
      const world = await res.json();
      const countries = feature(world, world.objects.countries) as any;

      countries.features.forEach((feature: any) => {
        const iso3 = getISO3FromNumeric(feature.id);
        feature.properties.ISO_A3 = iso3 || "";
      });

      setGeographies(countries.features);
    };
    fetchGeo();
  }, []);

  useEffect(() => {
    if (geographies.length) {
      console.log("Sample geographies:", geographies.slice(0, 5).map(g => ({
        id: g.id,
        name: g.properties.name,
      })));
    }
  }, [geographies]);
  

  // Get color for each country region
  const getColor = (code: string): string => {
    const country = countryStats?.find((c) => c.countryCode === code);
    return country?.color || "#e5e7eb";
  };
  

  useEffect(() => {
    console.log("Country stats loaded:", countryStats);
  }, [countryStats]);

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl mx-auto mt-8 px-4">
      {/* Map Section */}
      <div className="w-full md:w-3/4 relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Visitor Map</h2>

        {isLoading ? (
          <div className="text-center text-gray-500">Loading map...</div>
        ) : (
          <ComposableMap projectionConfig={{ scale: 150 }}>
            <Geographies
              geography={{ features: geographies, type: "FeatureCollection" }}
            >
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => {
                  const code =
                    getISO3FromNumeric(geo.id) || geo.properties.ISO_A3 || "";
                  const country = countryStats?.find(
                    (c) => c.countryCode === code
                  );
                  console.log("Geo ID:", geo.id, "ISO3 code:", code, "Country match:", country);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e: any) => {
                        if (country) {
                          setTooltipContent(
                            `${geo.properties.name}\n${country.visitors} visitors (${country.percentage}%)`
                          );
                        } else {
                          setTooltipContent(`${geo.properties.name}\nNo data`);
                        }
                        setTooltipPos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => {
                        setTooltipContent(null);
                      }}
                      style={{
                        default: {
                          fill: getColor(code),
                          outline: "none",
                        },
                        hover: {
                          fill: "#FFD700",
                          outline: "none",
                        },
                        pressed: {
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        )}

        {/* Tooltip */}
        {tooltipContent && (
          <div
            className="absolute z-50 bg-white text-sm text-gray-800 border border-gray-300 px-3 py-2 rounded-lg shadow-lg pointer-events-none"
            style={{
              top: tooltipPos.y + 10,
              left: tooltipPos.x + 10,
            }}
          >
            {tooltipContent.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}
      </div>

      {/* Side Panel */}
      <div className="w-full md:w-1/4">
        <h3 className="text-xl font-semibold mb-4">Country Stats</h3>
        {countryStats && countryStats.length > 0 ? (
          <ul className="space-y-3">
            {countryStats.map((country) => (
              <li
                key={country.countryCode}
                className="flex items-center gap-3 p-3 bg-white rounded shadow"
              >
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: country.color }}
                ></span>
                <div className="flex-1">
                  <p
                    className="font-semibold"
                    style={{ color: country.color }}
                  >
                    {country.country}
                  </p>
                  <p className="text-sm" style={{ color: country.color }}>
                    {country.visitors} visitors ({country.percentage}%)
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No country data available.</p>
        )}
      </div>
    </div>
  );
};

export default WorldMap;
