"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonial() {
  const testimonials = [
    {
      name: "John Doe",
      role: "CEO, TechCorp",
      text: "Hamidov’s work was outstanding! He delivered a seamless e-commerce platform ahead of schedule.",
    },
    {
      name: "Jane Smith",
      role: "Project Manager, Innovate",
      text: "His attention to detail and creative solutions made our app a success. Highly recommended!",
    },
    {
      name: "Alex Brown",
      role: "CTO, StartUp",
      text: "Hamidov’s expertise in full-stack development transformed our vision into reality.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="testimonials" className="py-16 px-4 card">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 card hover:shadow-xl transition-shadow"
            >
              <Quote className="text-[var(--accent)] mb-4" size={32} />
              <p className="mb-4">{testimonial.text}</p>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
