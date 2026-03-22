'use client';

import { useEffect } from 'react';
import BackgroundCanvas from '@/components/BackgroundCanvas';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  // Parallax effect on hero title
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const title = document.querySelector<HTMLElement>('.hero-title');
      if (title) title.style.transform = `translateY(${y * 0.15}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <BackgroundCanvas />
      <div className="wrap">
        <Nav />
        <Hero />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
