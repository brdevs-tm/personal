"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X, User } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import "./navbar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef(null);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", href: "#blog" },
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
    toggleTheme();
    window.location.reload();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth > 768 ? 80 : 60;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = theme === "dark" ? "#00C9A7" : "#0EA5E9";
        this.life = 30;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.size -= 0.05;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    if (window.innerWidth > 768) {
      animate();
    }

    const handleMouseMove = (e) => {
      if (window.innerWidth <= 768) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (y < canvas.height) {
        particles.push(new Particle(x, y));
      }
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <nav className="navbar">
      <canvas ref={canvasRef} className="navbar-canvas" />
      <div className="navbar-container">
        <motion.a
          href="#home"
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => handleNavClick(e, "#home")}
        >
          HamidovDev
        </motion.a>

        <div className="navbar-links">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="navbar-link"
            >
              {item.name}
            </a>
          ))}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="navbar-hire-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User size={16} /> Hire Me
          </motion.a>
          <motion.button
            onClick={handleToggleTheme}
            className="navbar-theme-toggle"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>
        </div>

        <button
          className="navbar-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          className="navbar-mobile-menu"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="navbar-mobile-content">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="navbar-mobile-link"
              >
                {item.name}
              </a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="navbar-mobile-hire-btn"
              whileHover={{ scale: 1.05 }}
            >
              <User size={16} /> Hire Me
            </motion.a>
            <motion.button
              onClick={handleToggleTheme}
              className="navbar-mobile-theme-toggle"
              whileHover={{ scale: 1.05 }}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
