"use client";

import { motion } from "framer-motion";
import { Send, Github, Mail, Linkedin } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "Telegram",
      url: "https://t.me/im_hamidov",
      icon: <Send size={20} />,
    },
    {
      name: "GitHub",
      url: "https://github.com/brdevs-tm",
      icon: <Github size={20} />,
    },
    {
      name: "Gmail",
      url: "mailto:imhamidovic@gmail.com",
      icon: <Mail size={20} />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/iamhamidov/",
      icon: <Linkedin size={20} />,
    },
  ];

  return (
    <footer className="py-8 px-4 card">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4">Let's connect and build something amazing!</p>
          <div className="flex justify-center gap-6 mb-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)]"
                whileHover={{ scale: 1.2 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} HamidovDev. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
