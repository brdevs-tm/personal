"use client";

import { useEffect, useRef } from "react";
import useTheme from "@/hooks/useTheme";

export default function WaveBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let mouse = { x: null, y: null };

    // Canvas setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Wave grid settings
    const gridSize = 50;
    const cols = Math.ceil(canvas.width / gridSize) + 1;
    const rows = Math.ceil(canvas.height / gridSize) + 1;
    let wavePoints = [];

    // Initialize wave points
    for (let x = 0; x < cols; x++) {
      wavePoints[x] = [];
      for (let y = 0; y < rows; y++) {
        wavePoints[x][y] = { z: 0, vz: 0 };
      }
    }

    // Particle settings
    let particles = [];
    const numParticles = Math.floor((canvas.width * canvas.height) / 15000);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = theme === "dark" ? "#00C9A7" : "#0EA5E9";
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150 && mouse.x !== null) {
          this.size = Math.min(this.size + 0.1, 5);
          this.color = theme === "dark" ? "#FF6B6B" : "#F43F5E";
        } else {
          this.size = Math.max(this.size - 0.05, 1);
          this.color = theme === "dark" ? "#00C9A7" : "#0EA5E9";
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    // Animation loop
    let time = 0;
    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle =
        theme === "dark"
          ? "rgba(60, 64, 67, 0.05)"
          : "rgba(249, 250, 251, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update wave points
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const angle = (x + y + time * 0.05) * 0.2;
          wavePoints[x][y].z = Math.sin(angle) * 50;
        }
      }

      // Draw waves
      ctx.strokeStyle = theme === "dark" ? "#4F5458" : "#E5E7EB";
      ctx.lineWidth = 1;
      for (let x = 0; x < cols - 1; x++) {
        for (let y = 0; y < rows - 1; y++) {
          const px1 = x * gridSize;
          const py1 = y * gridSize + wavePoints[x][y].z;
          const px2 = (x + 1) * gridSize;
          const py2 = y * gridSize + wavePoints[x + 1][y].z;
          const px3 = x * gridSize;
          const py3 = (y + 1) * gridSize + wavePoints[x][y + 1].z;

          ctx.beginPath();
          ctx.moveTo(px1, py1);
          ctx.lineTo(px2, py2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(px1, py1);
          ctx.lineTo(px3, py3);
          ctx.stroke();
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      time++;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse interaction
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
}
