"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "Building Scalable APIs with Node.js",
      excerpt:
        "Learn how to create efficient and scalable REST APIs using Node.js and Express.",
      date: "April 10, 2025",
      link: "#",
    },
    {
      title: "Mastering Next.js: Tips and Tricks",
      excerpt:
        "Discover advanced techniques to optimize your Next.js applications.",
      date: "April 5, 2025",
      link: "#",
    },
    {
      title: "The Power of TailwindCSS",
      excerpt: "Why TailwindCSS is a game-changer for rapid UI development.",
      date: "March 30, 2025",
      link: "#",
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
    <section id="blog" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">My Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="card hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <BookOpen className="text-[var(--accent)] mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{post.date}</span>
                  <a href={post.link} className="hover:text-[var(--accent)]">
                    Read More
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
