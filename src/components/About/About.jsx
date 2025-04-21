"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";

export default function About() {
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-20 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-40 h-40 md:w-60 md:h-60 rounded-full overflow-hidden shadow-xl border-4 border-[var(--accent)]"
        >
          <Image
            src="/images/avatar.png"
            alt="Hamidov Avatar"
            width={240}
            height={240}
            className="object-cover w-full h-full"
          />
        </motion.div>

        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-4xl font-extrabold mb-4 text-[var(--accent)]">
            About Me
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-[var(--text)] mb-6">
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white font-semibold shadow-md transition duration-300 hover:bg-[var(--highlight)]"
          >
            <Download size={20} />
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
