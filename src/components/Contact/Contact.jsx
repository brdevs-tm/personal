"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Github,
  Mail,
  Linkedin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus({ message: "Sending...", type: "info" });

    const serviceID = "service_hssxaha";
    const templateID = "template_lkwk49g";
    const publicKey = "vMRalq9p-Z-2v0CRO";

    // XSS oldini olish uchun ma'lumotlarni tozalash
    const sanitizedFormData = {
      name: formData.name.replace(/[<>]/g, ""),
      email: formData.email.replace(/[<>]/g, ""),
      phone: formData.phone.replace(/[<>]/g, ""),
      message: formData.message.replace(/[<>]/g, ""),
    };

    emailjs.send(serviceID, templateID, sanitizedFormData, publicKey).then(
      () => {
        setStatus({ message: "Message sent successfully!", type: "success" });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      },
      (error) => {
        setStatus({
          message: "Failed to send message. Please try again.",
          type: "error",
        });
        console.error("EmailJS error:", error);
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  useEffect(() => {
    if (status.message && status.message !== "Sending...") {
      const timer = setTimeout(
        () => setStatus({ message: "", type: "" }),
        4000
      );
      return () => clearTimeout(timer);
    }
  }, [status]);

  const socialLinks = [
    {
      name: "Telegram",
      url: "https://t.me/im_hamidov",
      icon: <Send size={24} />,
    },
    {
      name: "GitHub",
      url: "https://github.com/brdevs-tm",
      icon: <Github size={24} />,
    },
    {
      name: "Gmail",
      url: "mailto:imhamidovic@gmail.com",
      icon: <Mail size={24} />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/iamhamidov/",
      icon: <Linkedin size={24} />,
    },
  ];

  return (
    <section id="contact" className="py-16 px-4 min-h-[50vh] flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <AnimatePresence>
          {status.message && status.message !== "Sending..." && (
            <motion.div
              className={`fixed top-4 right-4 p-4 z-[100] popup flex items-center gap-2 ${
                status.type === "success"
                  ? "bg-[var(--accent)]"
                  : "bg-[var(--highlight)]"
              }`}
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {status.type === "success" ? (
                <CheckCircle size={20} className="text-[var(--text)]" />
              ) : (
                <AlertCircle size={20} className="text-[var(--text)]" />
              )}
              <p className="text-sm font-medium">{status.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="card" variants={itemVariants}>
            <div className="text-center py-6 gradient-bg">
              <h2 className="text-2xl md:text-3xl font-semibold">
                📬 Get in Touch
              </h2>
              <p className="mt-1 text-sm">Send me a message to collaborate!</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-3 rounded-lg transition-all focus:ring-2 focus:ring-[var(--accent)]"
                />
                {errors.name && (
                  <p className="text-sm text-[var(--highlight)] mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-3 rounded-lg transition-all focus:ring-2 focus:ring-[var(--accent)]"
                />
                {errors.email && (
                  <p className="text-sm text-[var(--highlight)] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 rounded-lg transition-all focus:ring-2 focus:ring-[var(--accent)]"
                />
                {errors.phone && (
                  <p className="text-sm text-[var(--highlight)] mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 w-full p-3 rounded-lg transition-all focus:ring-2 focus:ring-[var(--accent)]"
                />
                {errors.message && (
                  <p className="text-sm text-[var(--highlight)] mt-1">
                    {errors.message}
                  </p>
                )}
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 bg-[var(--accent)] hover:bg-[var(--highlight)] transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Send Message
              </motion.button>
            </form>

            <div className="py-6 text-center bg-[var(--border)]">
              <p className="text-sm mb-4">
                Connect with me on social platforms
              </p>
              <div className="flex justify-center gap-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent)]"
                    variants={buttonVariants}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
