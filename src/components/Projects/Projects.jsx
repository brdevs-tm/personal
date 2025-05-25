"use client";

import { useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import Tilt from "react-parallax-tilt";
import "./projects.css";
import useTheme from "@/hooks/useTheme";
import WaveBackground from "../WaveBackground/WaveBackground";

// Custom debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default function Projects() {
  const { theme } = useTheme();
  const cardRefs = useRef([]);

  const projects = useMemo(
    () => [
      {
        title: "E-Commerce Platform",
        description:
          "Zamonaviy onlayn do‘kon, Next.js va Stripe bilan qurilgan.",
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
        title: "IELTS Speaking Practice",
        description:
          "A web application that generates random questions for IELTS Speaking sections. Built with a minimalist design and powered by the Ant Design UI framework.",
        image: "/images/project3.png",
        tech: ["Next.js", "CSS", "Ant Design", "REST API"],
        github: "https://github.com/brdevs-tm/speaking-new",
        demo: "https://speakready.netlify.app",
      },
    ],
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const handleMouseMove = debounce((e) => {
      cardRefs.current.forEach((card) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
          }
        }
      });
    }, 10);

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      handleMouseMove.cancel();
    };
  }, []);

  return (
    <section
      id="projects"
      className="projects-section"
      role="region"
      aria-labelledby="projects-heading"
    >
      <WaveBackground />
      <div className="projects-container">
        <h2 id="projects-heading" className="projects-title">
          My Projects
        </h2>
        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <Tilt
              key={project.title}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              glareEnable={true}
              glareMaxOpacity={0.4}
              glareColor={theme === "dark" ? "#00C9A7" : "#0EA5E9"}
              glarePosition="all"
            >
              <motion.div
                variants={cardVariants}
                className="holo-card"
                ref={(el) => (cardRefs.current[index] = el)}
                tabIndex={0}
                aria-label={`Project: ${project.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    window.open(project.demo, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                <div className="card-content">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={320}
                    height={180}
                    className="card-image"
                    priority={index < 3}
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
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
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Github size={20} /> GitHub
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-link"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <ExternalLink size={20} /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
