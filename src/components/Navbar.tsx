import logo from "../assets/logo.png"
import dashboard from "../assets/dashboard.png"
import performance from "../assets/performance.png"
import account from "../assets/account.png"
import setting from "../assets/setting.png"
import premium from "../assets/premium.png"

const Navbar = () => {
  return (
    <div>
        <div className="flex w-full p-8">
            <img src={logo} alt="logo" />
            <h1 className="font-bebas text-xl">socialstat</h1>
        </div>
        <div className="flex flex-col gap-2 text-md">
            <div className="hover:border-l-red-400 flex hover:text-red-400 hover:bg-red-100 p-2 border-transparent border-l-4">
                <img src={dashboard} alt="dashboard" />
                <h1>Dashboard</h1>
            </div>
            <div className="hover:border-l-red-400 flex hover:text-red-400 hover:bg-red-100 p-2 border-transparent border-l-4">
                <img src={performance} alt="performance" />
                <h1>Performance</h1>
            </div>
            <div className="hover:border-l-red-400 flex hover:text-red-400 hover:bg-red-100 p-2 border-transparent border-l-4">
                <img src={account} alt="account" />
                <h1>Account</h1>
            </div>
            <div className="hover:border-l-red-400 flex hover:text-red-400 hover:bg-red-100 p-2 border-transparent border-l-4">
                <img src={setting} alt="setting" />
                <h1>Settings</h1>
            </div>
            <div className="hover:border-l-red-400 flex hover:text-red-400 hover:bg-red-100 p-2 border-transparent border-l-4">
                <img src={premium} alt="premium" />
                <h1>Premium</h1>
            </div>
        </div>
    </div>
  )
}

export default Navbar