'use client';

import { useEffect, useRef } from 'react';

export default function Contact() {
  const bigRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    if (bigRef.current) observer.observe(bigRef.current);
    if (rowRef.current) observer.observe(rowRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="contact-big reveal" ref={bigRef}>
          Let&apos;s build
          <br />
          something
          <br />
          <em>together.</em>
        </div>
        <div className="contact-row reveal" ref={rowRef}>
          <a href="mailto:razafintsalama.rmh@gmail.com" className="contact-link">
            → razafintsalama.rmh@gmail.com
          </a>
          <a href="https://github.com/matthieu-rmh" className="contact-link" target="_blank" rel="noopener noreferrer">
            → GitHub
          </a>
          <a href="https://linkedin.com/in/Matthieu-Heritiana" className="contact-link" target="_blank" rel="noopener noreferrer">
            → LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
