'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/uslugi', label: 'Услуги' },
  { href: '/goroda', label: 'Города' },
  { href: '/blog', label: 'Блог' },
  { href: '/o-nas', label: 'О нас' },
  { href: '/kontakty', label: 'Контакты' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          {/* ─── Logo ─── */}
          <Link href="/" className="header-logo" aria-label="UNITY — На главную">
            <span className="header-logo-text">UNITY</span>
            <span className="header-logo-sub">помощь зависимым людям</span>
          </Link>

          {/* ─── Desktop Nav ─── */}
          <nav className="header-nav" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="header-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ─── CTA + Hamburger ─── */}
          <div className="header-cta">
            <a href="tel:+78001234567" className="header-phone">
              +7 800 123-45-67
            </a>
            <a href="tel:+78001234567" className="btn btn-phone btn-sm">
              Позвонить
            </a>
            <button
              className={`hamburger${menuOpen ? ' active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Nav Overlay ─── */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        <nav aria-label="Мобильная навигация">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a href="tel:+78001234567" className="btn btn-phone btn-lg">
          +7 800 123-45-67
        </a>
      </div>
    </>
  );
}
