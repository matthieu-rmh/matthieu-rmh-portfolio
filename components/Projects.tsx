'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface Project {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

const stickers = [
  { name: 'Python',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',         style: { top: '8%',  left: '3%',  animationDelay: '0s',    animationDuration: '6s'  } },
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', style: { top: '20%', right: '4%', animationDelay: '1.2s',  animationDuration: '7s'  } },
  { name: 'Elixir',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg',         style: { top: '55%', left: '1%',  animationDelay: '2s',    animationDuration: '8s'  } },
  { name: 'React',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',           style: { top: '70%', right: '3%', animationDelay: '0.5s',  animationDuration: '6.5s'} },
  { name: 'Phoenix',    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/phoenix/phoenix-original.svg',       style: { top: '38%', right: '2%', animationDelay: '3s',    animationDuration: '7.5s'} },
  { name: 'Python',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',         style: { top: '85%', left: '4%',  animationDelay: '1.8s',  animationDuration: '9s'  } },
];

const projects: Project[] = [
  {
    num: '01',
    title: 'EDI / Odoo Integration',
    desc: 'Implementation of a specific EDI/Odoo system between Bremsen Technik Group and DAF Trucks for orders and invoicing.',
    tags: ['Odoo', 'Python', 'EDI'],
  },
  {
    num: '02',
    title: 'TecDoc Parts Catalog',
    desc: 'Heavy goods vehicle parts catalog and shop built in Odoo frontend, powered by TecAlliance\'s TecDoc API.',
    tags: ['Odoo', 'Python', 'TecDoc API'],
  },
  {
    num: '03',
    title: 'Indian Ocean E-Commerce',
    desc: 'Design and development of e-commerce web applications for companies across the Indian Ocean region.',
    tags: ['Elixir', 'Phoenix', 'LiveView'],
  },
  {
    num: '04',
    title: 'Movie Manager App',
    desc: 'Multiplatform personal movie management app via The Movie Database API, providing access to an extensive video library.',
    tags: ['React Native', 'TMDB API', 'JavaScript'],
  },
];

export default function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" style={{ position: 'relative', overflow: 'hidden' }}>
      {stickers.map((s, i) => (
        <Image
          key={i}
          src={s.src}
          alt={s.name}
          width={48}
          height={48}
          className="project-sticker"
          style={{ ...s.style, position: 'absolute', pointerEvents: 'none' }}
        />
      ))}
      <div className="section-label">Selected work</div>
      <div className="projects-grid reveal" ref={gridRef}>
        {projects.map((p) => (
          <div className="project-card" key={p.num}>
            <div className="p-num">{p.num}</div>
            <div className="p-title">{p.title}</div>
            <div className="p-desc">{p.desc}</div>
            <div className="p-tags">
              {p.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
