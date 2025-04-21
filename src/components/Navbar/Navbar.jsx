"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X, User } from "lucide-react";
import useTheme from "@/hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleToggleTheme = () => {
    console.log("Toggle theme button clicked, current theme:", theme);
    toggleTheme();
  };

  return (
    <nav className="fixed top-0 w-full z-50 py-4 px-4 card">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.a
          href="#home"
          className="text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => handleNavClick(e, "#home")}
        >
          HamidovDev
        </motion.a>

        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium hover:text-[var(--accent)] transition-colors"
            >
              {item.name}
            </a>
          ))}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--text)] font-semibold hire-me-btn pulse"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User size={16} /> Hire Me
          </motion.a>
          <motion.button
            onClick={handleToggleTheme}
            className="p-2 rounded-full bg-[var(--secondary-bg)]"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          className="md:hidden mt-4 flex flex-col gap-4 p-4 rounded-lg bg-[var(--secondary-bg)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium hover:text-[var(--accent)]"
            >
              {item.name}
            </a>
          ))}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--text)] font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            <User size={16} /> Hire Me
          </motion.a>
          <motion.button
            onClick={handleToggleTheme}
            className="p-2 rounded-full flex items-center gap-2 bg-[var(--border)]"
            whileHover={{ scale: 1.05 }}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </motion.button>
        </motion.div>
      )}
    </nav>
  );
}
