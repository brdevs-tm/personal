"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import "./about.css";

export default function About() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
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
        this.life = window.innerWidth <= 768 ? 20 : 30; // Mobil uchun qisqaroq umr
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
      particles.push(new Particle(mouse.x, mouse.y));
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <section id="about" className="about-section">
      <canvas ref={canvasRef} className="about-canvas" />
      <div className="about-container">
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="about-avatar-container"
        >
          <Image
            src="/images/avatar.png"
            alt="Hamidov Avatar"
            width={240}
            height={240}
            className="about-avatar"
          />
        </motion.div>

        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="about-content"
        >
          <h2 className="about-title">About Me</h2>
          <p className="about-description">
            I'm <span className="font-semibold">Hamidov</span> — a passionate
            Full Stack Developer who blends aesthetics with functionality. I
            specialize in building seamless, modern, and user-focused web
            applications using <strong>Next.js</strong>,{" "}
            <strong>TailwindCSS</strong>, <strong>Node.js</strong>, and{" "}
            <strong>PostgreSQL</strong>. Whether it’s a dynamic dashboard or a
            stunning landing page, I bring innovation and clean code to every
            line I write.
          </p>
          <motion.a
            href="/files/Resume.pdf"
            download="Resume_Jahongir_Hamidov.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="about-resume-btn"
          >
            <Download size={20} />
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
