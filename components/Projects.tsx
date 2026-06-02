'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface FlowNode { t: string; s: string; hub?: boolean; }
interface Project {
  tab: string;
  idx: string;
  title: string;
  em: string;
  kv: [string, string][];
  tags: string[];
  flowLabel: string;
  nodes: FlowNode[];
  foot?: [string, string];
  problem: string;
  build: string;
  metric: string;
  metricUnit: string;
  metricSub: ReactNode;
  links: { label: string; href?: string }[];
}

const projects: Project[] = [
  {
    tab: 'EDI ↔ Odoo',
    idx: 'ERP INTEGRATION',
    title: 'EDI ↔ Odoo Integration ',
    em: 'for cross-company ordering',
    kv: [
      ['Client', 'Bremsen Technik Group × DAF Trucks'],
      ['Role', 'Integration developer'],
      ['Year', '2023–2024'],
      ['Stack', 'Odoo · Python · EDIFACT'],
    ],
    tags: ['Odoo', 'Python', 'EDI / EDIFACT', 'XML'],
    flowLabel: '// order & invoicing pipeline',
    nodes: [
      { t: 'DAF Trucks', s: 'EDI orders' },
      { t: 'EDI Gateway', s: 'parse · validate · map', hub: true },
      { t: 'Odoo', s: 'orders · invoices' },
    ],
    foot: ['inbound: ORDERS', 'outbound: INVOIC'],
    problem:
      'Orders and invoices between the two companies were handled manually — slow, error-prone and impossible to scale across high order volumes.',
    build:
      'An EDIFACT ↔ Odoo bridge that ingests purchase orders, validates and maps them to Odoo records, and emits invoices back automatically.',
    metric: '~X',
    metricUnit: ' hrs/wk',
    metricSub: <>of manual order entry eliminated; <span className="ph-num">XX%</span> fewer invoicing errors.</>,
    links: [{ label: 'Read case study →', href: '#' }, { label: 'Private repo' }],
  },
  {
    tab: 'TecDoc Catalog',
    idx: 'CATALOG / SHOP',
    title: 'TecDoc Parts Catalog ',
    em: 'for heavy-goods vehicles',
    kv: [
      ['Context', 'HGV parts catalog & shop'],
      ['Role', 'Backend developer'],
      ['Year', '2023'],
      ['Stack', 'Odoo · Python · TecDoc'],
    ],
    tags: ['Odoo', 'Python', 'TecDoc API', 'PostgreSQL'],
    flowLabel: '// parts catalog sync',
    nodes: [
      { t: 'TecDoc API', s: 'raw parts data' },
      { t: 'Importer', s: 'normalize · map', hub: true },
      { t: 'Odoo Shop', s: 'catalog · cart' },
    ],
    foot: ['source: TecAlliance', 'target: Odoo frontend'],
    problem:
      'Tens of thousands of HGV parts needed to be searchable and purchasable, kept in sync with TecAlliance supplier data.',
    build:
      "A parts catalog and shop built into the Odoo frontend, powered by TecAlliance's TecDoc API for accurate vehicle-to-part matching.",
    metric: '~X',
    metricUnit: 'k parts',
    metricSub: <>searchable in-shop; <span className="ph-num">XX%</span> faster catalog updates.</>,
    links: [{ label: 'Read case study →', href: '#' }, { label: 'Private repo' }],
  },
  {
    tab: 'Indian Ocean E-Commerce',
    idx: 'E-COMMERCE',
    title: 'Indian Ocean ',
    em: 'e-commerce platforms',
    kv: [
      ['Context', 'Regional online retail'],
      ['Role', 'Full-stack developer'],
      ['Year', '2022–2023'],
      ['Stack', 'Elixir · Phoenix · LiveView'],
    ],
    tags: ['Elixir', 'Phoenix', 'LiveView', 'PostgreSQL'],
    flowLabel: '// storefront → order flow',
    nodes: [
      { t: 'Storefront', s: 'browse · search' },
      { t: 'Cart · Checkout', s: 'validate · price', hub: true },
      { t: 'Payment · Orders', s: 'capture · fulfil' },
    ],
    foot: ['front: LiveView', 'back: order mgmt'],
    problem:
      'Regional businesses needed modern online storefronts tailored to local payment and logistics realities.',
    build:
      'E-commerce web apps built on Elixir/Phoenix with LiveView — catalog, cart, checkout and order management end to end.',
    metric: '~X',
    metricUnit: ' orders',
    metricSub: <>processed; <span className="ph-num">XX%</span> conversion / uptime.</>,
    links: [{ label: 'Visit site →', href: '#' }, { label: 'Read case study →', href: '#' }],
  },
  {
    tab: 'Movie Manager',
    idx: 'MOBILE APP',
    title: 'Movie Manager ',
    em: 'cross-platform app',
    kv: [
      ['Context', 'Personal project'],
      ['Role', 'Mobile developer'],
      ['Year', '2022'],
      ['Stack', 'React Native · TMDB API'],
    ],
    tags: ['React Native', 'TMDB API', 'JavaScript'],
    flowLabel: '// app architecture',
    nodes: [
      { t: 'UI', s: 'search · rate · save' },
      { t: 'App Logic', s: 'state · catalog', hub: true },
      { t: 'TMDB API', s: 'movie library' },
    ],
    foot: ['client → logic', 'logic → TMDB'],
    problem:
      'I wanted a fast way to search, track and organise the films I watch across devices.',
    build:
      'A cross-platform app on React Native using the TMDB API — search, mark favourites and seen, and retrieve them in a personal catalog.',
    metric: '—',
    metricUnit: '',
    metricSub: <>Add a highlight — e.g. <span className="ph-num">XX</span> features or what you learned.</>,
    links: [{ label: 'View repo →', href: 'https://github.com/matthieu-rmh' }, { label: 'TMDB API →', href: 'https://www.themoviedb.org/' }],
  },
];

const pad2 = (n: number) => String(n + 1).padStart(2, '0');

export default function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    if (!gridRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  const go = (i: number) => {
    const next = (i + projects.length) % projects.length;
    if (next === active) return;
    setSwapping(true);
    setTimeout(() => { setActive(next); setSwapping(false); }, 200);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(active - 1);
      else if (e.key === 'ArrowRight') go(active + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const p = projects[active];

  return (
    <section id="projects">
      <div className="section-head">
        <div className="section-label">Selected work</div>
        <div className="case-count">{pad2(active)} / {pad2(projects.length - 1)}</div>
      </div>

      <div className="work-tabs" role="tablist" aria-label="Selected work projects">
        {projects.map((proj, i) => (
          <button
            key={proj.tab}
            className="work-tab"
            role="tab"
            aria-selected={i === active}
            onClick={() => go(i)}
          >
            <span className="tnum">{pad2(i)}</span>{proj.tab}
          </button>
        ))}
      </div>

      <div id="caseHost" className={swapping ? 'swap' : ''} aria-live="polite" ref={gridRef}>
        <article className="case">
          <div className="case-top">
            <div className="case-meta">
              <div className="idx">{pad2(active)} · {p.idx}</div>
              <h3>{p.title}<em>{p.em}</em></h3>
              <dl className="kv">
                {p.kv.map(([k, v]) => (
                  <div key={k} style={{ display: 'contents' }}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="tags">
                {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>

            <div className="flow-wrap">
              <div className="flow-label">{p.flowLabel}</div>
              <div className="flow">
                {p.nodes.map((n, i) => (
                  <div key={n.t} style={{ display: 'contents' }}>
                    {i > 0 && <div className="arrow">→</div>}
                    <div className={`node${n.hub ? ' hub' : ''}`}>
                      <span className="n-t">{n.t}</span>
                      <span className="n-s">{n.s}</span>
                    </div>
                  </div>
                ))}
              </div>
              {p.foot && (
                <div className="flow-foot"><span>{p.foot[0]}</span><span>{p.foot[1]}</span></div>
              )}
            </div>
          </div>

          <div className="case-bottom">
            <div className="block">
              <div className="b-l">Problem</div>
              <p>{p.problem}</p>
            </div>
            <div className="block">
              <div className="b-l">What I built</div>
              <p>{p.build}</p>
            </div>
            <div className="block impact">
              <div className="b-l">Impact</div>
              <div className="metric"><span className="ph-num">{p.metric}</span>{p.metricUnit}</div>
              <p>{p.metricSub}</p>
              <div className="links">
                {p.links.map((l) =>
                  l.href
                    ? <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{l.label}</a>
                    : <a key={l.label} className="disabled">{l.label}</a>
                )}
              </div>
              <div className="hint"><b>↑</b> drop in your real numbers — metrics sell the work</div>
            </div>
          </div>
        </article>
      </div>

      <div className="case-nav">
        <button className={`nav-btn${active === 0 ? ' muted' : ''}`} onClick={() => go(active - 1)} aria-label="Previous project">
          <span className="glyph">‹</span><span className="lbl">Previous</span>
        </button>
        <div className="nav-dots">
          {projects.map((proj, i) => (
            <button
              key={proj.tab}
              className={`nav-dot${i === active ? ' on' : ''}`}
              aria-label={`Project ${pad2(i)}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button className={`nav-btn${active === projects.length - 1 ? ' muted' : ''}`} onClick={() => go(active + 1)} aria-label="Next project">
          <span className="lbl">Next</span><span className="glyph">›</span>
        </button>
      </div>
    </section>
  );
}
