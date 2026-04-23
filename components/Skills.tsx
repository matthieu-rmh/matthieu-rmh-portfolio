'use client';

import { useEffect, useRef } from 'react';
import {
  siPython, siOdoo, siElixir, siPhoenixframework, siFlask, siNodedotjs,
  siReact, siNextdotjs, siJavascript, siPostgresql, siMysql, siMongodb,
  siC, siCplusplus, siRust, siThemoviedatabase,
  type SimpleIcon,
} from 'simple-icons';

interface Tech {
  label: string;
  icon?: SimpleIcon;
}

interface Skill {
  name: string;
  techs: Tech[];
  pct: number;
}

const skills: Skill[] = [
  {
    name: 'Odoo / ERP',
    techs: [
      { label: 'Python', icon: siPython },
      { label: 'XML' },
      { label: 'OWL', icon: siOdoo },
    ],
    pct: 0.95,
  },
  {
    name: 'Backend',
    techs: [
      { label: 'Elixir', icon: siElixir },
      { label: 'Phoenix', icon: siPhoenixframework },
      { label: 'Flask', icon: siFlask },
      { label: 'Node.js', icon: siNodedotjs },
    ],
    pct: 0.9,
  },
  {
    name: 'Frontend',
    techs: [
      { label: 'React', icon: siReact },
      { label: 'Next.js', icon: siNextdotjs },
      { label: 'LiveView' },
      { label: 'JS', icon: siJavascript },
    ],
    pct: 0.85,
  },
  {
    name: 'Databases',
    techs: [
      { label: 'PostgreSQL', icon: siPostgresql },
      { label: 'MySQL', icon: siMysql },
      { label: 'NoSQL', icon: siMongodb },
    ],
    pct: 0.88,
  },
  {
    name: 'Systems',
    techs: [
      { label: 'C', icon: siC },
      { label: 'C++', icon: siCplusplus },
      { label: 'Rust', icon: siRust },
    ],
    pct: 0.75,
  },
  {
    name: 'API Integration',
    techs: [
      { label: 'EDI' },
      { label: 'TecDoc' },
      { label: 'REST' },
      { label: 'TMDB', icon: siThemoviedatabase },
    ],
    pct: 0.9,
  },
];

function TechChip({ tech }: { tech: Tech }) {
  return (
    <span className="tech-chip">
      {tech.icon && (
        <svg
          role="img"
          viewBox="0 0 24 24"
          width="12"
          height="12"
          fill="currentColor"
          aria-label={tech.icon.title}
        >
          <path d={tech.icon.path} />
        </svg>
      )}
      {tech.label}
    </span>
  );
}

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
              <span className="skill-meta">
                {skill.techs.map((tech) => (
                  <TechChip key={tech.label} tech={tech} />
                ))}
              </span>
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
