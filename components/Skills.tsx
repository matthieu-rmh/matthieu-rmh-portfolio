'use client';

import { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  meta: string;
  pct: number;
}

const skills: Skill[] = [
  { name: 'Odoo / ERP', meta: 'Python · XML · OWL', pct: 0.95 },
  { name: 'Backend', meta: 'Elixir · Phoenix · Flask · Node.js', pct: 0.9 },
  { name: 'Frontend', meta: 'React · Next.js · LiveView · JS', pct: 0.85 },
  { name: 'Databases', meta: 'PostgreSQL · MySQL · NoSQL', pct: 0.88 },
  { name: 'Systems', meta: 'C · C++ · Rust', pct: 0.75 },
  { name: 'API Integration', meta: 'EDI · TecDoc · REST · TMDB', pct: 0.9 },
];

export default function Skills() {
  const introRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    if (introRef.current) observer.observe(introRef.current);
    if (rowsRef.current) observer.observe(rowsRef.current);

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, pct: number) => {
    const bar = e.currentTarget.querySelector<HTMLElement>('.skill-bar');
    if (bar) bar.style.transform = `scaleX(${pct})`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget.querySelector<HTMLElement>('.skill-bar');
    if (bar) bar.style.transform = 'scaleX(0)';
  };

  return (
    <section id="skills">
      <div className="section-label">Expertise</div>
      <div className="skills-layout">
        <div className="skills-intro reveal" ref={introRef}>
          Sharp tools,
          <br />
          <em>sharper</em>
          <br />
          instincts.
        </div>
        <div className="skill-rows reveal" ref={rowsRef}>
          {skills.map((skill) => (
            <div
              className="skill-row"
              key={skill.name}
              onMouseEnter={(e) => handleMouseEnter(e, skill.pct)}
              onMouseLeave={handleMouseLeave}
            >
              <span className="skill-name">{skill.name}</span>
              <span className="skill-meta">{skill.meta}</span>
              <div className="skill-bar-wrap">
                <div className="skill-bar" style={{ width: `${skill.pct * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
