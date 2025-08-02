import ThemeToggle from "../ThemeToggle";
import search from "../assets/search.png";
import notification from "../assets/Notification.png";
import Settings from "../assets/Settings.png";
import profile from "../assets/Profile.png";
import arrow from "../assets/arrow.png";

const Header = () => {
  return (
    <div className="h-16 justify-center items-center flex px-6">
      <div className="flex w-full justify-between">
        <div className="flex gap-64 bg-gray-100 px-4 py-2 rounded-xl">
          <p>Search</p>
          <img src={search} className="w-6 h-6" alt="search" />
        </div>
        <div className="flex gap-8 mr-6 items-center">
          <div className="flex text-sm bg-gray-100 p-[4px] rounded-xl gap-12 mr-4">
            <p>PewDiePie</p>
            <img src={arrow} className="w-6 h-6" alt="arrow" />
          </div>
          <img src={notification} className="w-6 h-6" alt="notification" />
          <img src={Settings} className="w-6 h-6" alt="settings" />
          <img src={profile} className="w-6 h-6" alt="profile" />
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Header;
