'use client';

import Image from 'next/image';

export default function Hero() {

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero">
      <div className="hero-inner">
        <p className="hero-eyebrow">Software Developer — Available for work</p>
        <h1 className="hero-title">
          Building systems
          <br />
          that <em>hit</em>
          <br />
          their target.
        </h1>
        <p className="hero-desc">
          I craft digital solutions with precision and focus—no detours, no compromise.
          From Odoo to Elixir, Python to modern web stacks, every project aimed at results that scale.
        </p>
        <a href="#projects" className="hero-cta" onClick={handleScrollToProjects}>
          View selected work &rarr;
        </a>
      </div>

      <div id="sticker-container">
        <Image
          src="/images/me_archery-removebg-preview-mirrored_scaled.png"
          alt="Matthieu with archery"
          width={800}
          height={800}
          priority
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
      </div>

      <div className="hero-counter">
        <div>2021 — 2025</div>
        <div style={{ marginTop: '0.3rem', opacity: 0.4 }}>5 yrs · 10+ projects</div>
      </div>
    </section>
  );
}
