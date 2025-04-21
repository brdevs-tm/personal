"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-[var(--secondary-bg)] text-[var(--text-primary)]"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
