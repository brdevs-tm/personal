"use client";

import { motion } from "framer-motion";
import { Code, Database, Layout, Server } from "lucide-react";

export default function Skills() {
  const skills = [
    {
      name: "Frontend",
      icon: <Layout size={40} />,
      description: "Next.js, React, TailwindCSS",
    },
    {
      name: "Backend",
      icon: <Server size={40} />,
      description: "Node.js, Express, REST APIs",
    },
    {
      name: "Database",
      icon: <Database size={40} />,
      description: "PostgreSQL, MongoDB",
    },
    {
      name: "Tools",
      icon: <Code size={40} />,
      description: "Git, Vercel, Docker",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="skills" className="py-16 px-4 card">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 card hover:shadow-xl transition-shadow"
            >
              <div className="text-[var(--accent)] mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
              <p>{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
