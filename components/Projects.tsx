'use client';

import { useEffect, useRef } from 'react';

interface Project {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

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
    <section id="projects">
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
