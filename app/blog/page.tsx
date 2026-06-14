import type { CSSProperties } from 'react';
import Link from 'next/link';

/* ═══════════════════════════════════════════════════════
   UNITY — Блог (Blog Index)
   Premium editorial grid with sidebar
   ═══════════════════════════════════════════════════════ */

/* ── Blog Posts Data ── */
const blogPosts = [
  {
    id: 1,
    slug: 'kak-vybrat-narkologicheskuyu-kliniku',
    title: 'Как выбрать наркологическую клинику: 10 критериев',
    excerpt:
      'Выбор надёжной клиники — ключевой фактор успешного лечения. Рассказываем, на что обратить внимание: от лицензий и квалификации врачей до условий проживания и постреабилитационной поддержки.',
    date: '10 июня 2026',
    category: 'Руководства',
    readTime: '8 мин',
    categoryColor: '#10B981',
  },
  {
    id: 2,
    slug: 'vivod-iz-zapoya-na-domu',
    title: 'Вывод из запоя на дому: что нужно знать',
    excerpt:
      'Детоксикация в домашних условиях набирает популярность — но безопасно ли это? Разбираем показания и противопоказания, что входит в капельницу и когда нужна госпитализация.',
    date: '7 июня 2026',
    category: 'Лечение',
    readTime: '6 мин',
    categoryColor: '#3B82F6',
  },
  {
    id: 3,
    slug: 'kodirovanie-ot-alkogolizma-metody',
    title: 'Кодирование от алкоголизма: методы и эффективность',
    excerpt:
      'Эспераль, Торпедо, метод Довженко, лазерное кодирование — чем они отличаются? Обзор всех современных методов кодирования с реальной статистикой эффективности.',
    date: '3 июня 2026',
    category: 'Лечение',
    readTime: '10 мин',
    categoryColor: '#3B82F6',
  },
  {
    id: 4,
    slug: 'priznaki-alkogolnoj-zavisimosti',
    title: 'Признаки алкогольной зависимости: когда пора обращаться за помощью',
    excerpt:
      'Где грань между «выпить за компанию» и зависимостью? 12 тревожных признаков, которые нельзя игнорировать, и пошаговый алгоритм действий для близких.',
    date: '28 мая 2026',
    category: 'Диагностика',
    readTime: '7 мин',
    categoryColor: '#F59E0B',
  },
  {
    id: 5,
    slug: 'reabilitatsiya-posle-narkozavisimosti',
    title: 'Реабилитация после наркозависимости: этапы и сроки',
    excerpt:
      'Реабилитация — это не просто детокс, а полное восстановление личности. Рассказываем об основных этапах программы: от мотивации до ресоциализации, и сколько времени это занимает.',
    date: '22 мая 2026',
    category: 'Реабилитация',
    readTime: '9 мин',
    categoryColor: '#8B5CF6',
  },
  {
    id: 6,
    slug: 'kak-pomoch-blizkomu-s-zavisimostyu',
    title: 'Как помочь близкому с зависимостью: советы психолога',
    excerpt:
      'Созависимость, отрицание, агрессия — с чем сталкиваются родственники зависимых. Практические рекомендации психолога: как говорить, что делать и чего точно нельзя.',
    date: '15 мая 2026',
    category: 'Психология',
    readTime: '11 мин',
    categoryColor: '#EC4899',
  },
];

/* ── Categories ── */
const categories = [
  { name: 'Все статьи', count: 6 },
  { name: 'Лечение', count: 2 },
  { name: 'Руководства', count: 1 },
  { name: 'Диагностика', count: 1 },
  { name: 'Реабилитация', count: 1 },
  { name: 'Психология', count: 1 },
];

/* ══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function BlogPage() {
  return (
    <div style={styles.wrapper}>

      {/* Responsive styles for blog layout */}
      <style>{`
        @media (max-width: 960px) {
          .blog-layout {
            grid-template-columns: 1fr !important;
          }
          .blog-sidebar {
            position: static !important;
          }
        }
        @media (max-width: 640px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section style={styles.heroSection}>
        <div style={styles.heroGlow1} />
        <div style={styles.heroGlow2} />
        <div style={styles.sectionInner}>
          <span style={styles.eyebrow}>ЭКСПЕРТНЫЙ БЛОГ • ПОЛЕЗНЫЕ ЗНАНИЯ</span>
          <h1 style={styles.heroTitle}>
            Полезные <span className="gradient-text">материалы</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Экспертные статьи о лечении зависимостей — от специалистов с многолетним опытом
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BLOG CONTENT
          ═══════════════════════════════════════ */}
      <section style={styles.blogSection}>
        <div style={styles.sectionInner}>
          <div style={styles.blogLayout} className="blog-layout">

            {/* ── Main Column: Blog Grid ── */}
            <div style={styles.blogMain}>
              <div style={styles.blogGrid} className="blog-grid">
                {blogPosts.map((post) => (
                  <article key={post.id} style={styles.blogCard}>
                    {/* Card Header — Image Placeholder */}
                    <div style={styles.cardImageWrapper}>
                      <div style={{
                        ...styles.cardImage,
                        background: `linear-gradient(135deg, ${post.categoryColor}18 0%, rgba(16,185,129,0.08) 100%)`,
                      }}>
                        <div style={styles.cardImageIcon}>📝</div>
                        <div style={{
                          ...styles.cardImageOverlay,
                          background: `linear-gradient(180deg, transparent 40%, rgba(6,4,10,0.9) 100%)`,
                        }} />
                      </div>
                      {/* Category Tag (floating) */}
                      <span style={{
                        ...styles.categoryTag,
                        background: `${post.categoryColor}22`,
                        color: post.categoryColor,
                        borderColor: `${post.categoryColor}44`,
                      }}>
                        {post.category}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div style={styles.cardBody}>
                      <div style={styles.cardMeta}>
                        <span style={styles.cardDate}>{post.date}</span>
                        <span style={styles.cardDot}>•</span>
                        <span style={styles.cardReadTime}>⏱ {post.readTime}</span>
                      </div>

                      <h2 style={styles.cardTitle}>{post.title}</h2>
                      <p style={styles.cardExcerpt}>{post.excerpt}</p>

                      <div style={styles.cardFooter}>
                        <span style={styles.readMoreLink}>
                          Читать статью <span style={styles.readMoreArrow}>→</span>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside style={styles.sidebar} className="blog-sidebar">
              {/* Categories */}
              <div style={styles.sidebarCard}>
                <h3 style={styles.sidebarTitle}>Рубрики</h3>
                <div style={styles.categoryList}>
                  {categories.map((cat, i) => (
                    <div
                      key={i}
                      style={{
                        ...styles.categoryItem,
                        ...(i === 0 ? {
                          background: 'rgba(16,185,129,0.1)',
                          borderColor: 'rgba(16,185,129,0.3)',
                          color: '#10B981',
                        } : {}),
                      }}
                    >
                      <span style={styles.categoryName}>{cat.name}</span>
                      <span style={styles.categoryCount}>{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help CTA Card */}
              <div style={styles.helpCard}>
                <div style={styles.helpCardGlow} />
                <span style={styles.helpIcon}>🤝</span>
                <h3 style={styles.helpTitle}>Нужна помощь?</h3>
                <p style={styles.helpText}>
                  Если вы или ваш близкий столкнулись с зависимостью — не откладывайте. Мы поможем подобрать клинику бесплатно и анонимно.
                </p>
                <a href="tel:+79289710993" style={styles.helpCallBtn}>
                  📞 Позвонить сейчас
                </a>
                <Link href="/kontakty" style={styles.helpFormBtn}>
                  Оставить заявку
                </Link>
              </div>

              {/* Popular Tags */}
              <div style={styles.sidebarCard}>
                <h3 style={styles.sidebarTitle}>Популярные теги</h3>
                <div style={styles.tagsCloud}>
                  {[
                    'алкоголизм', 'наркомания', 'реабилитация',
                    'кодирование', 'детоксикация', 'психология',
                    'семья', 'рецидив', 'мотивация', 'анонимность',
                  ].map((tag) => (
                    <span key={tag} style={styles.tagItem}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM CTA
          ═══════════════════════════════════════ */}
      <section style={styles.bottomCta}>
        <div style={styles.bottomCtaGlow} />
        <div style={styles.sectionInner}>
          <h2 style={styles.bottomCtaTitle}>
            Остались <span className="gradient-text">вопросы?</span>
          </h2>
          <p style={styles.bottomCtaSubtitle}>
            Наши специалисты готовы проконсультировать вас бесплатно и анонимно
          </p>
          <div style={styles.bottomCtaButtons}>
            <Link href="/kontakty" style={styles.ctaPrimaryBtn}>
              ✉️ Связаться с нами
            </Link>
            <Link href="/" style={styles.ctaSecondaryBtn}>
              ← На главную
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════
   INLINE STYLES — Premium, cinematic, pixel-perfect
   ══════════════════════════════════════════════════════════ */
const styles: Record<string, CSSProperties> = {

  /* ── Wrapper ── */
  wrapper: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    overflowX: 'hidden',
  },

  sectionInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
    zIndex: 1,
  },

  /* ══════════════ HERO ══════════════ */
  heroSection: {
    position: 'relative',
    padding: 'clamp(120px, 18vh, 200px) 24px clamp(60px, 8vh, 100px)',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.85) 0%, rgba(6,4,10,0.6) 100%)',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroGlow1: {
    position: 'absolute',
    top: '-20%',
    left: '30%',
    width: '60vw',
    height: '60vw',
    maxWidth: '700px',
    maxHeight: '700px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  heroGlow2: {
    position: 'absolute',
    bottom: '-40%',
    right: '10%',
    width: '45vw',
    height: '45vw',
    maxWidth: '500px',
    maxHeight: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  eyebrow: {
    display: 'inline-block',
    fontSize: 'clamp(0.7rem, 1vw, 0.82rem)',
    fontWeight: 600,
    letterSpacing: '0.18em',
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
    textTransform: 'uppercase',
    marginBottom: '20px',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 5vw, 3.6rem)',
    fontWeight: 400,
    lineHeight: 1.15,
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.75)',
    textShadow: 'var(--ts-dark)',
    maxWidth: '640px',
    margin: '0 auto',
  },

  /* ══════════════ BLOG SECTION ══════════════ */
  blogSection: {
    position: 'relative',
    padding: 'clamp(40px, 6vh, 80px) 24px clamp(80px, 12vh, 140px)',
    background: 'rgba(6,4,10,0.7)',
  },
  blogLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '40px',
    alignItems: 'start',
  },

  /* ── Blog Main Grid ── */
  blogMain: {},
  blogGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '28px',
  },

  /* ── Blog Card ── */
  blogCard: {
    position: 'relative',
    background: 'rgba(0,0,0,0.45)',
    border: '1.5px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    overflow: 'hidden',
    transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  cardImageWrapper: {
    position: 'relative',
    width: '100%',
    height: '180px',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cardImageIcon: {
    fontSize: '3rem',
    opacity: 0.3,
  },
  cardImageOverlay: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  categoryTag: {
    position: 'absolute',
    top: '14px',
    left: '14px',
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '5px 12px',
    borderRadius: '8px',
    border: '1px solid',
    textShadow: 'var(--ts-dark)',
    backdropFilter: 'blur(8px)',
  },

  /* ── Card Body ── */
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px 22px 24px',
    flex: 1,
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.78rem',
    color: 'rgba(255,255,255,0.45)',
    textShadow: 'var(--ts-dark)',
  },
  cardDate: {},
  cardDot: {
    opacity: 0.4,
  },
  cardReadTime: {},
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
    fontWeight: 400,
    lineHeight: 1.35,
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
  },
  cardExcerpt: {
    fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
    lineHeight: 1.65,
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
    flex: 1,
  },
  cardFooter: {
    marginTop: 'auto',
    paddingTop: '14px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  readMoreLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
    transition: 'gap 0.2s',
    cursor: 'pointer',
  },
  readMoreArrow: {
    transition: 'transform 0.2s',
    display: 'inline-block',
  },

  /* ══════════════ SIDEBAR ══════════════ */
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    position: 'sticky',
    top: '100px',
  },
  sidebarCard: {
    background: 'rgba(0,0,0,0.45)',
    border: '1.5px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: 'clamp(20px, 2.5vw, 28px)',
  },
  sidebarTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.15rem',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '18px',
  },

  /* ── Categories ── */
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid transparent',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.88rem',
    cursor: 'pointer',
    transition: 'background 0.2s, border-color 0.2s, color 0.2s',
    textShadow: 'var(--ts-dark)',
  },
  categoryName: {
    fontWeight: 500,
  },
  categoryCount: {
    fontSize: '0.78rem',
    opacity: 0.5,
    background: 'rgba(255,255,255,0.06)',
    padding: '2px 10px',
    borderRadius: '6px',
  },

  /* ── Help CTA Card ── */
  helpCard: {
    position: 'relative',
    background: 'linear-gradient(180deg, rgba(16,185,129,0.1) 0%, rgba(0,0,0,0.45) 100%)',
    border: '1.5px solid rgba(16,185,129,0.3)',
    borderRadius: '20px',
    padding: 'clamp(24px, 3vw, 32px)',
    textAlign: 'center',
    overflow: 'hidden',
  },
  helpCardGlow: {
    position: 'absolute',
    top: '-30%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '140%',
    height: '140%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  helpIcon: {
    fontSize: '2.2rem',
    marginBottom: '10px',
    display: 'block',
  },
  helpTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '8px',
    position: 'relative',
    zIndex: 1,
  },
  helpText: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.65,
    marginBottom: '18px',
    position: 'relative',
    zIndex: 1,
  },
  helpCallBtn: {
    display: 'block',
    padding: '13px 20px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#FFF',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
    textShadow: 'var(--ts-dark)',
    transition: 'transform 0.2s',
    marginBottom: '10px',
    position: 'relative',
    zIndex: 1,
  },
  helpFormBtn: {
    display: 'block',
    padding: '12px 20px',
    background: 'transparent',
    color: '#10B981',
    border: '1.5px solid rgba(16,185,129,0.35)',
    borderRadius: '12px',
    fontSize: '0.88rem',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s',
    textShadow: 'var(--ts-dark)',
    position: 'relative',
    zIndex: 1,
  },

  /* ── Tags Cloud ── */
  tagsCloud: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  tagItem: {
    fontSize: '0.78rem',
    color: 'rgba(255,255,255,0.55)',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '5px 12px',
    borderRadius: '8px',
    textShadow: 'var(--ts-dark)',
    transition: 'border-color 0.2s, color 0.2s',
    cursor: 'pointer',
  },

  /* ══════════════ BOTTOM CTA ══════════════ */
  bottomCta: {
    position: 'relative',
    padding: 'clamp(80px, 12vh, 140px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.7) 0%, rgba(16,185,129,0.08) 50%, rgba(6,4,10,0.85) 100%)',
    textAlign: 'center',
    overflow: 'hidden',
  },
  bottomCtaGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    height: '60vw',
    maxWidth: '700px',
    maxHeight: '700px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  bottomCtaTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
    fontWeight: 400,
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '14px',
  },
  bottomCtaSubtitle: {
    fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
    color: 'rgba(255,255,255,0.65)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.7,
    maxWidth: '560px',
    margin: '0 auto 32px',
  },
  bottomCtaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaPrimaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 36px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#FFF',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 4px 24px rgba(16,185,129,0.3)',
    textShadow: 'var(--ts-dark)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  ctaSecondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 36px',
    background: 'transparent',
    color: '#10B981',
    border: '1.5px solid rgba(16,185,129,0.4)',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s',
    textShadow: 'var(--ts-dark)',
  },
};
