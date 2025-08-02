import { Add, Dribble, Facebook, Instagram, Twitter, Youtube } from "../assets/Icon";

const Socials = () => {
  return (
    <div className="flex flex-wrap justify-between gap-4 p-4 w-[90%] mx-auto mt-12">
  <div className="flex-1 h-28 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-red-400 hover:text-white transition duration-200">
    <Add />
  </div>
  <div className="group flex-1 h-28 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-red-400 hover:text-white transition duration-200">
    <Dribble className="group-hover:text-red-400" />
  </div>
  <div className="flex-1 h-28 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-red-400 hover:text-white transition duration-200">
    <Instagram />
  </div>
  <div className="flex-1 h-28 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-red-400 hover:text-white transition duration-200">
    <Youtube />
  </div>
  <div className="group flex-1 h-28 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-red-400 hover:text-white transition duration-200">
    <Facebook className="group-hover:text-red-400" />
  </div>
  <div className="flex-1 h-28 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-red-400 hover:text-white transition duration-200">
    <Twitter />
  </div>
</div>

  );
};

export default Socials;
