import type { Metadata } from 'next';
import Link from 'next/link';
import platformData from '@/data/platform.json';

/* ═══════════════════════════════════════════════════════════
   SERVICE DETAIL PAGE — /uslugi/[slug]
   Server Component • Static Generation • SEO-Optimised
   ═══════════════════════════════════════════════════════════ */

const { services, clinics, cities } = platformData;

/* ── Expert content per service ── */
const serviceContent: Record<string, {
  paragraphs: string[];
  benefits: string[];
}> = {
  'vivod-iz-zapoya': {
    paragraphs: [
      'Вывод из запоя — это экстренная медицинская процедура детоксикации организма, направленная на безопасное прекращение длительного употребления алкоголя. Квалифицированный врач-нарколог проводит инфузионную терапию с применением индивидуально подобранных препаратов: гепатопротекторов, витаминов группы B, седативных средств и электролитных растворов.',
      'Процедура может проводиться как на дому в привычной обстановке, так и в условиях стационара клиники. Домашний вывод из запоя рекомендуется при запоях длительностью до 5–7 дней без осложнений. При более тяжёлых случаях — с судорогами, галлюцинациями или сопутствующими заболеваниями — стационарное наблюдение обязательно.',
      'Своевременное обращение за медицинской помощью снижает риск развития алкогольного делирия (белой горячки), инсульта и острой сердечной недостаточности. Специалисты проверенных клиник UNITY обеспечивают круглосуточный мониторинг жизненных показателей и корректируют терапию в реальном времени.',
      'После завершения детоксикации пациенту рекомендуется продолжить лечение: кодирование, работа с психологом и, при необходимости, курс реабилитации. Комплексный подход значительно повышает шансы на стойкую ремиссию и возврат к полноценной жизни.',
    ],
    benefits: [
      'Экстренная помощь с выездом на дом в течение 30–60 минут',
      'Индивидуальный подбор капельницы под состояние пациента',
      'Круглосуточный мониторинг жизненных показателей',
      'Полная анонимность — без постановки на учёт',
      'Снятие тревоги, бессонницы и тремора за одну процедуру',
    ],
  },
  'kodirovanie': {
    paragraphs: [
      'Кодирование от алкоголизма — один из наиболее эффективных методов формирования стойкой установки на трезвость. Современные методики включают медикаментозное кодирование (препараты дисульфирама, налтрексона), аппаратные методы и психотерапевтическое воздействие по методу Довженко.',
      'Медикаментозное кодирование создаёт химический барьер: при употреблении алкоголя организм реагирует резким ухудшением самочувствия. Это формирует стойкий условный рефлекс отвращения. Инъекционные формы (Эспераль, Торпедо, Аквилонг) обеспечивают защиту от 3 месяцев до 5 лет.',
      'Психотерапевтическое кодирование по методу Довженко воздействует на подсознательные установки пациента, формируя мотивацию к трезвой жизни без медикаментозного вмешательства. Метод безопасен и не имеет побочных эффектов, однако требует искреннего желания пациента.',
      'Перед процедурой обязательна консультация нарколога, сбор анамнеза и, при необходимости, предварительная детоксикация. Все клиники-партнёры UNITY используют только сертифицированные препараты и работают по протоколам, утверждённым Минздравом РФ.',
    ],
    benefits: [
      'Выбор метода: медикаментозный, психотерапевтический или комбинированный',
      'Срок защиты от 3 месяцев до 5 лет — по выбору пациента',
      'Бесплатная консультация нарколога перед процедурой',
      'Использование только сертифицированных препаратов',
      'Гарантия анонимности и юридической защиты',
    ],
  },
  'snyatie-lomki': {
    paragraphs: [
      'Снятие абстинентного синдрома (ломки) — это неотложная медицинская помощь при наркотической зависимости. Абстиненция сопровождается мучительными физическими симптомами: судороги, боли в мышцах и суставах, бессонница, тошнота, тахикардия и панические атаки.',
      'Специалисты проводят комплексную инфузионную терапию, включающую обезболивающие, противосудорожные и седативные препараты. Программа детоксикации подбирается индивидуально в зависимости от вида употреблявшегося вещества, стажа зависимости и общего состояния здоровья.',
      'Процедура проводится исключительно под контролем врача в стационарных условиях. Попытки самостоятельного «перетерпеть ломку» крайне опасны и могут привести к судорожному синдрому, остановке дыхания и летальному исходу.',
      'После купирования острого состояния пациенту предлагается программа медикаментозной поддержки и психологической реабилитации для предотвращения срывов. Клиники UNITY обеспечивают круглосуточное сопровождение на всех этапах.',
    ],
    benefits: [
      'Экстренный выезд бригады в течение 30 минут',
      'Купирование болевого синдрома в первые часы',
      'Круглосуточное медицинское наблюдение в стационаре',
      'Индивидуальный протокол для каждого вида зависимости',
      'Дальнейший план лечения с закреплением за психологом',
    ],
  },
  'narkolog-na-dom': {
    paragraphs: [
      'Вызов нарколога на дом — это возможность получить профессиональную наркологическую помощь в привычной обстановке, без визита в клинику. Врач прибывает с полным набором медикаментов, оборудования для мониторинга и расходных материалов.',
      'Домашний визит включает осмотр пациента, измерение давления и пульса, оценку степени интоксикации и составление плана лечения. При необходимости нарколог проводит инфузионную терапию (капельницу), назначает медикаменты и даёт рекомендации по дальнейшему лечению.',
      'Услуга особенно востребована, когда пациент отказывается от госпитализации, состояние не требует стационарного наблюдения или необходима срочная консультация для родственников. Врачи выезжают круглосуточно, включая праздники и выходные.',
      'Анонимность гарантирована: врач приезжает на обычном автомобиле без опознавательных знаков, информация о визите не передаётся третьим лицам и не фиксируется в государственных базах данных.',
    ],
    benefits: [
      'Выезд врача круглосуточно — 365 дней в году',
      'Полная анонимность: без учёта и опознавательных знаков',
      'Все необходимые медикаменты и оборудование с собой',
      'Консультация и план лечения на месте',
      'Возможность экстренной госпитализации при необходимости',
    ],
  },
  'psikhologicheskaya-pomoshch': {
    paragraphs: [
      'Психологическая помощь при зависимости — ключевой элемент комплексного лечения. Зависимость формируется не только на физическом, но и на психологическом уровне: человек употребляет, чтобы справиться с тревогой, депрессией, неуверенностью или травматическим опытом.',
      'Клинические психологи и психотерапевты работают с корневыми причинами зависимости, используя доказательные методы: когнитивно-поведенческую терапию (КПТ), мотивационное интервьюирование, системную семейную терапию и программу «12 шагов».',
      'Индивидуальные сессии помогают пациенту осознать деструктивные паттерны поведения, выработать здоровые копинг-стратегии и сформировать мотивацию к трезвой жизни. Групповая терапия создаёт среду поддержки и взаимопомощи.',
      'Регулярная работа с психологом снижает риск рецидива на 40–60% по сравнению с одним только медикаментозным лечением. Платформа UNITY подбирает специалистов с опытом именно в аддиктологии.',
    ],
    benefits: [
      'Индивидуальные и групповые сессии — онлайн и очно',
      'Доказательные методы: КПТ, мотивационное интервьюирование',
      'Работа с корневыми причинами зависимости',
      'Снижение риска рецидива на 40–60%',
      'Поддержка на всех этапах: от мотивации до ресоциализации',
    ],
  },
  'pomoshch-rodstvennikam': {
    paragraphs: [
      'Помощь родственникам — это комплекс консультационных и терапевтических услуг для семей, столкнувшихся с зависимостью близкого человека. Созависимость — состояние, при котором вся жизнь семьи подчиняется болезни одного из её членов — не менее разрушительна, чем сама зависимость.',
      'Специалисты помогают родственникам понять природу зависимости как хронического заболевания, а не слабости воли. Это меняет подход: вместо обвинений и ультиматумов семья учится конструктивно мотивировать зависимого на лечение методом интервенции.',
      'Программа включает консультации психолога, группы поддержки для созависимых, обучение коммуникативным навыкам и помощь в организации интервенции — профессионально спланированного разговора с зависимым о необходимости лечения.',
      'Многие клиники-партнёры UNITY предлагают бесплатные первичные консультации для родственников. Это первый шаг, который может кардинально изменить ситуацию в семье.',
    ],
    benefits: [
      'Бесплатная первичная консультация для семьи',
      'Профессиональная организация интервенции',
      'Группы поддержки для созависимых',
      'Обучение навыкам здоровой коммуникации',
      'Психологическое сопровождение семьи на всех этапах лечения',
    ],
  },
  'reabilitatsiya': {
    paragraphs: [
      'Реабилитация — это комплексная программа восстановления, направленная на полное избавление от зависимости и возврат к полноценной жизни. Стационарная реабилитация длится от 28 дней до 12 месяцев и включает медицинское сопровождение, психотерапию, социальную адаптацию и трудотерапию.',
      'Программы реабилитации строятся на международных стандартах: модель терапевтического сообщества, «Миннесотская модель», программа «12 шагов», когнитивно-поведенческая терапия. Каждый пациент получает индивидуальный план лечения.',
      'В стационаре пациент находится в безопасной среде без доступа к веществам. Распорядок дня включает терапевтические группы, индивидуальные сессии, спортивные занятия, творческую терапию и программу ресоциализации.',
      'По данным исследований, прохождение полного курса реабилитации повышает шансы на стойкую ремиссию до 70–85%. Клиники UNITY предлагают условия от эконом до премиум-класса, а также рассрочку оплаты.',
    ],
    benefits: [
      'Комплексная программа от 28 дней с индивидуальным планом',
      'Безопасная среда без доступа к веществам',
      'Команда специалистов: нарколог, психолог, терапевт, инструктор',
      'Программа ресоциализации и трудоустройства',
      'Рассрочка оплаты и различные ценовые категории',
    ],
  },
  'lechenie-igromanii': {
    paragraphs: [
      'Игромания (лудомания) — это поведенческая зависимость, признанная ВОЗ как расстройство, требующее профессионального лечения. Игровая зависимость разрушает финансовое положение, семейные отношения и психическое здоровье не менее серьёзно, чем химические зависимости.',
      'Лечение включает комбинацию психотерапии и медикаментозной поддержки. Когнитивно-поведенческая терапия помогает пациенту распознать иррациональные убеждения (например, «следующая ставка будет выигрышной»), а медикаменты корректируют дисбаланс нейромедиаторов.',
      'Современные программы также работают с цифровой зависимостью — компьютерными играми и социальными сетями. Специалисты помогают сформировать здоровый цифровой баланс и найти альтернативные источники дофамина: спорт, творчество, социальное взаимодействие.',
      'Важная часть лечения — работа с финансовыми последствиями: составление плана погашения долгов, обучение финансовой грамотности и, при необходимости, юридическая консультация.',
    ],
    benefits: [
      'Специализированные протоколы для игровой зависимости',
      'Комбинация КПТ и медикаментозной поддержки',
      'Работа с финансовыми последствиями и долгами',
      'Программа работы с цифровой зависимостью',
      'Семейная терапия и профилактика рецидивов',
    ],
  },
};

/* ── Helper ── */
function formatPrice(n: number) {
  return n.toLocaleString('ru-RU');
}

/* ═══════════════ STATIC PARAMS ═══════════════ */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/* ═══════════════ METADATA ═══════════════ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Услуга не найдена' };

  return {
    title: `${service.name} — цена от ${formatPrice(service.priceFrom)} ₽`,
    description: `${service.shortDesc} Проверенные клиники, анонимно, круглосуточно. Запись на UNITY.`,
    openGraph: {
      title: `${service.name} — UNITY`,
      description: service.shortDesc,
    },
  };
}

/* ═══════════════ PAGE COMPONENT ═══════════════ */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>Услуга не найдена</h1>
          <Link href="/uslugi" style={styles.backLink}>← Все услуги</Link>
        </div>
      </div>
    );
  }

  const content = serviceContent[service.slug] || serviceContent['vivod-iz-zapoya'];
  const clinicsWithService = clinics.filter((c) => c.services.includes(service.id));

  return (
    <div style={styles.wrapper}>
      {/* ── Breadcrumbs ── */}
      <nav style={styles.breadcrumbs} aria-label="Навигация">
        <Link href="/" style={styles.breadcrumbLink}>Главная</Link>
        <span style={styles.breadcrumbSep}>→</span>
        <Link href="/uslugi" style={styles.breadcrumbLink}>Услуги</Link>
        <span style={styles.breadcrumbSep}>→</span>
        <span style={styles.breadcrumbCurrent}>{service.name}</span>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section style={styles.heroSection}>
        <div style={styles.heroGlow} />
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <span style={styles.heroIcon}>{service.icon}</span>
            <h1 style={styles.heroTitle}>{service.name}</h1>
            <p style={styles.heroSubtitle}>{service.shortDesc}</p>
            <div style={styles.heroBadges}>
              <span style={styles.badge}>Анонимно</span>
              <span style={styles.badge}>Круглосуточно</span>
              <span style={styles.badge}>Лицензировано</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ DESCRIPTION ═══════════ */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Подробнее об услуге</h2>
          <div style={styles.contentGrid}>
            <div style={styles.textColumn}>
              {content.paragraphs.map((p, i) => (
                <p key={i} style={styles.paragraph}>{p}</p>
              ))}
            </div>

            {/* ── Price Card ── */}
            <aside style={styles.priceCard}>
              <div style={styles.priceCardGlow} />
              <div style={styles.priceLabel}>Стоимость</div>
              <div style={styles.priceValue}>
                {service.priceFrom === 0 ? (
                  <span style={styles.priceFree}>Бесплатно</span>
                ) : (
                  <>
                    от <span style={styles.priceAmount}>{formatPrice(service.priceFrom)}</span> ₽
                  </>
                )}
              </div>
              <div style={styles.priceDivider} />
              <ul style={styles.priceFeatures}>
                <li style={styles.priceFeature}>✓ Консультация нарколога</li>
                <li style={styles.priceFeature}>✓ Полная анонимность</li>
                <li style={styles.priceFeature}>✓ Проверенные клиники</li>
              </ul>
              <a href="tel:+79289710993" style={styles.priceBtn}>
                📞 Позвонить сейчас
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════ BENEFITS ═══════════ */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Преимущества</h2>
          <div style={styles.benefitsGrid}>
            {content.benefits.map((benefit, i) => (
              <div key={i} style={styles.benefitCard}>
                <div style={styles.benefitNumber}>{String(i + 1).padStart(2, '0')}</div>
                <p style={styles.benefitText}>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CLINICS ═══════════ */}
      {clinicsWithService.length > 0 && (
        <section style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Клиники, предоставляющие услугу</h2>
            <div style={styles.clinicsGrid}>
              {clinicsWithService.map((clinic) => {
                const city = cities.find((c) => c.id === clinic.cityId);
                const price = clinic.prices[service.id as keyof typeof clinic.prices];
                return (
                  <div key={clinic.id} style={styles.clinicCard}>
                    <div style={styles.clinicCardTop}>
                      {clinic.verified && (
                        <span style={styles.verifiedBadge}>✓ Проверена</span>
                      )}
                      <span style={styles.clinicRating}>⭐ {clinic.rating}</span>
                    </div>
                    <h3 style={styles.clinicName}>{clinic.name}</h3>
                    <p style={styles.clinicCity}>
                      📍 {city?.name || ''}, {clinic.address}
                    </p>
                    <p style={styles.clinicDesc}>{clinic.description}</p>
                    {price && (
                      <div style={styles.clinicPrice}>
                        от {formatPrice(price.from)} до {formatPrice(price.to)} ₽
                      </div>
                    )}
                    <div style={styles.clinicFeatures}>
                      {clinic.features.slice(0, 3).map((f) => (
                        <span key={f} style={styles.featureTag}>{f}</span>
                      ))}
                    </div>
                    <div style={styles.clinicActions}>
                      <a href={`tel:${clinic.phone}`} style={styles.clinicCallBtn}>
                        📞 Позвонить
                      </a>
                    </div>
                  </div>
                );
              })}
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
              Нужна помощь? Мы рядом
            </h2>
            <p style={styles.ctaSubtitle}>
              Звонок бесплатный и анонимный. Мы перезвоним в течение 5 минут.
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
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
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
  heroIcon: {
    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
    filter: 'drop-shadow(0 0 30px rgba(16,185,129,0.4))',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
    color: '#fff',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.15,
  },
  heroSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
    color: 'rgba(255,255,255,0.75)',
    textShadow: 'var(--ts-dark)',
    maxWidth: '640px',
    lineHeight: 1.7,
  },
  heroBadges: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '8px',
  },
  badge: {
    background: 'rgba(16,185,129,0.15)',
    border: '1px solid rgba(16,185,129,0.3)',
    borderRadius: '100px',
    padding: '6px 18px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
    letterSpacing: '0.04em',
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

  /* ── Content Grid ── */
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '48px',
    alignItems: 'start',
  },
  textColumn: {
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

  /* ── Price Card ── */
  priceCard: {
    position: 'sticky',
    top: '120px',
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid rgba(16,185,129,0.3)',
    borderRadius: '20px',
    padding: '32px',
    textAlign: 'center' as const,
    overflow: 'hidden',
  },
  priceCardGlow: {
    position: 'absolute',
    top: '-50%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  priceLabel: {
    position: 'relative',
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    textShadow: 'var(--ts-dark)',
    marginBottom: '8px',
  },
  priceValue: {
    position: 'relative',
    fontFamily: 'var(--font-display)',
    fontSize: '1.6rem',
    color: '#fff',
    textShadow: 'var(--ts-dark)',
    marginBottom: '20px',
  },
  priceAmount: {
    color: '#10B981',
    fontSize: '2.2rem',
    fontWeight: 700,
  },
  priceFree: {
    color: '#10B981',
    fontSize: '2rem',
    fontWeight: 700,
  },
  priceDivider: {
    width: '60px',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #10B981, transparent)',
    margin: '0 auto 20px',
  },
  priceFeatures: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  priceFeature: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.7)',
    textShadow: 'var(--ts-dark)',
    textAlign: 'left' as const,
  },
  priceBtn: {
    position: 'relative',
    display: 'block',
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#fff',
    borderRadius: '14px',
    textAlign: 'center' as const,
    fontWeight: 700,
    fontSize: '1rem',
    textDecoration: 'none',
    textShadow: 'var(--ts-dark)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
  },

  /* ── Benefits ── */
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  benefitCard: {
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '16px',
    padding: '28px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    transition: 'border-color 0.3s ease, transform 0.3s ease',
  },
  benefitNumber: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    color: 'rgba(16,185,129,0.3)',
    lineHeight: 1,
    flexShrink: 0,
    textShadow: 'var(--ts-dark)',
  },
  benefitText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.85)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.6,
  },

  /* ── Clinics ── */
  clinicsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '24px',
  },
  clinicCard: {
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '20px',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'border-color 0.3s ease',
  },
  clinicCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  clinicRating: {
    fontSize: '0.9rem',
    color: '#F59E0B',
    fontWeight: 600,
    textShadow: 'var(--ts-dark)',
  },
  clinicName: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.4rem',
    color: '#fff',
    textShadow: 'var(--ts-dark)',
  },
  clinicCity: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
  },
  clinicDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.7)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.6,
  },
  clinicPrice: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    fontWeight: 700,
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
    padding: '8px 0',
  },
  clinicFeatures: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  featureTag: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '4px 12px',
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
  },
  clinicActions: {
    marginTop: '8px',
    display: 'flex',
    gap: '12px',
  },
  clinicCallBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#fff',
    padding: '10px 24px',
    borderRadius: '12px',
    fontWeight: 700,
    fontSize: '0.9rem',
    textDecoration: 'none',
    textShadow: 'var(--ts-dark)',
    boxShadow: '0 4px 16px rgba(16,185,129,0.25)',
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
