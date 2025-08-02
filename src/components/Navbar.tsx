import logo from "../assets/logo.png";
import { Dashboard } from "../assets/Icon";
import { Performance } from "../assets/Icon";
import { Account } from "../assets/Icon";
import { Settings } from "../assets/Icon";
import { Premium } from "../assets/Icon";
const Navbar = () => {
  return (
    <div>
      <div className="flex w-full p-8">
        <img src={logo} alt="logo" />
        <h1 className="font-bebas text-xl">socialstat</h1>
      </div>
      <div className="flex flex-col gap-2 text-md">
        <div className="group flex items-center gap-2 p-2 border-l-4 border-transparent hover:border-l-red-400 hover:bg-red-100">
          <Dashboard className="text-gray-600 group-hover:text-orange-500 transition-colors duration-200" />
          <h1 className="group-hover:text-orange-500 transition-colors duration-200">
            Dashboard
          </h1>
        </div>

        <div className="group flex items-center gap-2 p-2 border-l-4 border-transparent hover:border-l-red-400 hover:bg-red-100">
          <Performance className="text-gray-600 group-hover:text-orange-500 transition-colors duration-200" />
          <h1 className="group-hover:text-orange-500 transition-colors duration-200">
            Performance
          </h1>
        </div>
        <div className="group flex items-center gap-2 p-2 border-l-4 border-transparent hover:border-l-red-400 hover:bg-red-100">
          <Account className="text-gray-600 group-hover:text-orange-500 transition-colors duration-200" />
          <h1 className="group-hover:text-orange-500 transition-colors duration-200">
            Account
          </h1>
        </div>
        <div className="group flex items-center gap-2 p-2 border-l-4 border-transparent hover:border-l-red-400 hover:bg-red-100">
          <Settings className="text-gray-600 group-hover:text-orange-500 transition-colors duration-200" />
          <h1 className="group-hover:text-orange-500 transition-colors duration-200">
            Settings
          </h1>
        </div>
        <div className="group flex items-center gap-2 p-2 border-l-4 border-transparent hover:border-l-red-400 hover:bg-red-100">
  <Premium className="text-gray-600 group-hover:text-orange-500 transition-colors duration-200" />
  <h1 className="group-hover:text-orange-500 transition-colors duration-200">Premium</h1>
</div>
      </div>
    </div>
  );
};

export default Navbar;
