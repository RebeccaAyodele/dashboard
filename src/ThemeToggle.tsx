import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

 
  const toggleTheme = () => {
    const html = document.documentElement;
    const isNowDark = !isDark;

    html.classList.toggle("dark", isNowDark);
    localStorage.setItem("theme", isNowDark ? "dark" : "light");
    setIsDark(isNowDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 h-12 rounded-xl bg-gray-200 text-black dark:bg-gray-800 dark:text-white transition-all"
    >
      {isDark ? "🌞" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
