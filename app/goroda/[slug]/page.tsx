import type { Metadata } from 'next';
import Link from 'next/link';
import platformData from '@/data/platform.json';

/* ═══════════════════════════════════════════════════════════
   CITY DETAIL PAGE — /goroda/[slug]
   Server Component • Static Generation • SEO-Optimised
   ═══════════════════════════════════════════════════════════ */

const { cities, services, clinics } = platformData;

/* ── Extended city descriptions ── */
const cityDescriptions: Record<string, string[]> = {
  'pyatigorsk': [
    'Пятигорск — крупнейший город региона Кавказских Минеральных Вод с населением более 145 000 человек. Город является центром курортного лечения и реабилитации, что создаёт уникальную среду для медицинских услуг, включая наркологическую помощь.',
    'Развитая медицинская инфраструктура Пятигорска включает десятки клиник и реабилитационных центров. Климат и природные ресурсы региона — минеральные источники, горный воздух — способствуют восстановлению пациентов, проходящих курс реабилитации от зависимостей.',
    'Платформа UNITY сотрудничает с проверенными наркологическими клиниками Пятигорска, каждая из которых прошла верификацию лицензий и имеет подтверждённую репутацию. Мы помогаем найти оптимальную клинику с учётом конкретной ситуации и бюджета.',
  ],
  'kislovodsk': [
    'Кисловодск — один из старейших и наиболее известных курортных городов России с населением около 120 000 человек. Город славится нарзанными источниками, Курортным парком и целебным микроклиматом, создающим идеальные условия для реабилитации.',
    'Наркологические клиники Кисловодска сочетают современные медицинские протоколы с преимуществами курортной среды. Пациенты проходят лечение в окружении природы, что положительно влияет на психоэмоциональное восстановление.',
    'UNITY помогает жителям и гостям Кисловодска получить анонимную наркологическую помощь — от экстренного вывода из запоя до длительной реабилитации в комфортных стационарных условиях.',
  ],
  'zheleznovodsk': [
    'Железноводск — уютный город-курорт у подножия горы Железной с населением около 25 000 человек. Город известен своими минеральными источниками и спокойной атмосферой, идеально подходящей для стационарной реабилитации.',
    'Небольшой размер города обеспечивает максимальную анонимность для пациентов наркологических клиник. Удалённость от шума крупных городов и близость к природе создают оптимальные условия для восстановления.',
    'В Железноводске располагаются клиники премиум-класса с индивидуальным подходом к каждому пациенту. UNITY рекомендует проверенные центры с люксовыми условиями стационара и высококвалифицированным персоналом.',
  ],
  'essentuki': [
    'Ессентуки — город-курорт федерального значения с населением более 113 000 человек. Развитая медицинская инфраструктура, благоприятный климат и транспортная доступность делают город удобным для получения наркологической помощи.',
    'Город располагает современными клиниками, оказывающими полный спектр наркологических услуг: от экстренной детоксикации до комплексных программ реабилитации. Специалисты Ессентуков имеют многолетний опыт работы с различными видами зависимостей.',
    'Платформа UNITY обеспечивает жителям Ессентуков быстрый доступ к проверенной наркологической помощи с гарантией анонимности и качества лечения.',
  ],
  'mineralnye-vody': [
    'Минеральные Воды — транспортный узел региона КМВ с населением около 76 000 человек. Наличие международного аэропорта и железнодорожного вокзала обеспечивает доступность города для пациентов из других регионов.',
    'Медицинская инфраструктура Минеральных Вод активно развивается. Наркологические клиники города предлагают современные методы лечения зависимостей с использованием сертифицированных препаратов и доказательных психотерапевтических методик.',
    'UNITY помогает найти проверенную наркологическую помощь в Минеральных Водах — как для местных жителей, так и для пациентов, приезжающих на лечение из других городов России.',
  ],
  'stavropol': [
    'Ставрополь — столица Ставропольского края, крупнейший город региона с населением около 450 000 человек. Город обладает максимальным количеством медицинских учреждений, включая наркологические клиники различного уровня.',
    'В Ставрополе работают как государственные наркологические диспансеры, так и частные клиники премиум-класса. Широкий выбор позволяет подобрать оптимальный вариант лечения с учётом финансовых возможностей и предпочтений пациента.',
    'Платформа UNITY верифицирует каждую клинику-партнёра в Ставрополе: проверяет лицензии, собирает реальные отзывы и оценивает условия лечения. Это гарантирует пациентам безопасность и качество медицинской помощи.',
  ],
};

/* ── Helper ── */
function formatPrice(n: number) {
  return n.toLocaleString('ru-RU');
}
function formatPopulation(n: number) {
  if (n >= 1000) return `${Math.round(n / 1000)} тыс.`;
  return n.toString();
}

/* ═══════════════ STATIC PARAMS ═══════════════ */
export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

/* ═══════════════ METADATA ═══════════════ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);
  if (!city) return { title: 'Город не найден' };

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
    },
  };
}

/* ═══════════════ PAGE COMPONENT ═══════════════ */
export default async function CityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>Город не найден</h1>
          <Link href="/goroda" style={styles.backLink}>← Все города</Link>
        </div>
      </div>
    );
  }

  const cityDesc = cityDescriptions[city.slug] || cityDescriptions['pyatigorsk'];
  const cityClinics = clinics.filter((c) => c.cityId === city.id);

  return (
    <div style={styles.wrapper}>
      {/* ── Breadcrumbs ── */}
      <nav style={styles.breadcrumbs} aria-label="Навигация">
        <Link href="/" style={styles.breadcrumbLink}>Главная</Link>
        <span style={styles.breadcrumbSep}>→</span>
        <Link href="/goroda" style={styles.breadcrumbLink}>Города</Link>
        <span style={styles.breadcrumbSep}>→</span>
        <span style={styles.breadcrumbCurrent}>{city.name}</span>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section style={styles.heroSection}>
        <div style={styles.heroGlow} />
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <span style={styles.heroEyebrow}>{city.region}</span>
            <h1 style={styles.heroTitle}>{city.name}</h1>
            <p style={styles.heroSubtitle}>{city.description}</p>
            <div style={styles.heroStats}>
              <div style={styles.heroStat}>
                <span style={styles.heroStatValue}>{formatPopulation(city.population)}</span>
                <span style={styles.heroStatLabel}>населения</span>
              </div>
              <div style={styles.heroStatDivider} />
              <div style={styles.heroStat}>
                <span style={styles.heroStatValue}>{cityClinics.length}</span>
                <span style={styles.heroStatLabel}>{cityClinics.length === 1 ? 'клиника' : 'клиник'}</span>
              </div>
              <div style={styles.heroStatDivider} />
              <div style={styles.heroStat}>
                <span style={styles.heroStatValue}>{services.length}</span>
                <span style={styles.heroStatLabel}>услуг</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT CITY ═══════════ */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Наркологическая помощь в городе {city.name}</h2>
          <div style={styles.textColumn}>
            {cityDesc.map((p, i) => (
              <p key={i} style={styles.paragraph}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES GRID ═══════════ */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Доступные услуги</h2>
          <div style={styles.servicesGrid}>
            {services.map((service) => {
              /* Find best price from clinics in this city */
              const clinicInCity = cityClinics.find((c) =>
                c.services.includes(service.id)
              );
              const price = clinicInCity?.prices[service.id as keyof typeof clinicInCity.prices];

              return (
                <Link
                  key={service.id}
                  href={`/uslugi/${service.slug}`}
                  style={styles.serviceCard}
                >
                  <div style={styles.serviceCardGlow} />
                  <span style={styles.serviceIcon}>{service.icon}</span>
                  <h3 style={styles.serviceName}>{service.name}</h3>
                  <p style={styles.serviceDesc}>{service.shortDesc}</p>
                  <div style={styles.serviceFooter}>
                    <span style={styles.servicePrice}>
                      {service.priceFrom === 0
                        ? 'Бесплатно'
                        : `от ${formatPrice(price?.from || service.priceFrom)} ₽`}
                    </span>
                    <span style={styles.serviceArrow}>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED CLINICS ═══════════ */}
      {cityClinics.length > 0 && (
        <section style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Проверенные клиники в городе {city.name}</h2>
            <div style={styles.clinicsGrid}>
              {cityClinics.map((clinic) => (
                <div key={clinic.id} style={styles.clinicCard}>
                  {/* Header */}
                  <div style={styles.clinicHeader}>
                    <div>
                      <h3 style={styles.clinicName}>{clinic.name}</h3>
                      <p style={styles.clinicAddress}>📍 {clinic.address}</p>
                    </div>
                    <div style={styles.clinicBadges}>
                      {clinic.verified && (
                        <span style={styles.verifiedBadge}>✓ Проверена</span>
                      )}
                      <span style={styles.ratingBadge}>⭐ {clinic.rating}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={styles.clinicDesc}>{clinic.description}</p>

                  {/* Stats Row */}
                  <div style={styles.clinicStatsRow}>
                    <div style={styles.clinicMiniStat}>
                      <span style={styles.miniStatValue}>{clinic.experience}</span>
                      <span style={styles.miniStatLabel}>лет опыта</span>
                    </div>
                    <div style={styles.clinicMiniStat}>
                      <span style={styles.miniStatValue}>{clinic.reviewCount}</span>
                      <span style={styles.miniStatLabel}>отзывов</span>
                    </div>
                    <div style={styles.clinicMiniStat}>
                      <span style={styles.miniStatValue}>{clinic.services.length}</span>
                      <span style={styles.miniStatLabel}>услуг</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div style={styles.featuresList}>
                    {clinic.features.map((f) => (
                      <span key={f} style={styles.featureTag}>{f}</span>
                    ))}
                  </div>

                  {/* Services */}
                  <div style={styles.clinicServices}>
                    {clinic.services.map((sId) => {
                      const svc = services.find((s) => s.id === sId);
                      return svc ? (
                        <Link
                          key={sId}
                          href={`/uslugi/${svc.slug}`}
                          style={styles.serviceTag}
                        >
                          {svc.icon} {svc.name}
                        </Link>
                      ) : null;
                    })}
                  </div>

                  {/* Working Hours */}
                  <p style={styles.workingHours}>🕐 {clinic.workingHours}</p>

                  {/* Actions */}
                  <div style={styles.clinicActions}>
                    <a href={`tel:${clinic.phone}`} style={styles.clinicCallBtn}>
                      📞 Позвонить
                    </a>
                    <a
                      href={`https://wa.me/${clinic.whatsapp?.replace(/[^0-9]/g, '')}`}
                      style={styles.clinicWhatsappBtn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {cityClinics.length === 0 && (
        <section style={styles.section}>
          <div style={styles.container}>
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>🏥</span>
              <h3 style={styles.emptyTitle}>Клиники добавляются</h3>
              <p style={styles.emptyText}>
                Мы активно работаем над расширением базы проверенных клиник в городе {city.name}. 
                Позвоните нам — мы подберём ближайшую клинику в вашем регионе.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ CTA ═══════════ */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaGlow} />
        <div style={styles.container}>
          <div style={styles.ctaInner}>
            <h2 style={styles.ctaTitle}>
              Нужна помощь в городе {city.name}?
            </h2>
            <p style={styles.ctaSubtitle}>
              Звонок бесплатный и анонимный. Подберём клинику за 5 минут.
            </p>
            <div style={styles.ctaButtons}>
              <a href="tel:+79289710993" style={styles.ctaCallBtn}>
                📞 +7 928 971-09-93
              </a>
              <Link href="/" style={styles.ctaOutlineBtn}>
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   INLINE STYLES
   ══════════════════════════════════════════════════════════ */
const styles: Record<string, React.CSSProperties> = {
  /* ── Wrapper ── */
  wrapper: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    minHeight: '100vh',
  },

  /* ── Container ── */
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },

  /* ── Breadcrumbs ── */
  breadcrumbs: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '100px 24px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    fontSize: '0.85rem',
  },
  breadcrumbLink: {
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    textShadow: 'var(--ts-dark)',
    transition: 'color 0.2s ease',
  },
  breadcrumbSep: {
    color: 'rgba(255,255,255,0.3)',
    textShadow: 'var(--ts-dark)',
  },
  breadcrumbCurrent: {
    color: '#10B981',
    fontWeight: 600,
    textShadow: 'var(--ts-dark)',
  },

  /* ── Hero ── */
  heroSection: {
    position: 'relative',
    padding: 'clamp(40px, 6vh, 80px) 0 clamp(60px, 8vh, 100px)',
    textAlign: 'center' as const,
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: '-20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '700px',
    height: '700px',
    background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  heroEyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.2em',
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.2rem, 5vw, 4rem)',
    color: '#fff',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.1,
  },
  heroSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
    color: 'rgba(255,255,255,0.75)',
    textShadow: 'var(--ts-dark)',
    maxWidth: '640px',
    lineHeight: 1.7,
  },
  heroStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    marginTop: '24px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  heroStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  heroStatValue: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
  },
  heroStatLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.5)',
    textShadow: 'var(--ts-dark)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  },
  heroStatDivider: {
    width: '1px',
    height: '40px',
    background: 'rgba(255,255,255,0.15)',
  },

  /* ── Sections ── */
  section: {
    padding: 'clamp(60px, 8vh, 100px) 0',
    background: 'rgba(6,4,10,0.7)',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
  sectionAlt: {
    padding: 'clamp(60px, 8vh, 100px) 0',
    background: 'rgba(6,4,10,0.85)',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
    color: '#fff',
    textShadow: 'var(--ts-dark)',
    marginBottom: '40px',
    textAlign: 'center' as const,
  },

  /* ── Text ── */
  textColumn: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  paragraph: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
    color: 'rgba(255,255,255,0.8)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.8,
  },

  /* ── Services Grid ── */
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  serviceCard: {
    position: 'relative',
    overflow: 'hidden',
    background: 'rgba(0,0,0,0.45)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '18px',
    padding: '28px 24px',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'border-color 0.3s ease, transform 0.2s ease',
  },
  serviceCardGlow: {
    position: 'absolute',
    top: '-40%',
    right: '-30%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  serviceIcon: {
    position: 'relative',
    fontSize: '2.2rem',
    filter: 'drop-shadow(0 0 16px rgba(16,185,129,0.3))',
  },
  serviceName: {
    position: 'relative',
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    color: '#fff',
    textShadow: 'var(--ts-dark)',
  },
  serviceDesc: {
    position: 'relative',
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.65)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.6,
    flex: 1,
  },
  serviceFooter: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
    paddingTop: '12px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  servicePrice: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
  },
  serviceArrow: {
    fontSize: '1.2rem',
    color: 'rgba(255,255,255,0.3)',
    transition: 'color 0.2s ease, transform 0.2s ease',
    textShadow: 'var(--ts-dark)',
  },

  /* ── Clinics ── */
  clinicsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  clinicCard: {
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '24px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'border-color 0.3s ease',
  },
  clinicHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '12px',
  },
  clinicName: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
    color: '#fff',
    textShadow: 'var(--ts-dark)',
  },
  clinicAddress: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
    marginTop: '4px',
  },
  clinicBadges: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  verifiedBadge: {
    background: 'rgba(16,185,129,0.15)',
    border: '1px solid rgba(16,185,129,0.3)',
    borderRadius: '100px',
    padding: '4px 14px',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
  },
  ratingBadge: {
    background: 'rgba(245,158,11,0.15)',
    border: '1px solid rgba(245,158,11,0.3)',
    borderRadius: '100px',
    padding: '4px 14px',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#F59E0B',
    textShadow: 'var(--ts-dark)',
  },
  clinicDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.75)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.7,
  },

  /* ── Stats Row ── */
  clinicStatsRow: {
    display: 'flex',
    gap: '32px',
    padding: '16px 0',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    flexWrap: 'wrap',
  },
  clinicMiniStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  miniStatValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.4rem',
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
  },
  miniStatLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.45)',
    textShadow: 'var(--ts-dark)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
  },

  /* ── Features ── */
  featuresList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  featureTag: {
    background: 'rgba(16,185,129,0.08)',
    border: '1px solid rgba(16,185,129,0.15)',
    borderRadius: '8px',
    padding: '5px 14px',
    fontSize: '0.78rem',
    color: 'rgba(255,255,255,0.7)',
    textShadow: 'var(--ts-dark)',
  },

  /* ── Clinic Services ── */
  clinicServices: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  serviceTag: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '6px 14px',
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    textShadow: 'var(--ts-dark)',
    transition: 'border-color 0.2s ease, color 0.2s ease',
  },
  workingHours: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.55)',
    textShadow: 'var(--ts-dark)',
  },

  /* ── Clinic Actions ── */
  clinicActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '4px',
  },
  clinicCallBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#fff',
    padding: '12px 28px',
    borderRadius: '14px',
    fontWeight: 700,
    fontSize: '0.95rem',
    textDecoration: 'none',
    textShadow: 'var(--ts-dark)',
    boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
    transition: 'transform 0.2s ease',
  },
  clinicWhatsappBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(37,211,102,0.15)',
    border: '1px solid rgba(37,211,102,0.3)',
    color: '#25D366',
    padding: '12px 28px',
    borderRadius: '14px',
    fontWeight: 700,
    fontSize: '0.95rem',
    textDecoration: 'none',
    textShadow: 'var(--ts-dark)',
    transition: 'background 0.2s ease',
  },

  /* ── Empty State ── */
  emptyState: {
    textAlign: 'center' as const,
    padding: '60px 24px',
  },
  emptyIcon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '16px',
  },
  emptyTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.6rem',
    color: '#fff',
    textShadow: 'var(--ts-dark)',
    marginBottom: '12px',
  },
  emptyText: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
    maxWidth: '480px',
    margin: '0 auto',
    lineHeight: 1.6,
  },

  /* ── CTA ── */
  ctaSection: {
    position: 'relative',
    padding: 'clamp(80px, 10vh, 120px) 0',
    background: 'rgba(6,4,10,0.85)',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    textAlign: 'center' as const,
    overflow: 'hidden',
  },
  ctaGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '400px',
    background: 'radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  ctaInner: {
    position: 'relative',
    zIndex: 1,
  },
  ctaTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
    color: '#fff',
    textShadow: 'var(--ts-dark)',
    marginBottom: '16px',
  },
  ctaSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
    color: 'rgba(255,255,255,0.7)',
    textShadow: 'var(--ts-dark)',
    marginBottom: '32px',
    maxWidth: '560px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaCallBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#fff',
    padding: '16px 36px',
    borderRadius: '14px',
    fontWeight: 700,
    fontSize: '1.1rem',
    textDecoration: 'none',
    textShadow: 'var(--ts-dark)',
    boxShadow: '0 6px 30px rgba(16,185,129,0.35)',
    transition: 'transform 0.2s ease',
  },
  ctaOutlineBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    color: '#fff',
    padding: '16px 36px',
    borderRadius: '14px',
    fontWeight: 700,
    fontSize: '1.1rem',
    textDecoration: 'none',
    textShadow: 'var(--ts-dark)',
    border: '2px solid rgba(255,255,255,0.2)',
    transition: 'border-color 0.3s ease',
  },

  /* ── 404 ── */
  backLink: {
    color: '#10B981',
    fontSize: '1rem',
    textDecoration: 'none',
    textShadow: 'var(--ts-dark)',
  },
};
