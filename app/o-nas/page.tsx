'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import platformData from '@/data/platform.json';

/* ═══════════════════════════════════════════
   UNITY — О нас (About)
   Mission, pillars, stats, team, CTA
   ═══════════════════════════════════════════ */

const { clinics } = platformData;
const phone = clinics[0]?.phone ?? '+7 928 971-09-93';

/* ── Animated Counter Component ── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {count}{suffix}
    </span>
  );
}

/* ═══════════ PILLARS DATA ═══════════ */
const pillars = [
  {
    icon: '🔍',
    title: 'Проверяем по 50+ критериям',
    desc: 'Большинство организаций мы проверяем «от и до» лично. Доступность, безопасность, эффективность лечения, морально-этическая ориентация, гуманность, конфиденциальность — и это только начало.',
    detail: 'Только достойные учреждения получают статус «Проверено»',
  },
  {
    icon: '🛡️',
    title: 'Защищаем от мошенников',
    desc: 'На нашу платформу попадают только те организации, которые действительно лечат зависимости, а не просто кормят обещаниями и вытягивают из людей деньги. Мы не выдаём отметку «проверено» всем подряд.',
    detail: 'Каждый рубль — на борьбу с зависимостью',
  },
  {
    icon: '💚',
    title: 'Бесплатная первая помощь',
    desc: 'Онлайн-заявка, обратный звонок или дистанционная консультация психолога — абсолютно бесплатно. Мы рядом в любое время дня и ночи, когда вам нужны ответы на самые сложные вопросы.',
    detail: 'Круглосуточная поддержка без оплаты',
  },
];

/* ═══════════ STATS DATA ═══════════ */
const stats = [
  { value: 700, suffix: '+', label: 'клиник', icon: '🏥' },
  { value: 85, suffix: '', label: 'регионов', icon: '🗺️' },
  { value: 24, suffix: '/7', label: 'поддержка', icon: '⏰' },
  { value: 100, suffix: '%', label: 'анонимность', icon: '🔒' },
];

/* ═══════════ TEAM DATA ═══════════ */
const team = [
  { role: 'Медицинский директор', initials: 'МД', color: '#10B981' },
  { role: 'Главный редактор', initials: 'ГР', color: '#34D399' },
  { role: 'Аналитик данных', initials: 'АД', color: '#059669' },
  { role: 'Служба поддержки', initials: 'СП', color: '#6EE7B7' },
];

export default function AboutPage() {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  return (
    <div style={styles.wrapper}>
      {/* ── SEO ── */}
      <title>О нас — UNITY</title>
      <meta name="description" content="UNITY — место, где в любое время дня и ночи можно получить ответы на самые сложные вопросы и реальную помощь в борьбе с зависимостями. Проверяем клиники по 50+ критериям. Бесплатная консультация." />

      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section style={styles.hero}>
        <div style={styles.heroOrb1} />
        <div style={styles.heroOrb2} />

        <div style={styles.heroContent}>
          <span style={styles.eyebrow}>О ПЛАТФОРМЕ</span>
          <h1 style={styles.heroTitle}>
            О платформе <span style={styles.gradientText}>UNITY</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Место, где в любое время дня и ночи можно получить ответы на самые сложные вопросы
            и реальную помощь в борьбе с зависимостями.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MISSION SECTION
          ═══════════════════════════════════════ */}
      <section style={styles.missionSection}>
        <div style={styles.missionContainer}>
          <div style={styles.missionCard}>
            <div style={styles.missionGlow} />
            <div style={styles.missionIcon}>💚</div>
            <h2 style={styles.missionTitle}>Наша миссия</h2>
            <p style={styles.missionText}>
              На сайте — полноценная база клиник и реабилитационных центров, куда попадают{' '}
              <strong style={styles.missionHighlight}>только те организации</strong>, которые
              действительно лечат зависимости, а не просто кормят обещаниями и вытягивают из людей деньги.
            </p>
            <p style={styles.missionSubtext}>
              Мы делаем так, чтобы ваши средства были потрачены не зря, а все до последней копейки
              пошли на борьбу с зависимостью. Зависимость — это болезнь, а не выбор. Каждый человек
              заслуживает шанс на выздоровление, и мы делаем первый шаг максимально простым.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHAT YOU GET — VALUE PROPOSITIONS
          ═══════════════════════════════════════ */}
      <section style={styles.valueSection}>
        <div style={styles.pillarsContainer}>
          <h2 style={styles.sectionTitle}>
            Что вы <span style={styles.gradientText}>получаете</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Всё — бесплатно. Без скрытых платежей, без обязательств.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginTop: '48px',
          }}>
            {[
              { icon: '📋', title: 'Онлайн-заявка', desc: 'Заполните форму за 30 секунд — мы подберём клинику под ваш случай и бюджет' },
              { icon: '📞', title: 'Обратный звонок', desc: 'Закажите звонок — мы перезвоним в течение 5 минут, в любое время суток' },
              { icon: '🧠', title: 'Консультация психолога', desc: 'Дистанционная консультация специалиста — первый шаг, который можно сделать прямо сейчас' },
              { icon: '🗂️', title: 'База проверенных клиник', desc: 'Полная информация: цены, условия, отзывы, фото — всё для осознанного выбора' },
            ].map((item) => (
              <div key={item.title} style={{
                background: 'rgba(0,0,0,0.45)',
                border: '1.5px solid rgba(16,185,129,0.2)',
                borderRadius: '16px',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column' as const,
                gap: '12px',
                transition: 'border-color 0.3s, transform 0.3s',
              }}>
                <span style={{ fontSize: '2.2rem' }}>{item.icon}</span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  color: '#FFF',
                  textShadow: 'var(--ts-dark)',
                }}>{item.title}</h3>
                <p style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.7)',
                  textShadow: 'var(--ts-dark)',
                }}>{item.desc}</p>
                <span style={{
                  fontSize: '0.8rem',
                  color: '#10B981',
                  fontWeight: 600,
                  textShadow: 'var(--ts-dark)',
                  marginTop: 'auto',
                }}>Бесплатно</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW WE WORK — 3 PILLARS
          ═══════════════════════════════════════ */}
      <section style={styles.pillarsSection}>
        <div style={styles.pillarsContainer}>
          <h2 style={styles.sectionTitle}>
            Как мы <span style={styles.gradientText}>работаем</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Мы не раздаём отметки «проверено» всем подряд. Только действительно достойные учреждения проходят нашу проверку.
          </p>

          <div style={styles.pillarsGrid}>
            {pillars.map((pillar, index) => {
              const isHovered = hoveredPillar === index;
              return (
                <div
                  key={pillar.title}
                  style={{
                    ...styles.pillarCard,
                    ...(isHovered ? styles.pillarCardHovered : {}),
                  }}
                  onMouseEnter={() => setHoveredPillar(index)}
                  onMouseLeave={() => setHoveredPillar(null)}
                >
                  {/* Top accent */}
                  <div
                    style={{
                      ...styles.pillarAccent,
                      ...(isHovered ? styles.pillarAccentHovered : {}),
                    }}
                  />

                  {/* Step number */}
                  <div style={styles.pillarNumber}>{String(index + 1).padStart(2, '0')}</div>

                  {/* Icon */}
                  <div style={styles.pillarIcon}>
                    <span style={{ fontSize: '2rem', lineHeight: 1 }}>{pillar.icon}</span>
                  </div>

                  {/* Content */}
                  <h3 style={styles.pillarTitle}>{pillar.title}</h3>
                  <p style={styles.pillarDesc}>{pillar.desc}</p>

                  {/* Detail badge */}
                  <div style={styles.pillarBadge}>
                    <span style={styles.pillarBadgeText}>{pillar.detail}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS SECTION
          ═══════════════════════════════════════ */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <h2 style={styles.sectionTitle}>UNITY в цифрах</h2>

          <div style={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} style={styles.statCard}>
                <span style={styles.statIcon}>{stat.icon}</span>
                <div style={styles.statValue}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TEAM SECTION
          ═══════════════════════════════════════ */}
      <section style={styles.teamSection}>
        <div style={styles.teamContainer}>
          <h2 style={styles.sectionTitle}>
            Наша <span style={styles.gradientText}>команда</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Профессионалы в медицине, технологиях и заботе о людях
          </p>

          <div style={styles.teamGrid}>
            {team.map((member) => (
              <div key={member.role} style={styles.teamCard}>
                {/* Avatar placeholder */}
                <div
                  style={{
                    ...styles.teamAvatar,
                    background: `linear-gradient(135deg, ${member.color}30, ${member.color}10)`,
                    border: `2px solid ${member.color}40`,
                  }}
                >
                  <span
                    style={{
                      ...styles.teamInitials,
                      color: member.color,
                    }}
                  >
                    {member.initials}
                  </span>
                </div>
                <h3 style={styles.teamRole}>{member.role}</h3>
                <div style={styles.teamDivider} />
                <p style={styles.teamBio}>
                  Опытный специалист с многолетним стажем в профильной области
                </p>
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
            Часто именно первый шаг сделать сложнее всего.
          </h2>
          <p style={styles.ctaSubtitle}>
            Оставьте онлайн-заявку, закажите обратный звонок или получите дистанционную консультацию психолога.
            Это абсолютно бесплатно. <strong style={{ color: '#10B981' }}>Решайтесь!</strong>
          </p>
          <div style={styles.ctaButtons}>
            <a href={`tel:${phone.replace(/\s/g, '')}`} style={styles.ctaButtonPrimary}>
              📞 {phone}
            </a>
            <Link href="/uslugi" style={styles.ctaButtonSecondary}>
              Наши услуги →
            </Link>
          </div>
          <p style={styles.ctaDisclaimer}>
            Бесплатная консультация • Анонимно • Без постановки на учёт
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
    bottom: '-15%',
    left: '-8%',
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

  /* ══════════════ MISSION ══════════════ */
  missionSection: {
    padding: 'clamp(60px, 8vh, 100px) 24px',
    background: 'rgba(6,4,10,0.7)',
  },
  valueSection: {
    padding: 'clamp(80px, 10vh, 120px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.65) 0%, rgba(10,22,40,0.5) 50%, rgba(6,4,10,0.65) 100%)',
  },
  missionContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  missionCard: {
    position: 'relative',
    padding: 'clamp(40px, 5vw, 64px)',
    background: 'linear-gradient(180deg, rgba(16,185,129,0.06) 0%, rgba(0,0,0,0.5) 100%)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '28px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  missionGlow: {
    position: 'absolute',
    top: '-80px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '300px',
    height: '200px',
    background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  missionIcon: {
    position: 'relative',
    fontSize: '3rem',
    lineHeight: 1,
    marginBottom: '16px',
  },
  missionTitle: {
    position: 'relative',
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '20px',
  },
  missionText: {
    position: 'relative',
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
    color: 'rgba(255,255,255,0.85)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.7,
    marginBottom: '16px',
  },
  missionHighlight: {
    color: '#10B981',
    fontWeight: 700,
  },
  missionSubtext: {
    position: 'relative',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.55)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.7,
    maxWidth: '600px',
    margin: '0 auto',
  },

  /* ══════════════ PILLARS ══════════════ */
  pillarsSection: {
    padding: 'clamp(60px, 8vh, 100px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.7) 0%, rgba(10,15,26,0.6) 100%)',
  },
  pillarsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '12px',
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
    marginBottom: '48px',
    textAlign: 'center',
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
    gap: '24px',
  },
  pillarCard: {
    position: 'relative',
    padding: 'clamp(28px, 3vw, 40px) clamp(24px, 2.5vw, 32px)',
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid rgba(16,185,129,0.15)',
    borderRadius: '24px',
    textAlign: 'left',
    overflow: 'hidden',
    transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, box-shadow 0.3s',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  pillarCardHovered: {
    transform: 'translateY(-6px)',
    borderColor: 'rgba(16,185,129,0.5)',
    boxShadow: '0 20px 60px rgba(16,185,129,0.12)',
  },
  pillarAccent: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent)',
    borderRadius: '2px',
    transition: 'all 0.35s',
  },
  pillarAccentHovered: {
    left: '0%',
    right: '0%',
    background: 'linear-gradient(90deg, transparent, #10B981, transparent)',
    boxShadow: '0 0 24px rgba(16,185,129,0.3)',
  },
  pillarNumber: {
    fontFamily: 'var(--font-display)',
    fontSize: '3rem',
    color: 'rgba(16,185,129,0.35)',
    lineHeight: 1,
    position: 'absolute',
    top: '16px',
    right: '20px',
  },
  pillarIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '18px',
    background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
    border: '1px solid rgba(16,185,129,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
  },
  pillarDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.92rem',
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.7,
    flex: 1,
  },
  pillarBadge: {
    alignSelf: 'flex-start',
    padding: '6px 14px',
    background: 'rgba(16,185,129,0.08)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '100px',
  },
  pillarBadgeText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.78rem',
    fontWeight: 500,
    color: '#34D399',
    textShadow: 'var(--ts-dark)',
  },

  /* ══════════════ STATS ══════════════ */
  statsSection: {
    padding: 'clamp(60px, 8vh, 100px) 24px',
    background: 'rgba(6,4,10,0.7)',
  },
  statsContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
    gap: '24px',
    marginTop: '48px',
  },
  statCard: {
    padding: '32px 24px',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(16,185,129,0.15)',
    borderRadius: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    backdropFilter: 'blur(8px)',
    transition: 'transform 0.3s, border-color 0.3s',
  },
  statIcon: {
    fontSize: '2rem',
    lineHeight: 1,
    marginBottom: '4px',
  },
  statValue: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.5)',
    textShadow: 'var(--ts-dark)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },

  /* ══════════════ TEAM ══════════════ */
  teamSection: {
    padding: 'clamp(60px, 8vh, 100px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.7) 0%, rgba(10,15,26,0.6) 100%)',
  },
  teamContainer: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))',
    gap: '24px',
    marginTop: '48px',
  },
  teamCard: {
    padding: '32px 20px',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    transition: 'transform 0.3s, border-color 0.3s',
  },
  teamAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamInitials: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.6rem',
    textShadow: 'var(--ts-dark)',
  },
  teamRole: {
    fontFamily: 'var(--font-display)',
    fontSize: '1rem',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
  },
  teamDivider: {
    width: '32px',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)',
    borderRadius: '2px',
  },
  teamBio: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.82rem',
    color: 'rgba(255,255,255,0.45)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.5,
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
  ctaButtons: {
    position: 'relative',
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaButtonPrimary: {
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
  ctaButtonSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '18px 32px',
    background: 'rgba(255,255,255,0.06)',
    color: '#FFF',
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
    fontWeight: 600,
    borderRadius: '100px',
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.15)',
    transition: 'background 0.3s, border-color 0.3s',
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
