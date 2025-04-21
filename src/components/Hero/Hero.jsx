"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      backgroundColor: "var(--highlight)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.97 },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center gradient-bg py-16 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Hey, I'm <span className="text-[var(--accent)]">Hamidov</span> — a
          Creative Full Stack Developer
        </motion.h1>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl mb-8"
        >
          I craft modern, responsive, and lightning-fast web applications using
          <strong> Next.js</strong>, <strong>TailwindCSS</strong>, and a touch
          of creativity. Let’s bring your next big idea to life!
        </motion.p>
        <div className="flex gap-4 justify-center">
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                .scrollIntoView({ behavior: "smooth" });
            }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold shadow-md transition duration-300"
          >
            See My Projects <ArrowRight size={20} />
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                .scrollIntoView({ behavior: "smooth" });
            }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--accent)] text-[var(--accent)] font-semibold transition duration-300"
          >
            Let's Connect
          </motion.a>
        </div>
      </div>
    </section>
  );
}
