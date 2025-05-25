"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X, User } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import "./navbar.css";

const useParticleSystem = (canvasRef, theme, isMobile) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const maxParticles = isMobile ? 20 : 50;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = isMobile ? 60 : window.innerWidth <= 1024 ? 70 : 80;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * (isMobile ? 2 : 3) + 1;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = theme === "dark" ? "#00C9A7" : "#0EA5E9";
        this.life = isMobile ? 20 : 30;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.size = Math.max(0, this.size - (isMobile ? 0.07 : 0.05));
      }

      draw() {
        if (this.size <= 0) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const drawConnections = () => {
      const maxDistance = isMobile ? 50 : 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(${
              theme === "dark" ? "0, 201, 167" : "14, 165, 233"
            }, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.life > 0 && p.size > 0);
      drawConnections();
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      if (particles.length < maxParticles) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleInteraction = (e, isTouch = false) => {
      if (particles.length >= maxParticles) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;
      const x = Math.max(0, Math.min(clientX - rect.left, canvas.width));
      const y = Math.max(0, Math.min(clientY - rect.top, canvas.height));
      if (y < canvas.height && x >= 0 && x <= canvas.width) {
        particles.push(new Particle(x, y));
      }
    };

    const handleMouseMove = (e) => handleInteraction(e);
    const handleTouchMove = (e) => handleInteraction(e, true);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isMobile]);
};

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef(null);
  const menuRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  useParticleSystem(canvasRef, theme, isMobile);

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
    console.log("Toggle theme button clicked, current theme:", theme);
    toggleTheme();
  };

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.08 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20, rotate: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <canvas ref={canvasRef} className="navbar-canvas" aria-hidden="true" />
      <div className="navbar-container">
        <motion.a
          href="#home"
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => handleNavClick(e, "#home")}
          aria-label="HamidovDev Home"
        >
          HamidovDev
        </motion.a>

        <div className="navbar-links hidden md:flex">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="navbar-link"
              whileHover={{ scale: 1.05, y: -2 }}
              aria-label={`Go to ${item.name} section`}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="navbar-hire-btn"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Hire Me"
            rel="noopener noreferrer"
          >
            <User size={16} /> Hire Me
          </motion.a>
          <motion.button
            onClick={handleToggleTheme}
            className="navbar-theme-toggle"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>
        </div>

        <button
          className="navbar-mobile-toggle md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          className="navbar-mobile-menu md:hidden"
          id="mobile-menu"
          ref={menuRef}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="menu"
        >
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="navbar-mobile-link"
              variants={menuItemVariants}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              role="menuitem"
              aria-label={`Go to ${item.name} section`}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="navbar-mobile-hire-btn"
            variants={menuItemVariants}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            role="menuitem"
            aria-label="Hire Me"
            rel="noopener noreferrer"
          >
            <User size={16} /> Hire Me
          </motion.a>
          <motion.button
            onClick={handleToggleTheme}
            className="navbar-mobile-theme-toggle"
            variants={menuItemVariants}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            role="menuitem"
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </motion.button>
        </motion.div>
      )}
    </nav>
  );
}
