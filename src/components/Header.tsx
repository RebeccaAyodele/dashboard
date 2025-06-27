import ThemeToggle from "../ThemeToggle"
import search from "../assets/search.png"
import notification from "../assets/Notification.png"
import settings from "../assets/Settings.png"
import profile from "../assets/Profile.png"
import arrow from "../assets/arrow.png"


const Header = () => {
  return (
    <div className="h-44 flex bg-blue-200 w-screen">
        <div className="flex">
          <div className="flex justify-between">
            <p>Search</p>
            <img src={search} className="w-6 h-6" alt="search" />
          </div>
          <div className="flex">
            <p>PewDiePie</p>
            <img src={arrow} className="w-6 h-6" alt="arrpw" />
            <img src={notification} className="w-6 h-6" alt="notification" />
            <img src={settings} className="w-6 h-6" alt="settings" />
            <img src={profile} className="w-6 h-6" alt="profile" />
          </div>
        <ThemeToggle />
        </div>
    </div>
  )
}

export default Header