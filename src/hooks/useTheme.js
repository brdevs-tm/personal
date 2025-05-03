import { useState, useEffect } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(`${savedTheme}-theme`);
    // Silliq o‘tish uchun transition qo‘shish
    document.documentElement.style.transition = "all 0.3s ease";
    console.log("Initial theme set:", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light-theme", "dark-theme");
    document.documentElement.classList.add(`${newTheme}-theme`);
    console.log("Theme toggled to:", newTheme);
  };

  return { theme, toggleTheme };
}
