// VisitorCharts.tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Cell
} from "recharts";
import { useMemo } from "react";

interface DailyVisitor {
  time: string;
  visitors: number;
  shortTime?: string;
}

interface MonthlyVisitor {
  month: string;
  visitors: number;
}

const fetchDailyVisitors = async (): Promise<DailyVisitor[]> => {
  const { data } = await axios.get("http://localhost:4000/dailyVisitors");
  return data;
};

const fetchMonthlyVisitors = async (): Promise<MonthlyVisitor[]> => {
  const { data } = await axios.get("http://localhost:4000/monthlyVisitors");
  return data;
};

// Custom Tooltip for daily chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-orange-400 text-white p-2 rounded shadow text-sm">
        <p>{`Time: ${label}`}</p>
        <p>{`Visitors: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for bar chart
const BarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-red-400 text-white p-2 rounded shadow text-sm">
        <p>{`Month: ${label}`}</p>
        <p>{`Visitors: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const VisitorCharts = () => {
  const { data: dailyData = [], isLoading: loadingDaily } = useQuery({
    queryKey: ['dailyVisitors'],
    queryFn: fetchDailyVisitors
  });

  const { data: monthlyData = [], isLoading: loadingMonthly } = useQuery({
    queryKey: ['monthlyVisitors'],
    queryFn: fetchMonthlyVisitors
  });

  const formattedDailyData = useMemo(() => {
    return dailyData.map((item: DailyVisitor) => ({
      ...item,
      shortTime: item.time.split(":")[0] + ":00",
    }));
  }, [dailyData]);

const colors = ['#ffbc61', 'orange', 'yellow', 'lightblue','blue', 'green', 'purple'];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};


  if (loadingDaily || loadingMonthly) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="grid gap-8 md:grid-cols-2 p-4 dark:bg-black dark:text-white">
      {/* Daily Visitors Area Chart */}
      <div>
        <h2 className="uppercase text-xl font-bebas ml-4 mb-2">Daily Visitors</h2>
        <div className="w-full h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedDailyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis 
                dataKey="shortTime" 
                tickFormatter={(value: string, index: number) => index % 1 === 0 ? value : ''} 
              />
              <YAxis tickFormatter={(value: number) => `${Math.floor(value / 1000)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="visitors" stroke="#f97316" fillOpacity={1} fill="url(#orangeGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Visitors Bar Chart */}
      <div>
        <h2 className="uppercase text-xl font-bebas ml-4 mb-2">Monthly Visitors</h2>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value: number) => `${Math.floor(value / 1000)}k`} />
            <Tooltip content={<BarTooltip />} />
            <Bar dataKey="visitors" radius={[5, 5, 0, 0]}>
              {monthlyData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={getRandomColor()} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisitorCharts;
