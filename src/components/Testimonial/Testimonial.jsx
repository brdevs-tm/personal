"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";
import "./testimonial.css";

export default function Testimonials() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  const testimonials = [
    {
      name: "John Doe",
      role: "CEO, TechCorp",
      text: "Hamidov’s work was outstanding! He delivered a seamless e-commerce platform ahead of schedule.",
      avatar: "/images/avatar1.png",
      rating: 5,
    },
    {
      name: "Jane Smith",
      role: "Project Manager, Innovate",
      text: "His attention to detail and creative solutions made our app a success. Highly recommended!",
      avatar: "/images/avatar2.png",
      rating: 4,
    },
    {
      name: "Alex Brown",
      role: "CTO, StartUp",
      text: "Hamidov’s expertise in full-stack development transformed our vision into reality.",
      avatar: "/images/avatar3.png",
      rating: 5,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
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
    <section id="testimonials" className="testimonials-section">
      <canvas ref={canvasRef} className="testimonials-canvas" />
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Clients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="testimonial-card"
            >
              <motion.div
                className="testimonial-avatar"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="avatar-image"
                />
              </motion.div>
              <Quote className="testimonial-quote" size={32} />
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-info">
                <h4 className="testimonial-name">{testimonial.name}</h4>
                <p className="testimonial-role">{testimonial.role}</p>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`rating-star ${
                        i < testimonial.rating ? "filled" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
