"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ZoomIn, X } from "lucide-react";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";
import "./awards.css";

export default function Awards() {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const [filter, setFilter] = useState("All");
  const [selectedAward, setSelectedAward] = useState(null);

  const awards = [
    {
      title: "National Coding Olympiad",
      description: "Gold Medal in Competitive Programming",
      date: "June 2024",
      category: "Olimpiada",
      image: "/images/award1.jpg",
    },
    {
      title: "University Degree",
      description: "Bachelor’s Degree in Computer Science with Honors",
      date: "May 2023",
      category: "Bitiruv",
      image: "/images/award2.jpg",
    },
    {
      title: "Hackathon Champion",
      description: "1st Place in Regional Hackathon for Best Web App",
      date: "October 2022",
      category: "Olimpiada",
      image: "/images/award3.jpg",
    },
    {
      title: "Online Course Certificate",
      description: "Advanced Full Stack Development from Coursera",
      date: "January 2022",
      category: "Boshqa",
      image: "/images/award4.jpg",
    },
  ];

  const categories = ["All", "Olimpiada", "Bitiruv", "Boshqa"];
  const filteredAwards =
    filter === "All" ? awards : awards.filter((a) => a.category === filter);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
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
    <section id="awards" className="awards-section">
      <canvas ref={canvasRef} className="awards-canvas" />
      <div className="awards-container">
        <h2 className="awards-title">My Awards & Certificates</h2>
        <div className="awards-filter">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`filter-btn ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
        <div className="awards-grid">
          {filteredAwards.map((award, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="award-card"
            >
              <motion.div className="award-image" whileHover={{ scale: 1.05 }}>
                <Image
                  src={award.image}
                  alt={award.title}
                  width={300}
                  height={200}
                  className="award-image-preview"
                />
              </motion.div>
              <div className="award-content">
                <Award className="award-icon" size={32} />
                <h3 className="award-title">{award.title}</h3>
                <p className="award-description">{award.description}</p>
                <div className="award-footer">
                  <span className="award-date">{award.date}</span>
                  <motion.button
                    className="award-zoom-btn"
                    onClick={() => setSelectedAward(award)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ZoomIn size={20} /> View Certificate
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedAward && (
          <motion.div
            className="award-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="award-modal-content">
              <motion.button
                className="award-modal-close"
                onClick={() => setSelectedAward(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} />
              </motion.button>
              <Image
                src={selectedAward.image}
                alt={selectedAward.title}
                width={800}
                height={600}
                className="award-modal-image"
              />
              <div className="award-modal-info">
                <h3 className="award-modal-title">{selectedAward.title}</h3>
                <p className="award-modal-description">
                  {selectedAward.description}
                </p>
                <span className="award-modal-date">{selectedAward.date}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
