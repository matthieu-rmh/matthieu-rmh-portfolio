'use client';

export default function Nav() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav>
      <div className="logo">Matthieu.dev</div>
      <ul className="nav-links">
        <li>
          <a href="#projects" onClick={(e) => handleScroll(e, '#projects')}>
            Work
          </a>
        </li>
        <li>
          <a href="#skills" onClick={(e) => handleScroll(e, '#skills')}>
            Skills
          </a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => handleScroll(e, '#contact')}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
