'use client';

import { useState } from 'react';
import Link from 'next/link';
import platformData from '@/data/platform.json';

/* ═══════════════════════════════════════════
   UNITY — Услуги (Services Index)
   Premium glassmorphism grid, cinematic feel
   ═══════════════════════════════════════════ */

const { services, clinics } = platformData;
const phone = clinics[0]?.phone ?? '+7 928 971-09-93';

function formatPrice(n: number) {
  return n.toLocaleString('ru-RU');
}

/* ── Metadata export (server-side via generateMetadata won't work in 'use client',
     but Next.js can still pick up the head <title> from layout template) ── */

export default function UslugiPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div style={styles.wrapper}>
      {/* ── SEO title via <title> tag ── */}
      <title>Услуги — UNITY</title>
      <meta name="description" content="Все виды наркологической помощи: вывод из запоя, кодирование, реабилитация, нарколог на дом. Анонимно, круглосуточно." />

      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section style={styles.hero}>
        {/* Decorative gradient orbs */}
        <div style={styles.heroOrb1} />
        <div style={styles.heroOrb2} />

        <div style={styles.heroContent}>
          <span style={styles.eyebrow}>НАРКОЛОГИЧЕСКАЯ ПОМОЩЬ</span>
          <h1 style={styles.heroTitle}>
            Наши <span style={styles.gradientText}>услуги</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Полный спектр наркологической помощи — от экстренного вывода из запоя
            до долгосрочной реабилитации. Все клиники проверены, лицензии подтверждены.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES GRID
          ═══════════════════════════════════════ */}
      <section style={styles.servicesSection}>
        <div style={styles.servicesContainer}>
          <div style={styles.servicesGrid}>
            {services.map((service, index) => {
              const isHovered = hoveredCard === service.id;
              return (
                <Link
                  href={`/uslugi/${service.slug}`}
                  key={service.id}
                  style={{
                    ...styles.card,
                    ...(isHovered ? styles.cardHovered : {}),
                    animationDelay: `${index * 0.08}s`,
                  }}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Glow effect on hover */}
                  <div
                    style={{
                      ...styles.cardGlow,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  {/* Icon */}
                  <div style={styles.cardIcon}>
                    <span style={styles.iconEmoji}>{service.icon}</span>
                  </div>

                  {/* Content */}
                  <div style={styles.cardBody}>
                    <h3 style={styles.cardTitle}>{service.name}</h3>
                    <p style={styles.cardDesc}>{service.shortDesc}</p>
                  </div>

                  {/* Footer with price */}
                  <div style={styles.cardFooter}>
                    {service.priceFrom > 0 ? (
                      <span style={styles.cardPrice}>
                        от {formatPrice(service.priceFrom)} ₽
                      </span>
                    ) : (
                      <span style={styles.cardPriceFree}>Бесплатно</span>
                    )}
                    <span
                      style={{
                        ...styles.cardArrow,
                        ...(isHovered ? styles.cardArrowHovered : {}),
                      }}
                    >
                      →
                    </span>
                  </div>

                  {/* Top accent line */}
                  <div
                    style={{
                      ...styles.cardAccent,
                      ...(isHovered ? styles.cardAccentHovered : {}),
                    }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY UNITY SECTION
          ═══════════════════════════════════════ */}
      <section style={styles.whySection}>
        <div style={styles.whyContainer}>
          <h2 style={styles.sectionTitle}>
            Почему выбирают <span style={styles.gradientText}>UNITY</span>
          </h2>
          <div style={styles.whyGrid}>
            {[
              { icon: '✅', title: 'Проверенные лицензии', desc: 'Каждая клиника проходит верификацию. Мы проверяем лицензии и документы.' },
              { icon: '🔒', title: '100% анонимность', desc: 'Полная конфиденциальность на всех этапах. Без постановки на учёт.' },
              { icon: '⏰', title: 'Круглосуточно', desc: 'Помощь доступна 24/7, включая праздники и выходные дни.' },
            ].map((item) => (
              <div key={item.title} style={styles.whyCard}>
                <span style={styles.whyIcon}>{item.icon}</span>
                <h3 style={styles.whyCardTitle}>{item.title}</h3>
                <p style={styles.whyCardDesc}>{item.desc}</p>
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
            Нужна помощь прямо сейчас?
          </h2>
          <p style={styles.ctaSubtitle}>
            Позвоните нам — консультация бесплатная и полностью анонимная
          </p>
          <a href={`tel:${phone.replace(/\s/g, '')}`} style={styles.ctaButton}>
            📞 {phone}
          </a>
          <p style={styles.ctaDisclaimer}>
            Звонок бесплатный • Анонимно • Без постановки на учёт
          </p>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   INLINE STYLES — Premium, consistent with homepage
   ══════════════════════════════════════════════════════════ */
const styles: Record<string, React.CSSProperties> = {
  /* ── Wrapper ── */
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
    top: '-20%',
    right: '-10%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  heroOrb2: {
    position: 'absolute',
    bottom: '-20%',
    left: '-10%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(10,22,40,0.5) 0%, transparent 70%)',
    filter: 'blur(50px)',
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
    fontSize: 'clamp(2.2rem, 5vw, 4rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.1,
  },
  gradientText: {
    color: '#10B981',
    textShadow: '0 0 20px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.15)',
  },
  heroSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
    color: 'rgba(255,255,255,0.75)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.7,
    maxWidth: '640px',
  },

  /* ══════════════ SERVICES GRID ══════════════ */
  servicesSection: {
    padding: 'clamp(60px, 8vh, 100px) 24px',
    background: 'rgba(6,4,10,0.7)',
  },
  servicesContainer: {
    maxWidth: '960px',
    margin: '0 auto',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
    gap: '24px',
  },

  /* ── Card ── */
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: 'clamp(24px, 3vw, 32px)',
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '20px',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    cursor: 'pointer',
    transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, box-shadow 0.3s',
    textDecoration: 'none',
    overflow: 'hidden',
  },
  cardHovered: {
    transform: 'translateY(-6px)',
    borderColor: 'rgba(16,185,129,0.6)',
    boxShadow: '0 20px 60px rgba(16,185,129,0.15), 0 0 0 1px rgba(16,185,129,0.1)',
  },
  cardGlow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle at center, rgba(16,185,129,0.06) 0%, transparent 60%)',
    transition: 'opacity 0.4s',
    pointerEvents: 'none',
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)',
    borderRadius: '2px',
    transition: 'all 0.35s',
  },
  cardAccentHovered: {
    left: '5%',
    right: '5%',
    background: 'linear-gradient(90deg, transparent, #10B981, transparent)',
    boxShadow: '0 0 20px rgba(16,185,129,0.3)',
  },

  /* Card Icon */
  cardIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
    border: '1px solid rgba(16,185,129,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconEmoji: {
    fontSize: '1.6rem',
    lineHeight: 1,
  },

  /* Card Body */
  cardBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.2rem, 1.8vw, 1.4rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
  },
  cardDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.92rem',
    color: 'rgba(255,255,255,0.65)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.6,
  },

  /* Card Footer */
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '16px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  cardPrice: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    fontWeight: 700,
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
  },
  cardPriceFree: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    fontWeight: 700,
    color: '#34D399',
    textShadow: 'var(--ts-dark)',
    padding: '2px 12px',
    background: 'rgba(16,185,129,0.1)',
    borderRadius: '100px',
    border: '1px solid rgba(16,185,129,0.2)',
  },
  cardArrow: {
    fontSize: '1.3rem',
    color: 'rgba(255,255,255,0.3)',
    transition: 'transform 0.3s, color 0.3s',
  },
  cardArrowHovered: {
    transform: 'translateX(6px)',
    color: '#10B981',
  },

  /* ══════════════ WHY SECTION ══════════════ */
  whySection: {
    padding: 'clamp(60px, 8vh, 100px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.7) 0%, rgba(10,15,26,0.6) 100%)',
  },
  whyContainer: {
    maxWidth: '1100px',
    margin: '0 auto',
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '48px',
  },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
    gap: '24px',
  },
  whyCard: {
    padding: '32px 24px',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  whyIcon: {
    fontSize: '2rem',
    lineHeight: 1,
  },
  whyCardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.15rem',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
  },
  whyCardDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.6,
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
