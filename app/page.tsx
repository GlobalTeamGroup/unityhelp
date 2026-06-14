'use client';

import { useEffect, useRef, useState } from 'react';
import platformData from '@/data/platform.json';

/* ═══════════════════════════════════════════
   UNITY — Homepage
   The MONEY page. Cinematic, premium, converts.
   ═══════════════════════════════════════════ */

const { cities, services, clinics } = platformData;
const clinic = clinics[0]; // Liberti — featured clinic

/* ── Helpers ── */
function formatPrice(n: number) {
  return n.toLocaleString('ru-RU');
}

function getServiceName(id: string) {
  return services.find((s) => s.id === id)?.name ?? id;
}

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
            const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
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

/* ══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function HomePage() {
  const mainRef = useRef<HTMLElement>(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [consent, setConsent] = useState(false);
  const [showForm, setShowForm] = useState(false);

  /* ── Scroll reveal with IntersectionObserver ── */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ═══════════════ RENDER ═══════════════ */
  return (
    <>
      {/* ── Application Form Modal ── */}
      {showForm && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowForm(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Форма заявки"
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setShowForm(false)} aria-label="Закрыть">
              ✕
            </button>
            <h3 style={styles.modalTitle}>Оставить заявку</h3>
            <p style={styles.modalSubtitle}>
              Мы перезвоним вам в течение 5 минут. Полная анонимность гарантирована.
            </p>
            <form
              style={styles.modalForm}
              onSubmit={(e) => {
                e.preventDefault();
                alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                setShowForm(false);
              }}
            >
              <input type="text" placeholder="Ваше имя" required style={styles.modalInput} />
              <input type="tel" placeholder="Телефон" required style={styles.modalInput} />
              <select style={styles.modalInput} defaultValue="">
                <option value="" disabled>Выберите услугу</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <textarea placeholder="Опишите ситуацию (необязательно)" rows={3} style={styles.modalInput} />
              <label style={styles.consentLabel}>
                <input
                  type="checkbox"
                  required
                  style={styles.consentCheckbox}
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>
                  Я даю согласие на обработку персональных данных в соответствии с{' '}
                  <span style={{ color: 'var(--c-primary)', textDecoration: 'underline' }}>
                    ФЗ‑152 «О персональных данных»
                  </span>
                </span>
              </label>
              <button type="submit" style={styles.submitBtn}>
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      )}

      <main ref={mainRef} style={styles.main} className="scroll-snap-main">
        {/* ═══════════════════════════════════════
            EMERGENCY BAR
            ═══════════════════════════════════════ */}
        <div style={styles.emergencyBar}>
          <div style={styles.emergencyInner}>
            <span style={styles.emergencyText}>
              🆘 Ваш звонок может спасти жизнь
            </span>
            <a href="tel:+79289710993" style={styles.emergencyBtn}>
              📞 Позвонить сейчас
            </a>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            SECTION 1 — HERO
            ═══════════════════════════════════════ */}
        <section style={styles.heroSection} aria-label="Главный экран" className="grid-overlay noise-overlay">
          {/* Animated Mesh Gradient Background */}
          <div style={styles.meshGradient1} />
          <div style={styles.meshGradient2} />
          <div style={styles.meshGradient3} />

          {/* Legacy decorative gradients */}
          <div style={styles.heroBgGradient1} />
          <div style={styles.heroBgGradient2} />

          <div style={styles.heroGrid}>
            {/* Left Content */}
            <div style={styles.heroLeft} className="reveal">
              <span style={styles.eyebrow}>
                АНОНИМНО • КРУГЛОСУТОЧНО • ПО ВСЕЙ РОССИИ
              </span>

              <h1 style={styles.heroTitle}>
                Найдите проверенную клинику{' '}
                <span className="gradient-text">рядом с вами</span>
              </h1>

              <p style={styles.heroSubtitle}>
                Мы проверяем лицензии, собираем отзывы и помогаем выбрать лучшую клинику
                для лечения зависимости
              </p>

              {/* Search Form — Glass-morphism with animated glow */}
              <div style={styles.searchForm} className="search-glow-form">
                <div style={styles.searchRow}>
                  <select
                    style={styles.searchSelect}
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    aria-label="Выберите город"
                  >
                    <option value="">🏙️ Выберите город</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                  <select
                    style={styles.searchSelect}
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    aria-label="Выберите услугу"
                  >
                    <option value="">🩺 Услуга</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.slug}>{s.name}</option>
                    ))}
                  </select>
                  <button
                    style={styles.searchBtn}
                    onClick={() => {
                      if (selectedCity) {
                        window.location.href = `/goroda/${selectedCity}`;
                      }
                    }}
                  >
                    🔍 Найти клинику
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div style={styles.trustBadges}>
                {[
                  '✅ 700+ клиник',
                  '✅ Лицензии проверены',
                  '✅ 100% анонимно',
                ].map((badge) => (
                  <span key={badge} style={styles.trustBadge}>{badge}</span>
                ))}
              </div>
            </div>

            {/* Right — Enhanced Glowing Orb with 3 rings + particles */}
            <div style={styles.heroRight} className="reveal">
              <div style={styles.orbContainer}>
                {/* 3 rotating rings with different tilt angles */}
                <div style={styles.orbRing1} className="orb-ring-1" />
                <div style={styles.orbRing2} className="orb-ring-2" />
                <div style={styles.orbRing3} className="orb-ring-3" />
                <div style={styles.orbCore} />
                <div style={styles.orbGlow} />

                {/* Floating particles around orb */}
                {[0,1,2,3,4,5].map((i) => (
                  <div
                    key={`orb-p-${i}`}
                    className="hero-particle"
                    style={{
                      width: `${3 + (i % 3) * 2}px`,
                      height: `${3 + (i % 3) * 2}px`,
                      top: `${20 + i * 12}%`,
                      left: `${15 + ((i * 17) % 70)}%`,
                      ['--p-duration' as string]: `${5 + i * 1.5}s`,
                      ['--p-delay' as string]: `${i * 0.8}s`,
                      ['--dx' as string]: `${(i % 2 === 0 ? 1 : -1) * (15 + i * 8)}px`,
                      ['--dy' as string]: `${-30 - i * 15}px`,
                      ['--dx2' as string]: `${(i % 2 === 0 ? -1 : 1) * (10 + i * 5)}px`,
                      ['--dy2' as string]: `${-60 - i * 20}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 2 — SERVICES (Bento Grid)
            ═══════════════════════════════════════ */}
        <section style={styles.servicesSection} aria-label="Виды помощи" className="noise-overlay">
          <div style={styles.sectionInner}>
            <h2 style={styles.sectionTitle} className="reveal">
              Виды <span className="gradient-text">помощи</span>
            </h2>

            <div style={styles.bentoGrid} className="reveal-stagger">
              {services.map((service, i) => {
                const isTall = i === 0 || i === 3;
                const isWide = i === 6;
                return (
                  <a
                    key={service.id}
                    href={`/uslugi/${service.slug}`}
                    style={{
                      ...styles.serviceCard,
                      ...(isTall ? styles.serviceCardTall : {}),
                      ...(isWide ? styles.serviceCardWide : {}),
                    }}
                    className="service-card gradient-border-card shimmer-card"
                  >
                    <span style={styles.serviceIcon} className="icon-glow">{service.icon}</span>
                    <h3 style={styles.serviceCardTitle}>{service.name}</h3>
                    <p style={styles.serviceCardDesc}>{service.shortDesc}</p>
                    <div style={styles.serviceCardFooter}>
                      <span style={styles.servicePrice}>
                        {service.priceFrom > 0
                          ? `от ${formatPrice(service.priceFrom)} ₽`
                          : 'Бесплатно'}
                      </span>
                      <span style={styles.serviceArrow}>→</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 3 — HOW IT WORKS (Inverted)
            ═══════════════════════════════════════ */}
        <section style={styles.howSection} aria-label="Как это работает">
          <div style={styles.sectionInner}>
            <h2 style={styles.sectionTitleDark} className="reveal">
              Как это работает
            </h2>

            <div style={styles.stepsGrid} className="reveal-stagger">
              {[
                { num: '01', icon: '🔍', title: 'Выберите город и услугу', desc: 'Укажите ваш город и тип помощи, которая вам нужна. Мы покажем все проверенные варианты.' },
                { num: '02', icon: '📋', title: 'Сравните клиники', desc: 'Изучите рейтинги, отзывы реальных пациентов, цены и условия лечения в разных клиниках.' },
                { num: '03', icon: '📞', title: 'Оставьте заявку', desc: 'Позвоните или оставьте заявку онлайн. Мы перезвоним в течение 5 минут. Полная анонимность.' },
                { num: '04', icon: '🏥', title: 'Получите помощь', desc: 'Начните лечение в проверенной клинике с лицензией. Мы сопровождаем на каждом этапе.' },
              ].map((step) => (
                <div key={step.num} style={styles.stepCard}>
                  <div style={styles.stepNumber}>{step.num}</div>
                  <span style={styles.stepIcon}>{step.icon}</span>
                  <h3 style={styles.stepTitle}>{step.title}</h3>
                  <p style={styles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Timeline connector */}
            <div style={styles.timelineConnector} className="reveal" />
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 4 — STATS
            ═══════════════════════════════════════ */}
        <section style={styles.statsSection} aria-label="Статистика" className="noise-overlay">
          <div style={styles.heroBgGradient3} />
          <div style={styles.sectionInner}>
            <div style={styles.statsGrid} className="reveal-stagger">
              {[
                { target: 700, suffix: '+', label: 'клиник по России', pct: 90 },
                { target: 85, suffix: '', label: 'регионов покрытия', pct: 85 },
                { target: 24, suffix: '/7', label: 'круглосуточная помощь', pct: 100 },
                { target: 100, suffix: '%', label: 'анонимность', pct: 100 },
              ].map((stat, idx) => {
                const ringOffset = 283 - (283 * stat.pct / 100);
                return (
                  <div key={stat.label} style={styles.statCard}>
                    {/* Progress ring */}
                    <svg
                      className="stat-ring visible"
                      width="120" height="120"
                      viewBox="0 0 100 100"
                      style={{ ['--ring-offset' as string]: ringOffset, ['--ring-delay' as string]: `${idx * 0.2}s` }}
                    >
                      <circle className="ring-bg" cx="50" cy="50" r="45" />
                      <circle className="ring-fg" cx="50" cy="50" r="45" />
                    </svg>
                    <span style={styles.statNumber} className="gradient-text counter-glow">
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                    </span>
                    <span
                      style={{ ...styles.statLabel, ['--stagger-delay' as string]: `${0.3 + idx * 0.15}s` }}
                      className="stat-label-animate visible"
                    >
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 5 — FEATURED CLINIC
            ═══════════════════════════════════════ */}
        <section style={styles.clinicSection} aria-label="Проверенные клиники">
          <div style={styles.sectionInner}>
            <h2 style={styles.sectionTitle} className="reveal">
              Проверенные клиники{' '}
              <span className="gradient-text">вашего региона</span>
            </h2>

            <div style={styles.clinicCard} className="reveal">
              <div style={styles.clinicCardInner}>
                {/* Photo / Gradient Placeholder */}
                <div style={styles.clinicPhoto}>
                  <div style={styles.clinicPhotoBg} />
                  <div style={styles.clinicVerifiedBadge}>
                    ✅ Проверено UNITY
                  </div>
                </div>

                {/* Info */}
                <div style={styles.clinicInfo}>
                  <div style={styles.clinicHeader}>
                    <h3 style={styles.clinicName}>{clinic.name}</h3>
                    <div style={styles.clinicRating}>
                      <span style={styles.clinicStars}>
                        {'⭐'.repeat(Math.floor(clinic.rating))}
                      </span>
                      <span style={styles.clinicRatingNum}>{clinic.rating}</span>
                      <span style={styles.clinicReviewCount}>
                        ({clinic.reviewCount} отзывов)
                      </span>
                    </div>
                  </div>

                  <p style={styles.clinicAddress}>
                    📍 {cities.find((c) => c.id === clinic.cityId)?.name},{' '}
                    {clinic.address}
                  </p>

                  <p style={styles.clinicDesc}>{clinic.description}</p>

                  {/* Features */}
                  <div style={styles.clinicFeatures}>
                    {clinic.features.map((f) => (
                      <span key={f} style={styles.clinicFeatureTag}>
                        ✓ {f}
                      </span>
                    ))}
                  </div>

                  {/* Services Tags */}
                  <div style={styles.clinicServiceTags}>
                    {clinic.services.slice(0, 5).map((sId) => (
                      <span key={sId} style={styles.clinicServiceTag}>
                        {getServiceName(sId)}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div style={styles.clinicFooter}>
                    <div style={styles.clinicPriceRange}>
                      от <strong>{formatPrice(2000)} ₽</strong> до{' '}
                      <strong>{formatPrice(80000)} ₽</strong>
                    </div>
                    <div style={styles.clinicCTAs}>
                      <a href={`tel:${clinic.phone}`} style={styles.clinicCallBtn}>
                        📞 Позвонить
                      </a>
                      <button
                        style={styles.clinicFormBtn}
                        onClick={() => setShowForm(true)}
                      >
                        💬 Оставить заявку
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p style={styles.comingSoon} className="reveal">
              Скоро: Москва, Санкт-Петербург, Краснодар и другие города
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 6 — QUOTE
            ═══════════════════════════════════════ */}
        <section style={styles.quoteSection} aria-label="Цитата">
          <div style={styles.sectionInner}>
            <div className="reveal" style={{ textAlign: 'center' as const }}>
              <blockquote style={styles.quoteText}>
                «Зависимость — это не приговор.
                <br />
                Это болезнь, которую можно лечить»
              </blockquote>
              <p style={styles.quoteAuthor}>— Платформа UNITY</p>
              <div style={styles.quoteLine} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 7 — REGIONS
            ═══════════════════════════════════════ */}
        <section style={styles.regionsSection} aria-label="Города" className="noise-overlay">
          <div style={styles.sectionInner}>
            <h2 style={styles.sectionTitle} className="reveal">
              Работаем по всему{' '}
              <span className="gradient-text">Ставропольскому краю</span>
            </h2>

            <div style={styles.citiesGrid} className="reveal-stagger">
              {cities.map((city) => (
                <a
                  key={city.id}
                  href={`/goroda/${city.slug}`}
                  style={styles.cityCard}
                  className="city-card"
                >
                  <div style={styles.cityCardGradient} />
                  {/* Bottom gradient overlay */}
                  <div style={styles.cityCardBottomGradient} />
                  {/* Map pin pulse on hover */}
                  <div className="map-pin-pulse">
                    <div className="map-pin-dot" />
                  </div>
                  <h3 style={styles.cityCardName}>{city.name}</h3>
                  <p style={styles.cityCardPop}>
                    👥 <AnimatedCounter target={Math.round(city.population / 1000)} suffix="" /> тыс. жителей
                  </p>
                  <span style={styles.cityCardLink}>
                    Смотреть клиники →
                  </span>
                </a>
              ))}
            </div>

            <p style={styles.expansionNote} className="reveal">
              Расширяемся на всю Россию. Более 85 регионов к 2027 году
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 8 — FINAL CTA
            ═══════════════════════════════════════ */}
        <section style={styles.ctaSection} aria-label="Запись">
          {/* Animated gradient background */}
          <div style={styles.ctaAnimatedBg} />
          <div style={styles.ctaBgGlow} />

          {/* Floating teal particles */}
          {[0,1,2,3].map((i) => (
            <div
              key={`cta-p-${i}`}
              className="cta-particle"
              style={{
                top: `${25 + i * 15}%`,
                left: `${15 + i * 22}%`,
                ['--p-duration' as string]: `${5 + i * 2}s`,
                ['--p-delay' as string]: `${i * 1.2}s`,
                ['--dx' as string]: `${(i % 2 === 0 ? 1 : -1) * (20 + i * 10)}px`,
                ['--dy' as string]: `${-40 - i * 20}px`,
                ['--dx2' as string]: `${(i % 2 === 0 ? -1 : 1) * 15}px`,
                ['--dy2' as string]: `${-90 - i * 15}px`,
              }}
            />
          ))}

          <div style={styles.sectionInner}>
            <div className="reveal" style={{ textAlign: 'center' as const }}>
              <h2 style={styles.ctaTitle}>
                Не откладывайте.{' '}
                <span className="gradient-text">Каждый день на счету.</span>
              </h2>
              <p style={styles.ctaSubtitle}>
                Бесплатная анонимная консультация. Мы поможем выбрать клинику и записаться на приём.
              </p>

              <div style={styles.ctaButtons}>
                <a href="tel:+79289710993" style={styles.ctaCallBtn} className="cta-breathing-btn">
                  📞 Позвонить: 8-928-971-09-93
                </a>
                <button
                  style={styles.ctaOutlineBtn}
                  onClick={() => setShowForm(true)}
                >
                  💬 Оставить заявку
                </button>
              </div>

              {/* Disclaimer */}
              <p style={styles.disclaimer}>
                Имеются противопоказания. Необходима консультация специалиста.
                <br />
                Лицензия на осуществление медицинской деятельности.
              </p>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <div style={styles.footerLeft}>
              <span style={styles.footerLogo}>UNITY</span>
              <span style={styles.footerTagline}>помощь зависимым людям</span>
            </div>
            <div style={styles.footerLinks}>
              <a href="/o-nas" style={styles.footerLink}>О нас</a>
              <a href="/uslugi" style={styles.footerLink}>Услуги</a>
              <a href="/goroda" style={styles.footerLink}>Города</a>
              <a href="/politika" style={styles.footerLink}>Политика конфиденциальности</a>
            </div>
            <p style={styles.footerCopy}>
              © {new Date().getFullYear()} UNITY. Все права защищены.
              <br />
              Имеются противопоказания. Необходима консультация специалиста.
            </p>
          </div>
        </footer>
      </main>

      {/* ── Global Interactive Styles ── */}
      <style>{`
        /* ── Service Cards Hover ── */
        .service-card {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.35s ease,
                      box-shadow 0.35s ease !important;
        }
        .service-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 60px rgba(16,185,129,0.15),
                      0 0 0 1px rgba(16,185,129,0.3) !important;
        }

        /* ── City Cards Hover ── */
        .city-card {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.35s ease !important;
        }
        .city-card:hover {
          transform: translateY(-4px) scale(1.02) !important;
          border-color: rgba(16,185,129,0.5) !important;
        }

        /* ── Bento Grid Responsive ── */
        @media (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bento-tall { grid-row: span 1 !important; }
          .bento-wide { grid-column: span 2 !important; }
        }
        @media (max-width: 640px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-wide { grid-column: span 1 !important; }
        }

        /* ── Steps Grid Responsive ── */
        @media (max-width: 900px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ── Hero Grid Responsive ── */
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-right {
            display: none !important;
          }
          .search-row {
            flex-direction: column !important;
          }
        }

        /* ── Clinic Card Responsive ── */
        @media (max-width: 800px) {
          .clinic-inner {
            flex-direction: column !important;
          }
          .clinic-photo {
            min-height: 200px !important;
            width: 100% !important;
          }
        }

        /* ── Stats Responsive ── */
        @media (max-width: 700px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* ── Cities Grid Responsive ── */
        @media (max-width: 700px) {
          .cities-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 440px) {
          .cities-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ── CTA Buttons Responsive ── */
        @media (max-width: 540px) {
          .cta-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }

        /* ── Orb Animation (upgraded: 3 rings with tilt) ── */
        .orb-core {
          animation: pulse-glow 3s ease-in-out infinite, float 6s ease-in-out infinite;
        }
        .orb-ring-1 {
          animation: orbRingSpin1 15s linear infinite;
        }
        .orb-ring-2 {
          animation: orbRingSpin2 22s linear infinite;
        }
        .orb-ring-3 {
          animation: orbRingSpin3 30s linear infinite;
        }
        .orb-glow {
          animation: orb-breathe 4s ease-in-out infinite;
        }

        /* ── Form Focus States ── */
        .modal-input:focus {
          border-color: var(--c-primary) !important;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.2) !important;
        }

        /* ── Emergency Shimmer ── */
        .emergency-btn {
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        /* ── CTA animated background ── */
        .cta-animated-bg {
          animation: ctaGradientShift 12s ease infinite;
          background-size: 300% 300%;
        }

        /* ── Mesh gradient animations ── */
        .mesh-g1 { animation: meshDrift1 12s ease-in-out infinite; }
        .mesh-g2 { animation: meshDrift2 15s ease-in-out infinite; }
        .mesh-g3 { animation: meshDrift3 18s ease-in-out infinite; }

        /* ── @property for conic gradient angle (Chromium) ── */
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   INLINE STYLES — Premium, cinematic, pixel-perfect
   ══════════════════════════════════════════════════════════ */
const styles: Record<string, React.CSSProperties> = {
  /* ── Main Container ── */
  main: {
    width: '100%',
    overflowX: 'hidden',
    position: 'relative',
    zIndex: 2,
  },

  /* ══════════════ EMERGENCY BAR ══════════════ */
  emergencyBar: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'linear-gradient(90deg, #991B1B 0%, #DC2626 50%, #991B1B 100%)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    padding: '10px 0',
  },
  emergencyInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  emergencyText: {
    fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
    fontWeight: 600,
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    letterSpacing: '0.02em',
  },
  emergencyBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'linear-gradient(90deg, #FFF 0%, #FEE2E2 50%, #FFF 100%)',
    backgroundSize: '200% 100%',
    color: '#991B1B',
    padding: '8px 20px',
    borderRadius: '100px',
    fontSize: '0.85rem',
    fontWeight: 700,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },

  /* ══════════════ HERO SECTION ══════════════ */
  heroSection: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: 'clamp(100px, 12vh, 140px) 24px clamp(60px, 8vh, 100px)',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.65) 0%, rgba(10,15,26,0.45) 40%, rgba(6,4,10,0.65) 100%)',
  },
  /* Animated mesh gradient blobs */
  meshGradient1: {
    position: 'absolute',
    top: '-10%',
    right: '5%',
    width: '45vw',
    height: '45vw',
    maxWidth: '650px',
    maxHeight: '650px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 40%, transparent 70%)',
    pointerEvents: 'none',
    filter: 'blur(40px)',
    zIndex: 0,
  },
  meshGradient2: {
    position: 'absolute',
    bottom: '0%',
    left: '-5%',
    width: '40vw',
    height: '40vw',
    maxWidth: '550px',
    maxHeight: '550px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(10,22,40,0.6) 0%, rgba(5,150,105,0.08) 50%, transparent 75%)',
    pointerEvents: 'none',
    filter: 'blur(50px)',
    zIndex: 0,
  },
  meshGradient3: {
    position: 'absolute',
    top: '30%',
    left: '40%',
    width: '30vw',
    height: '30vw',
    maxWidth: '400px',
    maxHeight: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 65%)',
    pointerEvents: 'none',
    filter: 'blur(60px)',
    zIndex: 0,
  },
  heroBgGradient1: {
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: '60vw',
    height: '60vw',
    maxWidth: '800px',
    maxHeight: '800px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroBgGradient2: {
    position: 'absolute',
    bottom: '-30%',
    left: '-15%',
    width: '50vw',
    height: '50vw',
    maxWidth: '600px',
    maxHeight: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(10,22,40,0.5) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroGrid: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: 'clamp(32px, 5vw, 80px)',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  heroLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--c-primary)',
    textShadow: 'var(--ts-dark)',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.2rem, 5vw, 4rem)',
    fontWeight: 400,
    lineHeight: 1.12,
    letterSpacing: '-0.01em',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
  },
  heroSubtitle: {
    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
    lineHeight: 1.7,
    color: 'var(--c-ink-muted)',
    textShadow: 'var(--ts-dark)',
    maxWidth: '540px',
  },

  /* Search Form */
  searchForm: {
    background: 'rgba(0,0,0,0.5)',
    border: '1.5px solid rgba(16,185,129,0.2)',
    borderRadius: '16px',
    padding: 'clamp(16px, 2vw, 24px)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 0 20px rgba(16,185,129,0.05), inset 0 0 20px rgba(16,185,129,0.02), 0 20px 60px rgba(0,0,0,0.3)',
    position: 'relative',
  },
  searchRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  searchSelect: {
    flex: '1 1 180px',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.08)',
    border: '1.5px solid rgba(255,255,255,0.15)',
    borderRadius: '12px',
    color: '#FFF',
    fontSize: '0.95rem',
    cursor: 'pointer',
    appearance: 'none' as const,
    minWidth: '0',
    colorScheme: 'dark',
    WebkitAppearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    paddingRight: '40px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  searchBtn: {
    flex: '0 0 auto',
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    color: '#FFF',
    border: 'none',
    borderRadius: '10px',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
  },

  /* Trust Badges */
  trustBadges: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    paddingTop: '8px',
  },
  trustBadge: {
    fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
    color: 'var(--c-ink-muted)',
    textShadow: 'var(--ts-dark)',
    whiteSpace: 'nowrap',
  },

  /* Hero Right — Orb */
  heroRight: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
  orbContainer: {
    position: 'relative',
    width: '360px',
    height: '360px',
    perspective: '800px',
  },
  orbCore: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 35%, #34D399 0%, #10B981 40%, #059669 80%, #047857 100%)',
    boxShadow: '0 0 60px rgba(16,185,129,0.5), 0 0 120px rgba(16,185,129,0.25), 0 0 200px rgba(16,185,129,0.1), inset 0 -20px 40px rgba(0,0,0,0.3)',
  },
  /* Ring 1 — closest, steep tilt */
  orbRing1: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    border: '1.5px solid rgba(16,185,129,0.15)',
    borderTopColor: 'rgba(16,185,129,0.7)',
    borderRightColor: 'rgba(52,211,153,0.4)',
  },
  /* Ring 2 — medium tilt, reverse */
  orbRing2: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '290px',
    height: '290px',
    borderRadius: '50%',
    border: '1px solid rgba(16,185,129,0.1)',
    borderBottomColor: 'rgba(16,185,129,0.5)',
    borderLeftColor: 'rgba(52,211,153,0.3)',
  },
  /* Ring 3 — outermost, shallow tilt */
  orbRing3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    border: '0.5px solid rgba(16,185,129,0.08)',
    borderTopColor: 'rgba(16,185,129,0.35)',
    borderRightColor: 'rgba(52,211,153,0.2)',
  },
  orbGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.1) 40%, transparent 70%)',
    filter: 'blur(30px)',
  },

  /* ══════════════ SERVICES SECTION ══════════════ */
  servicesSection: {
    position: 'relative',
    padding: 'clamp(80px, 10vh, 120px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.7) 0%, rgba(12,18,32,0.55) 50%, rgba(6,4,10,0.7) 100%)',
  },
  sectionInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
    fontWeight: 400,
    lineHeight: 1.2,
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    textAlign: 'center',
    marginBottom: 'clamp(40px, 5vw, 64px)',
  },

  /* Bento Grid */
  bentoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    gridAutoRows: 'minmax(180px, auto)',
  },
  serviceCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 'clamp(20px, 2.5vw, 28px)',
    background: 'rgba(0,0,0,0.45)',
    border: '1.5px solid rgba(16,185,129,0.2)',
    borderRadius: '14px',
    backdropFilter: 'blur(10px)',
    textDecoration: 'none',
    color: '#FFF',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  serviceCardTall: {
    gridRow: 'span 2',
  },
  serviceCardWide: {
    gridColumn: 'span 2',
  },
  serviceIcon: {
    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
    marginBottom: '12px',
  },
  serviceCardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
    fontWeight: 400,
    marginBottom: '8px',
    textShadow: 'var(--ts-dark)',
  },
  serviceCardDesc: {
    fontSize: 'clamp(0.82rem, 1vw, 0.92rem)',
    lineHeight: 1.6,
    color: 'var(--c-ink-muted)',
    textShadow: 'var(--ts-dark)',
    flex: 1,
  },
  serviceCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
    paddingTop: '12px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  servicePrice: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--c-primary)',
  },
  serviceArrow: {
    fontSize: '1.2rem',
    color: 'var(--c-primary)',
    transition: 'transform 0.2s',
  },

  /* ══════════════ HOW IT WORKS (INVERTED) ══════════════ */
  howSection: {
    position: 'relative',
    padding: 'clamp(80px, 10vh, 120px) 24px',
    background: 'linear-gradient(180deg, #F5EDE0 0%, #F5EDE3 100%)',
    zIndex: 3,
  },
  sectionTitleDark: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
    fontWeight: 400,
    lineHeight: 1.2,
    color: '#1d1d1f',
    textShadow: 'var(--ts-light)',
    textAlign: 'center',
    marginBottom: 'clamp(40px, 5vw, 64px)',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    position: 'relative',
  },
  stepCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '32px 20px',
    background: 'rgba(255,255,255,0.75)',
    border: '1.5px solid rgba(10,22,40,0.1)',
    borderRadius: '16px',
    position: 'relative',
  },
  stepNumber: {
    position: 'absolute',
    top: '-14px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 700,
  },
  stepIcon: {
    fontSize: '2.2rem',
    marginBottom: '16px',
    marginTop: '8px',
  },
  stepTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
    fontWeight: 400,
    color: '#1d1d1f',
    textShadow: 'var(--ts-light)',
    marginBottom: '10px',
  },
  stepDesc: {
    fontSize: 'clamp(0.82rem, 1vw, 0.92rem)',
    lineHeight: 1.65,
    color: '#555',
    textShadow: 'var(--ts-light)',
  },
  timelineConnector: {
    display: 'none', // Hidden by default, can be enabled later with a decorative line
  },

  /* ══════════════ STATS SECTION ══════════════ */
  statsSection: {
    position: 'relative',
    padding: 'clamp(80px, 10vh, 120px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.7) 0%, rgba(10,22,40,0.5) 50%, rgba(6,4,10,0.7) 100%)',
    overflow: 'hidden',
  },
  heroBgGradient3: {
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
    textAlign: 'center',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '40px 20px',
    position: 'relative',
  },
  statNumber: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 400,
    lineHeight: 1,
    position: 'relative',
    zIndex: 1,
  },
  statLabel: {
    fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
    color: 'var(--c-ink-muted)',
    textShadow: 'var(--ts-dark)',
    fontWeight: 500,
    position: 'relative',
    zIndex: 1,
  },

  /* ══════════════ CLINIC SECTION ══════════════ */
  clinicSection: {
    position: 'relative',
    padding: 'clamp(80px, 10vh, 120px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.72) 0%, rgba(12,15,24,0.55) 50%, rgba(6,4,10,0.72) 100%)',
  },
  clinicCard: {
    background: 'rgba(0,0,0,0.5)',
    border: '1.5px solid rgba(16,185,129,0.25)',
    borderRadius: '20px',
    overflow: 'hidden',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 20px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
  },
  clinicCardInner: {
    display: 'flex',
    minHeight: '420px',
  },
  clinicPhoto: {
    position: 'relative',
    width: '40%',
    minWidth: '300px',
    overflow: 'hidden',
  },
  clinicPhotoBg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #0A1628 0%, #10B981 50%, #059669 100%)',
    opacity: 0.6,
  },
  clinicVerifiedBadge: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'rgba(16,185,129,0.9)',
    color: '#FFF',
    padding: '8px 16px',
    borderRadius: '100px',
    fontSize: '0.82rem',
    fontWeight: 600,
    backdropFilter: 'blur(8px)',
    zIndex: 1,
  },
  clinicInfo: {
    flex: 1,
    padding: 'clamp(24px, 3vw, 40px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  clinicHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  clinicName: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
    fontWeight: 400,
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
  },
  clinicRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  clinicStars: {
    fontSize: '1rem',
  },
  clinicRatingNum: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--c-warning)',
  },
  clinicReviewCount: {
    fontSize: '0.85rem',
    color: 'var(--c-ink-muted)',
  },
  clinicAddress: {
    fontSize: '0.92rem',
    color: 'var(--c-ink-muted)',
    textShadow: 'var(--ts-dark)',
  },
  clinicDesc: {
    fontSize: '0.92rem',
    lineHeight: 1.7,
    color: 'var(--c-ink-muted)',
    textShadow: 'var(--ts-dark)',
  },
  clinicFeatures: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  clinicFeatureTag: {
    fontSize: '0.8rem',
    color: 'var(--c-primary-light)',
    background: 'rgba(16,185,129,0.1)',
    padding: '4px 12px',
    borderRadius: '100px',
    border: '1px solid rgba(16,185,129,0.2)',
    whiteSpace: 'nowrap',
  },
  clinicServiceTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  clinicServiceTag: {
    fontSize: '0.78rem',
    color: 'var(--c-ink-muted)',
    background: 'rgba(255,255,255,0.06)',
    padding: '4px 12px',
    borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.08)',
    whiteSpace: 'nowrap',
  },
  clinicFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    marginTop: 'auto',
    paddingTop: '16px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  clinicPriceRange: {
    fontSize: '0.95rem',
    color: 'var(--c-ink-muted)',
    textShadow: 'var(--ts-dark)',
  },
  clinicCTAs: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  clinicCallBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#FFF',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: 600,
    textDecoration: 'none',
    boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  clinicFormBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '12px 24px',
    background: 'transparent',
    color: 'var(--c-primary)',
    border: '1.5px solid var(--c-primary)',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
  },
  comingSoon: {
    textAlign: 'center',
    fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
    color: 'var(--c-ink-muted)',
    textShadow: 'var(--ts-dark)',
    marginTop: '40px',
    fontStyle: 'italic',
  },

  /* ══════════════ QUOTE SECTION ══════════════ */
  quoteSection: {
    position: 'relative',
    padding: 'clamp(80px, 12vh, 140px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.65) 0%, rgba(10,22,40,0.45) 50%, rgba(6,4,10,0.65) 100%)',
  },
  quoteText: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
    fontWeight: 400,
    lineHeight: 1.35,
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    fontStyle: 'normal',
    maxWidth: '800px',
    margin: '0 auto',
  },
  quoteAuthor: {
    fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
    color: 'var(--c-primary)',
    marginTop: '28px',
    fontWeight: 500,
  },
  quoteLine: {
    width: '80px',
    height: '3px',
    background: 'linear-gradient(90deg, transparent, var(--c-primary), transparent)',
    margin: '32px auto 0',
    borderRadius: '100px',
  },

  /* ══════════════ REGIONS SECTION ══════════════ */
  regionsSection: {
    position: 'relative',
    padding: 'clamp(80px, 10vh, 120px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.68) 0%, rgba(12,18,32,0.5) 50%, rgba(6,4,10,0.68) 100%)',
  },
  citiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  cityCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '28px 24px',
    minHeight: '180px',
    background: 'rgba(0,0,0,0.45)',
    border: '1.5px solid rgba(16,185,129,0.2)',
    borderRadius: '14px',
    overflow: 'hidden',
    textDecoration: 'none',
    color: '#FFF',
  },
  cityCardGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(10,22,40,0.3) 100%)',
    pointerEvents: 'none',
  },
  cityCardBottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)',
    pointerEvents: 'none',
    zIndex: 0,
    borderRadius: '0 0 14px 14px',
  },
  cityCardName: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
    fontWeight: 400,
    textShadow: 'var(--ts-dark)',
    marginBottom: '6px',
    position: 'relative',
    zIndex: 1,
  },
  cityCardPop: {
    fontSize: '0.85rem',
    color: 'var(--c-ink-muted)',
    textShadow: 'var(--ts-dark)',
    position: 'relative',
    zIndex: 1,
    marginBottom: '12px',
  },
  cityCardLink: {
    fontSize: '0.85rem',
    color: 'var(--c-primary)',
    fontWeight: 600,
    position: 'relative',
    zIndex: 1,
  },
  expansionNote: {
    textAlign: 'center',
    fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
    color: 'var(--c-ink-muted)',
    textShadow: 'var(--ts-dark)',
    marginTop: '40px',
  },

  /* ══════════════ CTA SECTION ══════════════ */
  ctaSection: {
    position: 'relative',
    padding: 'clamp(100px, 14vh, 160px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.6) 0%, rgba(10,22,40,0.4) 40%, rgba(6,4,10,0.6) 100%)',
    overflow: 'hidden',
  },
  ctaAnimatedBg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(16,185,129,0.04) 0%, rgba(10,22,40,0.2) 25%, rgba(5,150,105,0.06) 50%, rgba(10,22,40,0.15) 75%, rgba(16,185,129,0.03) 100%)',
    backgroundSize: '300% 300%',
    pointerEvents: 'none',
    zIndex: 0,
  },
  ctaBgGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '50vw',
    maxWidth: '600px',
    maxHeight: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 60%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  ctaTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
    fontWeight: 400,
    lineHeight: 1.15,
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '20px',
  },
  ctaSubtitle: {
    fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
    lineHeight: 1.7,
    color: 'var(--c-ink-muted)',
    textShadow: 'var(--ts-dark)',
    maxWidth: '600px',
    margin: '0 auto 40px',
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '40px',
  },
  ctaCallBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '18px 36px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#FFF',
    borderRadius: '12px',
    fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 8px 32px rgba(16,185,129,0.35)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  ctaOutlineBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '18px 36px',
    background: 'transparent',
    color: 'var(--c-primary)',
    border: '2px solid var(--c-primary)',
    borderRadius: '12px',
    fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
  },
  disclaimer: {
    fontSize: '0.78rem',
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1.6,
    maxWidth: '500px',
    margin: '0 auto',
    textShadow: 'var(--ts-dark)',
  },

  /* ══════════════ FOOTER ══════════════ */
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '48px 24px',
    background: 'rgba(6,4,10,0.85)',
  },
  footerInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  footerLeft: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
  },
  footerLogo: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.8rem',
    color: 'var(--c-primary)',
    letterSpacing: '0.08em',
  },
  footerTagline: {
    fontSize: '0.85rem',
    color: 'var(--c-ink-muted)',
  },
  footerLinks: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerLink: {
    fontSize: '0.9rem',
    color: 'var(--c-ink-muted)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  footerCopy: {
    fontSize: '0.78rem',
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
    lineHeight: 1.6,
  },

  /* ══════════════ MODAL ══════════════ */
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    padding: '24px',
  },
  modalContent: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto',
    background: 'linear-gradient(180deg, #111827 0%, #0A1628 100%)',
    border: '1.5px solid rgba(16,185,129,0.3)',
    borderRadius: '20px',
    padding: 'clamp(28px, 4vw, 40px)',
  },
  modalClose: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    color: '#FFF',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    transition: 'background 0.2s',
  },
  modalTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '8px',
  },
  modalSubtitle: {
    fontSize: '0.9rem',
    color: 'var(--c-ink-muted)',
    marginBottom: '24px',
    lineHeight: 1.6,
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  modalInput: {
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#FFF',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    width: '100%',
  },
  consentLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '0.8rem',
    color: 'var(--c-ink-muted)',
    lineHeight: 1.5,
    cursor: 'pointer',
  },
  consentCheckbox: {
    marginTop: '3px',
    width: '18px',
    height: '18px',
    flexShrink: 0,
    accentColor: 'var(--c-primary)',
    cursor: 'pointer',
  },
  submitBtn: {
    padding: '16px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#FFF',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginTop: '8px',
  },
};
