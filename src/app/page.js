"use client";

import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Testimonial from "@/components/Testimonial/Testimonial";
import Blog from "@/components/Blog/Awards";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import useTheme from "@/hooks/useTheme";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={`${theme}-theme`}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonial />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
