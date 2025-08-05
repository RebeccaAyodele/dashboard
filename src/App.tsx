import Header from "./components/Header";
import WorldMap from "./components/WorldMap";
import Navbar from "./components/Navbar";
import Socials from "./components/Socials";
import User from "./components/User";
import VisitorsChart from "./components/VisitorsChart";

const App = () => {
  return (
    <div className="dark:bg-black dark:text-white relative">
      <div className="flex">
        <div className="w-[15%] h-screen border-r-[0.2px]">
          <Navbar />
        </div>
        <div className="w-full">
          <Header />
          <Socials />
          <User />
          <VisitorsChart />
          <WorldMap />
        </div>
      </div>
      {/* <div className="absolute top-24 left-72">
        <Socials />
      </div> */}
    </div>
  );
};

export default App;
