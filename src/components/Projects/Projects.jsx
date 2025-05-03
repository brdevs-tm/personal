"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import Tilt from "react-parallax-tilt";
import "./projects.css";
import useTheme from "@/hooks/useTheme";
import WaveBackground from "../WaveBackground/WaveBackground";

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Zamonaviy onlayn do‘kon, Next.js va Stripe bilan qurilgan.",
      image: "/images/project1.jpg",
      tech: ["Next.js", "TailwindCSS", "Stripe"],
      github: "https://github.com/brdevs-tm/ecommerce",
      demo: "https://ecommerce-demo.vercel.app",
    },
    {
      title: "Task Management App",
      description:
        "Vazifalarni boshqarish uchun ilova, real-time funksiyalar bilan.",
      image: "/images/project2.jpg",
      tech: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/brdevs-tm/task-manager",
      demo: "https://task-manager-demo.vercel.app",
    },
    {
      title: "Portfolio Website",
      description:
        "Shaxsiy portfolio sayti, kreativ dizayn va animatsiyalar bilan.",
      image: "/images/project3.jpg",
      tech: ["Next.js", "TailwindCSS", "Framer Motion"],
      github: "https://github.com/brdevs-tm/portfolio",
      demo: "https://hamidov-portfolio.vercel.app",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="projects" className="py-16 px-4 projects-section">
      <WaveBackground />
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              glareEnable={true}
              glareMaxOpacity={0.3}
              glareColor={useTheme === "dark" ? "#00C9A7" : "#0EA5E9"}
              glarePosition="all"
            >
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="holo-card"
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  card.style.setProperty("--mouse-x", `${x}px`);
                  card.style.setProperty("--mouse-y", `${y}px`);
                }}
              >
                <div className="card-content">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={320}
                    height={180}
                    className="card-image"
                  />
                  <div className="card-body">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-description">{project.description}</p>
                    <div className="card-tech">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="card-links">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-link"
                      >
                        <Github size={20} /> GitHub
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-link"
                      >
                        <ExternalLink size={20} /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
