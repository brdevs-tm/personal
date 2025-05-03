"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code, Database, Layout, Server } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import "./skills.css";

export default function Skills() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  const skills = [
    {
      name: "Frontend",
      icon: <Layout size={48} />,
      description: "Next.js, React, TailwindCSS",
      proficiency: 90,
    },
    {
      name: "Backend",
      icon: <Server size={48} />,
      description: "Node.js, Express, REST APIs",
      proficiency: 85,
    },
    {
      name: "Database",
      icon: <Database size={48} />,
      description: "PostgreSQL, MongoDB, MySQL",
      proficiency: 80,
    },
    {
      name: "Tools",
      icon: <Code size={48} />,
      description: "Git, Vercel, Hosting, Docker",
      proficiency: 75,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;
    let mouse = { x: null, y: null };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = theme === "dark" ? "#00C9A7" : "#0EA5E9";
        this.life = window.innerWidth <= 768 ? 15 : 25; // Mobil uchun qisqaroq umr
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.size -= 0.05;
        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            this.color = theme === "dark" ? "#FF6B6B" : "#F43F5E";
            this.size = Math.min(this.size + 0.1, 5);
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.fillStyle =
        theme === "dark"
          ? "rgba(60, 64, 67, 0.05)"
          : "rgba(249, 250, 251, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (window.innerWidth > 768) {
        particles.push(new Particle(mouse.x, mouse.y)); // Mobil uchun partikullar kamroq
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
    <section id="skills" className="skills-section">
      <canvas ref={canvasRef} className="skills-canvas" />
      <div className="skills-container">
        <h2 className="skills-title">My Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="skill-card"
            >
              <motion.div
                className="skill-icon"
                whileHover={{ scale: 1.2, rotate: 15 }}
              >
                {skill.icon}
              </motion.div>
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-description">{skill.description}</p>
              <div className="skill-progress">
                <motion.div
                  className="skill-progress-bar"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
