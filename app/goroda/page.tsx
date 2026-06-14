'use client';

import { useState } from 'react';
import Link from 'next/link';
import platformData from '@/data/platform.json';

/* ═══════════════════════════════════════════
   UNITY — Города (Cities Index)
   Premium card grid + map area
   ═══════════════════════════════════════════ */

const { cities, clinics } = platformData;
const phone = clinics[0]?.phone ?? '+7 928 971-09-93';

function formatPopulation(n: number) {
  if (n >= 1000) return `${Math.round(n / 1000)} тыс.`;
  return n.toString();
}

export default function GorodaPage() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <div style={styles.wrapper}>
      {/* ── SEO ── */}
      <title>Города — UNITY</title>
      <meta name="description" content="Наркологическая помощь в городах Ставропольского края: Пятигорск, Кисловодск, Ессентуки, Ставрополь. Проверенные клиники рядом с вами." />

      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section style={styles.hero}>
        <div style={styles.heroOrb1} />
        <div style={styles.heroOrb2} />
        <div style={styles.heroOrb3} />

        <div style={styles.heroContent}>
          <span style={styles.eyebrow}>ГЕОГРАФИЯ ПОМОЩИ</span>
          <h1 style={styles.heroTitle}>
            Работаем по всему{' '}
            <span style={styles.gradientText}>Ставропольскому краю</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Проверенные наркологические клиники в {cities.length} городах региона.
            Выберите ваш город — мы покажем лучшие варианты рядом.
          </p>

          {/* Quick stats */}
          <div style={styles.heroStats}>
            {[
              { value: `${cities.length}`, label: 'городов' },
              { value: '700+', label: 'клиник' },
              { value: '24/7', label: 'поддержка' },
            ].map((stat) => (
              <div key={stat.label} style={styles.heroStat}>
                <span style={styles.heroStatValue}>{stat.value}</span>
                <span style={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CITIES GRID
          ═══════════════════════════════════════ */}
      <section style={styles.citiesSection}>
        <div style={styles.citiesContainer}>
          <h2 style={styles.sectionTitle}>Выберите город</h2>

          <div className="goroda-grid">
            {cities.map((city, index) => {
              const isHovered = hoveredCity === city.id;
              return (
                <Link
                  href={`/goroda/${city.slug}`}
                  key={city.id}
                  style={{
                    ...styles.cityCard,
                    ...(isHovered ? styles.cityCardHovered : {}),
                    animationDelay: `${index * 0.1}s`,
                  }}
                  onMouseEnter={() => setHoveredCity(city.id)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  {/* Top accent bar */}
                  <div
                    style={{
                      ...styles.cardAccent,
                      ...(isHovered ? styles.cardAccentHovered : {}),
                    }}
                  />

                  {/* Hover glow */}
                  <div
                    style={{
                      ...styles.cardGlow,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  {/* City pin icon */}
                  <div style={styles.cityPinRow}>
                    <div style={styles.cityPin}>
                      <span style={styles.pinIcon}>📍</span>
                    </div>
                    <span style={styles.regionBadge}>{city.region}</span>
                  </div>

                  {/* City Name */}
                  <h3 style={styles.cityName}>{city.name}</h3>

                  {/* Population badge */}
                  <div style={styles.populationBadge}>
                    <span style={styles.populationIcon}>👥</span>
                    <span style={styles.populationText}>
                      {formatPopulation(city.population)} жителей
                    </span>
                  </div>

                  {/* Description */}
                  <p style={styles.cityDesc}>{city.description}</p>

                  {/* Footer */}
                  <div style={styles.cityFooter}>
                    <span style={styles.cityLink}>Найти клинику</span>
                    <span
                      style={{
                        ...styles.cityArrow,
                        ...(isHovered ? styles.cityArrowHovered : {}),
                      }}
                    >
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MAP PLACEHOLDER
          ═══════════════════════════════════════ */}
      <section style={styles.mapSection}>
        <div style={styles.mapContainer}>
          <h2 style={styles.sectionTitle}>Карта покрытия</h2>
          <p style={styles.mapSubtitle}>
            Наши партнёрские клиники расположены по всему Ставропольскому краю
          </p>
          <div style={styles.mapArea}>
            <div style={styles.mapOverlay}>
              <span style={styles.mapPin}>📍</span>
              <p style={styles.mapText}>Интерактивная карта</p>
              <p style={styles.mapSubtext}>Скоро здесь появится карта с отметками всех городов</p>
            </div>
            {/* City dots for visual effect */}
            {cities.map((city, i) => (
              <div
                key={city.id}
                style={{
                  ...styles.mapDot,
                  top: `${20 + (i * 12) % 60}%`,
                  left: `${15 + (i * 17) % 70}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                <div style={styles.mapDotPulse} />
                <span style={styles.mapDotLabel}>{city.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════ */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContainer}>
          <div style={styles.ctaGlow} />
          <h2 style={styles.ctaTitle}>
            Не нашли свой город?
          </h2>
          <p style={styles.ctaSubtitle}>
            Позвоните нам — мы подберём ближайшую клинику в вашем регионе
          </p>
          <a href={`tel:${phone.replace(/\s/g, '')}`} style={styles.ctaButton}>
            📞 {phone}
          </a>
          <p style={styles.ctaDisclaimer}>
            Бесплатная консультация • Анонимно • Круглосуточно
          </p>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   INLINE STYLES
   ══════════════════════════════════════════════════════════ */
const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: '100%',
    overflowX: 'hidden',
    position: 'relative',
    zIndex: 2,
  },

  /* ══════════════ HERO ══════════════ */
  hero: {
    position: 'relative',
    padding: 'clamp(120px, 15vh, 180px) 24px clamp(60px, 8vh, 100px)',
    textAlign: 'center',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.7) 0%, rgba(6,4,10,0.5) 100%)',
  },
  heroOrb1: {
    position: 'absolute',
    top: '-15%',
    left: '-5%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  heroOrb2: {
    position: 'absolute',
    top: '10%',
    right: '-10%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(10,22,40,0.5) 0%, transparent 70%)',
    filter: 'blur(50px)',
    pointerEvents: 'none',
  },
  heroOrb3: {
    position: 'absolute',
    bottom: '-10%',
    left: '30%',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 60%)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
    fontWeight: 500,
    letterSpacing: '0.18em',
    color: 'var(--primary)',
    textShadow: 'var(--ts-dark)',
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.15,
  },
  gradientText: {
    color: '#10B981',
    textShadow: '0 0 20px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.15)',
  },
  heroSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
    color: 'rgba(255,255,255,0.7)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.7,
    maxWidth: '640px',
  },

  /* Hero Stats */
  heroStats: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '16px',
  },
  heroStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  heroStatValue: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
  },
  heroStatLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.5)',
    textShadow: 'var(--ts-dark)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },

  /* ══════════════ CITIES GRID ══════════════ */
  citiesSection: {
    padding: 'clamp(60px, 8vh, 100px) 24px',
    background: 'rgba(6,4,10,0.7)',
  },
  citiesContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    textAlign: 'center',
    marginBottom: '48px',
  },


  /* ── City Card ── */
  cityCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    padding: 'clamp(24px, 3vw, 32px)',
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid rgba(16,185,129,0.15)',
    borderRadius: '20px',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    cursor: 'pointer',
    transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, box-shadow 0.3s',
    textDecoration: 'none',
    overflow: 'hidden',
  },
  cityCardHovered: {
    transform: 'translateY(-8px)',
    borderColor: 'rgba(16,185,129,0.5)',
    boxShadow: '0 24px 60px rgba(16,185,129,0.12), 0 0 0 1px rgba(16,185,129,0.1)',
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent)',
    borderRadius: '2px',
    transition: 'all 0.35s',
  },
  cardAccentHovered: {
    left: '0%',
    right: '0%',
    background: 'linear-gradient(90deg, transparent, #10B981, transparent)',
    boxShadow: '0 0 24px rgba(16,185,129,0.3)',
  },
  cardGlow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle at center, rgba(16,185,129,0.05) 0%, transparent 50%)',
    transition: 'opacity 0.4s',
    pointerEvents: 'none',
  },

  /* City Pin Row */
  cityPinRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  cityPin: {
    width: '44px',
    height: '44px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
    border: '1px solid rgba(16,185,129,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  pinIcon: {
    fontSize: '1.3rem',
    lineHeight: 1,
  },
  regionBadge: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.45)',
    textShadow: 'var(--ts-dark)',
    padding: '3px 10px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '100px',
    border: '1px solid rgba(255,255,255,0.08)',
    letterSpacing: '0.02em',
  },

  /* City Name */
  cityName: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
  },

  /* Population */
  populationBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    alignSelf: 'flex-start',
  },
  populationIcon: {
    fontSize: '0.85rem',
  },
  populationText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)',
    textShadow: 'var(--ts-dark)',
  },

  /* Description */
  cityDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.6,
    flex: 1,
  },

  /* Footer */
  cityFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '14px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    marginTop: 'auto',
  },
  cityLink: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
  },
  cityArrow: {
    fontSize: '1.3rem',
    color: 'rgba(255,255,255,0.3)',
    transition: 'transform 0.3s, color 0.3s',
  },
  cityArrowHovered: {
    transform: 'translateX(6px)',
    color: '#10B981',
  },

  /* ══════════════ MAP SECTION ══════════════ */
  mapSection: {
    padding: 'clamp(60px, 8vh, 100px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.7) 0%, rgba(10,15,26,0.6) 100%)',
  },
  mapContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center',
  },
  mapSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
    marginTop: '-32px',
    marginBottom: '40px',
  },
  mapArea: {
    position: 'relative',
    width: '100%',
    height: '400px',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(16,185,129,0.15)',
    borderRadius: '24px',
    overflow: 'hidden',
    backdropFilter: 'blur(8px)',
  },
  mapOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    zIndex: 2,
  },
  mapPin: {
    fontSize: '3rem',
    lineHeight: 1,
    filter: 'drop-shadow(0 4px 12px rgba(16,185,129,0.3))',
  },
  mapText: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.4rem',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
  },
  mapSubtext: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.45)',
    textShadow: 'var(--ts-dark)',
  },
  mapDot: {
    position: 'absolute',
    width: '12px',
    height: '12px',
    zIndex: 1,
  },
  mapDotPulse: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'rgba(16,185,129,0.6)',
    boxShadow: '0 0 16px rgba(16,185,129,0.4)',
  },
  mapDotLabel: {
    position: 'absolute',
    top: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.5)',
    textShadow: 'var(--ts-dark)',
    whiteSpace: 'nowrap',
  },

  /* ══════════════ CTA SECTION ══════════════ */
  ctaSection: {
    padding: 'clamp(80px, 10vh, 120px) 24px',
    background: 'rgba(6,4,10,0.7)',
    textAlign: 'center',
  },
  ctaContainer: {
    position: 'relative',
    maxWidth: '700px',
    margin: '0 auto',
    padding: 'clamp(40px, 5vw, 64px)',
    background: 'linear-gradient(180deg, rgba(16,185,129,0.08) 0%, rgba(0,0,0,0.4) 100%)',
    border: '1px solid rgba(16,185,129,0.25)',
    borderRadius: '28px',
    overflow: 'hidden',
  },
  ctaGlow: {
    position: 'absolute',
    top: '-100px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '400px',
    height: '200px',
    background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  ctaTitle: {
    position: 'relative',
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '12px',
  },
  ctaSubtitle: {
    position: 'relative',
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
    color: 'rgba(255,255,255,0.7)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.6,
    marginBottom: '32px',
  },
  ctaButton: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '18px 40px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#FFF',
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
    fontWeight: 700,
    borderRadius: '100px',
    textDecoration: 'none',
    boxShadow: '0 8px 32px rgba(16,185,129,0.3), 0 0 0 1px rgba(16,185,129,0.1)',
    transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s',
    letterSpacing: '0.02em',
  },
  ctaDisclaimer: {
    position: 'relative',
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.4)',
    textShadow: 'var(--ts-dark)',
    marginTop: '20px',
  },
};


