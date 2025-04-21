"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

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
    <section id="projects" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="card hover:shadow-2xl transition-shadow"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={240}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-sm rounded-full bg-[var(--border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[var(--accent)]"
                  >
                    <Github size={20} /> GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[var(--accent)]"
                  >
                    <ExternalLink size={20} /> Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
