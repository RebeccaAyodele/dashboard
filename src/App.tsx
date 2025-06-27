import Header from "./components/Header"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div className="flex dark:bg-black dark:text-white">
        <div className="w-[15%] h-screen border-r-[0.2px]">
            <Navbar />
        </div>
        <Header />
    </div>
  )
}

export default App