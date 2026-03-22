'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!c || !ctx) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      draw();
    }

    function draw() {
      if (!c || !ctx) return;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = 'rgba(0,0,0,0.06)';
      const gap = 32;
      for (let x = gap; x < c.width; x += gap) {
        for (let y = gap; y < c.height; y += gap) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      id="bg"
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
