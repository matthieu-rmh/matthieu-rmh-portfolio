'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const orbitRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = orbitRef.current;
    if (!c) return;

    const ctx = c.getContext('2d');
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    c.width = 400 * DPR;
    c.height = 400 * DPR;
    ctx.scale(DPR, DPR);

    const W = 400, H = 400, CX = W / 2, CY = H / 2;
    const R = 130;
    const NPTS = 120;
    let t = 0;
    let animId: number;

    const pts = Array.from({ length: NPTS }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NPTS);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return { phi, theta };
    });

    function project(phi: number, theta: number, angle: number) {
      const x0 = R * Math.sin(phi) * Math.cos(theta);
      const y0 = R * Math.sin(phi) * Math.sin(theta);
      const z0 = R * Math.cos(phi);
      const x1 = x0 * Math.cos(angle) - z0 * Math.sin(angle);
      const z1 = x0 * Math.sin(angle) + z0 * Math.cos(angle);
      return { x: CX + x1, y: CY + y0, z: z1 };
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      t += 0.004;

      const sorted = pts.map((p) => project(p.phi, p.theta, t));
      sorted.sort((a, b) => a.z - b.z);

      sorted.forEach((p) => {
        const depth = (p.z + R) / (2 * R);
        const size = 1 + depth * 2.5;
        const alpha = 0.05 + depth * 0.6;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(14,14,14,${alpha})`;
        ctx!.fill();
      });

      ctx!.beginPath();
      ctx!.save();
      ctx!.translate(CX, CY);

      for (let a = 0; a < Math.PI * 2; a += 0.05) {
        const x = R * Math.cos(a);
        const z = R * Math.sin(a) * Math.sin(0.3);
        const y = R * Math.sin(a) * Math.cos(0.3);
        const rx = x * Math.cos(t) + z * Math.sin(t);
        const rz = -x * Math.sin(t) + z * Math.cos(t);
        const depth = (rz + R) / (2 * R);
        ctx!.strokeStyle = `rgba(200,184,154,${0.1 + depth * 0.5})`;
        ctx!.lineWidth = 0.8;
        if (a === 0) ctx!.moveTo(rx, y);
        else ctx!.lineTo(rx, y);
      }

      ctx!.stroke();
      ctx!.restore();
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

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
          that <em>last</em>
          <br />
          and scale.
        </h1>
        <p className="hero-desc">
          I craft digital products with Odoo, Elixir, Python, and modern web
          stacks. Versatile by nature. Pragmatic by practice. Zero compromise.
        </p>
        <a href="#projects" className="hero-cta" onClick={handleScrollToProjects}>
          View selected work &rarr;
        </a>
      </div>

      <canvas id="orbit-canvas" ref={orbitRef} />

      <div className="hero-counter">
        <div>2021 — 2025</div>
        <div style={{ marginTop: '0.3rem', opacity: 0.4 }}>5 yrs · 10+ projects</div>
      </div>
    </section>
  );
}
