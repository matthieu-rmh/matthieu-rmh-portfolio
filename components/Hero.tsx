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
        <p className="hero-eyebrow">Software Developer · ERP &amp; Web Systems</p>
        <h1 className="hero-title">
          Building systems
          <br />
          that{' '}
          <em className="hit">
            <span>hit</span>
            <svg className="mark" viewBox="0 0 100 100" aria-hidden="true">
              <circle className="ring r3" cx="50" cy="50" r="42" strokeWidth="2.4" />
              <circle className="ring r2" cx="50" cy="50" r="30" strokeWidth="2.4" />
              <circle className="ring" cx="50" cy="50" r="18" strokeWidth="2.4" />
              <circle className="bull" cx="50" cy="50" r="7.5" />
              <circle className="ripple" cx="50" cy="50" r="8" fill="none" stroke="#b13e2e" strokeWidth="3" opacity="0" />
              <g className="arrow">
                <line className="shaft" x1="6" y1="94" x2="51" y2="49" />
                <path className="head" d="M58 42 L46 45 L55 54 Z" />
                <line className="fletch" x1="8" y1="92" x2="2" y2="89" />
                <line className="fletch" x1="13" y1="87" x2="7" y2="84" />
                <line className="fletch" x1="18" y1="82" x2="12" y2="79" />
              </g>
            </svg>
          </em>
          <br />
          their target.
        </h1>
        <p className="hero-desc">
          I design and ship <strong>ERP integrations and web platforms</strong> — from Odoo
          and EDI pipelines to Elixir/Phoenix apps — where precision is the point.
        </p>
        <div className="hero-cred">
          <span>Currently: <b>ERP &amp; integration dev</b></span>
          <span className="sep" />
          <span><b>2021–2025</b></span>
          <span className="sep" />
          <span><b>10+</b> systems shipped</span>
        </div>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary" onClick={handleScrollToProjects}>
            View selected work &rarr;
          </a>
          <a href="/cv.pdf" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
            Download CV
          </a>
        </div>
      </div>

      <div id="sticker-container">
        <Image
          src="/images/archery_sticker.png"
          alt="Matthieu with archery bow"
          width={670}
          height={1360}
          priority
          style={{ objectFit: 'contain', objectPosition: 'center bottom', width: '100%', height: '100%' }}
        />
      </div>

      <div className="hero-counter">
        <div>2021 — 2025</div>
        <div style={{ marginTop: '0.3rem', opacity: 0.5 }}>5 yrs · 10+ projects</div>
      </div>
    </section>
  );
}
