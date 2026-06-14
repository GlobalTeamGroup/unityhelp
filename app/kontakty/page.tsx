'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import platformData from '@/data/platform.json';

/* ═══════════════════════════════════════════════════════
   UNITY — Контакты
   Premium contact page: info cards, form, FAQ accordion
   ═══════════════════════════════════════════════════════ */

const { services } = platformData;

/* ── Contact Data ── */
const contactCards = [
  { icon: '📞', label: 'Телефон', value: '+7 928 971-09-93', href: 'tel:+79289710993' },
  { icon: '✉️', label: 'Электронная почта', value: 'info@unityhelp.ru', href: 'mailto:info@unityhelp.ru' },
  { icon: '🕐', label: 'Режим работы', value: 'Круглосуточно, 24/7', href: null },
  { icon: '📍', label: 'Адрес', value: 'КМВ, Ставропольский край', href: null },
];

/* ── FAQ Data ── */
const faqItems = [
  {
    q: 'Как UNITY проверяет клиники перед размещением?',
    a: 'Мы проводим многоуровневую верификацию: проверяем лицензии через реестр Росздравнадзора, выезжаем на объект, собираем реальные отзывы пациентов и оцениваем квалификацию персонала. Только клиники, прошедшие все этапы проверки, попадают на платформу.',
  },
  {
    q: 'Сколько стоят услуги платформы для пациентов?',
    a: 'Использование платформы UNITY полностью бесплатно для пациентов и их родственников. Мы помогаем подобрать клинику, сравнить цены и условия без каких-либо дополнительных наценок. Вы платите только за лечение — напрямую клинике.',
  },
  {
    q: 'Гарантируете ли вы анонимность обращения?',
    a: 'Абсолютно. Все обращения конфиденциальны и защищены в соответствии с ФЗ-152 «О персональных данных». Мы не передаём ваши данные третьим лицам без вашего согласия. На учёт вас никто не поставит.',
  },
  {
    q: 'Как быстро мне перезвонят после заявки?',
    a: 'Наши специалисты перезванивают в течение 5–10 минут после получения заявки. В ночное время ответ может занять до 15 минут. В экстренных случаях рекомендуем звонить по телефону напрямую.',
  },
  {
    q: 'Можно ли вызвать нарколога на дом?',
    a: 'Да, через нашу платформу вы можете найти клиники, предоставляющие выезд врача-нарколога на дом. Услуга доступна круглосуточно, включая праздничные дни, в городах КМВ и Ставрополе.',
  },
  {
    q: 'Какие города покрывает платформа UNITY?',
    a: 'На данный момент мы работаем в городах Кавказских Минеральных Вод — Пятигорск, Кисловодск, Ессентуки, Железноводск, Минеральные Воды — а также в Ставрополе. В ближайшем будущем планируется расширение на другие регионы.',
  },
];

/* ── FAQ Accordion Component ── */
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div style={styles.faqList}>
      {faqItems.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} style={{
            ...styles.faqItem,
            borderColor: isOpen ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)',
          }}>
            <button
              onClick={() => toggle(i)}
              style={styles.faqQuestion}
              aria-expanded={isOpen}
            >
              <span style={styles.faqQuestionText}>{item.q}</span>
              <span style={{
                ...styles.faqChevron,
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}>
                ▾
              </span>
            </button>
            <div style={{
              ...styles.faqAnswer,
              maxHeight: isOpen ? '400px' : '0px',
              opacity: isOpen ? 1 : 0,
              paddingTop: isOpen ? '16px' : '0px',
              paddingBottom: isOpen ? '20px' : '0px',
            }}>
              <p style={styles.faqAnswerText}>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function KontaktyPage() {
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div style={styles.wrapper}>

      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section style={styles.heroSection}>
        <div style={styles.heroGlow1} />
        <div style={styles.heroGlow2} />
        <div style={styles.sectionInner}>
          <span style={styles.eyebrow}>ПОДДЕРЖКА • 24/7 • АНОНИМНО</span>
          <h1 style={styles.heroTitle}>
            Свяжитесь с <span className="gradient-text">нами</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Мы готовы помочь вам в любое время суток. Звоните, пишите или оставьте заявку — мы перезвоним в&nbsp;течение 5&nbsp;минут.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT INFO CARDS
          ═══════════════════════════════════════ */}
      <section style={styles.cardsSection}>
        <div style={styles.sectionInner}>
          <div style={styles.cardsGrid} className="kontakty-cards-grid">
            {contactCards.map((card, i) => {
              const inner = (
                <div key={i} style={styles.contactCard}>
                  <div style={styles.contactCardIcon}>{card.icon}</div>
                  <div>
                    <p style={styles.contactCardLabel}>{card.label}</p>
                    <p style={styles.contactCardValue}>{card.value}</p>
                  </div>
                  {card.href && (
                    <span style={styles.contactCardArrow}>→</span>
                  )}
                </div>
              );
              if (card.href) {
                return (
                  <a key={i} href={card.href} style={{ textDecoration: 'none' }}>
                    {inner}
                  </a>
                );
              }
              return <div key={i}>{inner}</div>;
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT FORM
          ═══════════════════════════════════════ */}
      <section style={styles.formSection}>
        <div style={styles.sectionInner}>
          <div style={styles.formGrid} className="kontakty-form-grid">
            {/* Left — Form */}
            <div style={styles.formCard}>
              <div style={styles.formCardGlow} />
              <h2 style={styles.formTitle}>Оставить заявку</h2>
              <p style={styles.formSubtitle}>
                Заполните форму, и наш специалист свяжется с вами для бесплатной консультации.
              </p>

              {submitted ? (
                <div style={styles.successMessage}>
                  <span style={styles.successIcon}>✓</span>
                  <p style={styles.successTitle}>Заявка отправлена!</p>
                  <p style={styles.successText}>
                    Мы перезвоним вам в течение 5 минут. Полная анонимность гарантирована.
                  </p>
                </div>
              ) : (
                <form style={styles.form} onSubmit={handleSubmit}>
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      required
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.inputRow} className="kontakty-input-row">
                    <div style={{ ...styles.inputGroup, flex: 1 }}>
                      <label style={styles.inputLabel}>Телефон</label>
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        required
                        style={styles.input}
                      />
                    </div>
                    <div style={{ ...styles.inputGroup, flex: 1 }}>
                      <label style={styles.inputLabel}>Email</label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        style={styles.input}
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Интересующая услуга</label>
                    <select style={styles.select} defaultValue="">
                      <option value="" disabled>Выберите услугу</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Сообщение</label>
                    <textarea
                      placeholder="Опишите вашу ситуацию (необязательно)"
                      rows={4}
                      style={styles.textarea}
                    />
                  </div>

                  <label style={styles.consentLabel}>
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      style={styles.consentCheckbox}
                    />
                    <span>
                      Я даю согласие на обработку персональных данных в соответствии с{' '}
                      <span style={{ color: '#10B981', textDecoration: 'underline' }}>
                        ФЗ‑152 «О персональных данных»
                      </span>
                    </span>
                  </label>

                  <button type="submit" style={styles.submitBtn}>
                    📩 Отправить заявку
                  </button>
                </form>
              )}
            </div>

            {/* Right — Aside */}
            <div style={styles.formAside}>
              {/* Emergency CTA Card */}
              <div style={styles.emergencyCard}>
                <div style={styles.emergencyCardGlow} />
                <span style={styles.emergencyIcon}>🆘</span>
                <h3 style={styles.emergencyTitle}>Срочная помощь?</h3>
                <p style={styles.emergencyText}>
                  Если ситуация критическая — позвоните нам прямо сейчас. Нарколог приедет в течение часа.
                </p>
                <a href="tel:+79289710993" style={styles.emergencyBtn}>
                  📞 Позвонить сейчас
                </a>
              </div>

              {/* Trust list */}
              <div style={styles.trustCard}>
                <h3 style={styles.trustCardTitle}>Почему нам доверяют</h3>
                {[
                  { icon: '🛡️', text: '100% анонимность' },
                  { icon: '🏥', text: 'Лицензированные клиники' },
                  { icon: '💬', text: 'Бесплатная консультация' },
                  { icon: '⚡', text: 'Ответ за 5 минут' },
                  { icon: '🤝', text: 'Без постановки на учёт' },
                ].map((item, i) => (
                  <div key={i} style={styles.trustItem}>
                    <span style={styles.trustItemIcon}>{item.icon}</span>
                    <span style={styles.trustItemText}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ SECTION
          ═══════════════════════════════════════ */}
      <section style={styles.faqSection}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>
            Часто задаваемые <span className="gradient-text">вопросы</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Ответы на самые популярные вопросы о работе платформы UNITY
          </p>
          <FAQAccordion />

          <div style={styles.faqCta}>
            <p style={styles.faqCtaText}>Не нашли ответ на свой вопрос?</p>
            <a href="tel:+79289710993" style={styles.faqCtaBtn}>
              📞 Позвоните нам — ответим на любой вопрос
            </a>
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
            Первый шаг — самый <span className="gradient-text">важный</span>
          </h2>
          <p style={styles.bottomCtaSubtitle}>
            Позвоните или оставьте заявку — мы поможем выбрать лучший вариант лечения
          </p>
          <div style={styles.bottomCtaButtons}>
            <a href="tel:+79289710993" style={styles.ctaPrimaryBtn}>
              📞 +7 928 971-09-93
            </a>
            <Link href="/" style={styles.ctaSecondaryBtn}>
              ← Вернуться на главную
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
    left: '50%',
    transform: 'translateX(-50%)',
    width: '70vw',
    height: '70vw',
    maxWidth: '800px',
    maxHeight: '800px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  heroGlow2: {
    position: 'absolute',
    bottom: '-30%',
    right: '-10%',
    width: '50vw',
    height: '50vw',
    maxWidth: '600px',
    maxHeight: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 60%)',
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

  /* ══════════════ CONTACT CARDS ══════════════ */
  cardsSection: {
    position: 'relative',
    padding: 'clamp(40px, 6vh, 80px) 24px',
    background: 'rgba(6,4,10,0.7)',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  contactCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '14px',
    padding: 'clamp(24px, 3vw, 36px) 20px',
    background: 'rgba(0,0,0,0.45)',
    border: '1.5px solid rgba(16,185,129,0.2)',
    borderRadius: '18px',
    backdropFilter: 'blur(12px)',
    transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
    cursor: 'default',
  },
  contactCardIcon: {
    fontSize: '2.4rem',
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(16,185,129,0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(16,185,129,0.2)',
  },
  contactCardLabel: {
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#10B981',
    textShadow: 'var(--ts-dark)',
    marginBottom: '4px',
  },
  contactCardValue: {
    fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
    fontWeight: 500,
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.4,
  },
  contactCardArrow: {
    position: 'absolute',
    top: '14px',
    right: '16px',
    fontSize: '1rem',
    color: 'rgba(16,185,129,0.6)',
  },

  /* ══════════════ FORM SECTION ══════════════ */
  formSection: {
    position: 'relative',
    padding: 'clamp(60px, 10vh, 120px) 24px',
    background: 'linear-gradient(180deg, rgba(6,4,10,0.7) 0%, rgba(10,22,40,0.5) 50%, rgba(6,4,10,0.7) 100%)',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 0.6fr',
    gap: '40px',
    alignItems: 'start',
  },
  formCard: {
    position: 'relative',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.35) 100%)',
    border: '1.5px solid rgba(16,185,129,0.25)',
    borderRadius: '24px',
    padding: 'clamp(32px, 4vw, 48px)',
    overflow: 'hidden',
  },
  formCardGlow: {
    position: 'absolute',
    top: '-50%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120%',
    height: '120%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  formTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
    fontWeight: 400,
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '10px',
    position: 'relative',
    zIndex: 1,
  },
  formSubtitle: {
    fontSize: 'clamp(0.88rem, 1.1vw, 1rem)',
    color: 'rgba(255,255,255,0.65)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.7,
    marginBottom: '28px',
    position: 'relative',
    zIndex: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    position: 'relative',
    zIndex: 1,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  inputRow: {
    display: 'flex',
    gap: '16px',
  },
  inputLabel: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  input: {
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#FFF',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    width: '100%',
    outline: 'none',
  },
  select: {
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#FFF',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    width: '100%',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
  },
  textarea: {
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#FFF',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    width: '100%',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
  },
  consentLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.5,
    cursor: 'pointer',
    textShadow: 'var(--ts-dark)',
  },
  consentCheckbox: {
    marginTop: '3px',
    width: '18px',
    height: '18px',
    flexShrink: 0,
    accentColor: '#10B981',
    cursor: 'pointer',
  },
  submitBtn: {
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#FFF',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 24px rgba(16,185,129,0.3)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textShadow: 'var(--ts-dark)',
    marginTop: '8px',
  },

  /* ── Success Message ── */
  successMessage: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  successIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#FFF',
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: '16px',
    boxShadow: '0 0 40px rgba(16,185,129,0.4)',
  },
  successTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '8px',
  },
  successText: {
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.65)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.6,
  },

  /* ── Aside — Emergency Card ── */
  formAside: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  emergencyCard: {
    position: 'relative',
    background: 'linear-gradient(180deg, rgba(220,38,38,0.12) 0%, rgba(0,0,0,0.45) 100%)',
    border: '1.5px solid rgba(220,38,38,0.3)',
    borderRadius: '20px',
    padding: 'clamp(24px, 3vw, 32px)',
    textAlign: 'center',
    overflow: 'hidden',
  },
  emergencyCardGlow: {
    position: 'absolute',
    top: '-40%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '150%',
    height: '150%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  emergencyIcon: {
    fontSize: '2.5rem',
    marginBottom: '12px',
    display: 'block',
  },
  emergencyTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '8px',
    position: 'relative',
    zIndex: 1,
  },
  emergencyText: {
    fontSize: '0.88rem',
    color: 'rgba(255,255,255,0.65)',
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.6,
    marginBottom: '20px',
    position: 'relative',
    zIndex: 1,
  },
  emergencyBtn: {
    display: 'inline-block',
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #DC2626, #991B1B)',
    color: '#FFF',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 4px 20px rgba(220,38,38,0.35)',
    transition: 'transform 0.2s',
    textShadow: 'var(--ts-dark)',
    position: 'relative',
    zIndex: 1,
  },

  /* ── Trust Card ── */
  trustCard: {
    background: 'rgba(0,0,0,0.45)',
    border: '1.5px solid rgba(16,185,129,0.2)',
    borderRadius: '20px',
    padding: 'clamp(24px, 3vw, 32px)',
  },
  trustCardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.15rem',
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    marginBottom: '20px',
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  trustItemIcon: {
    fontSize: '1.2rem',
    width: '32px',
    textAlign: 'center',
    flexShrink: 0,
  },
  trustItemText: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.8)',
    textShadow: 'var(--ts-dark)',
  },

  /* ══════════════ FAQ SECTION ══════════════ */
  faqSection: {
    position: 'relative',
    padding: 'clamp(80px, 12vh, 140px) 24px',
    background: 'rgba(6,4,10,0.7)',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
    fontWeight: 400,
    color: '#FFF',
    textShadow: 'var(--ts-dark)',
    textAlign: 'center',
    marginBottom: '12px',
  },
  sectionSubtitle: {
    fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
    color: 'rgba(255,255,255,0.6)',
    textShadow: 'var(--ts-dark)',
    textAlign: 'center',
    lineHeight: 1.7,
    maxWidth: '600px',
    margin: '0 auto 48px',
  },
  faqList: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  faqItem: {
    background: 'rgba(0,0,0,0.4)',
    border: '1.5px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    overflow: 'hidden',
    transition: 'border-color 0.3s',
  },
  faqQuestion: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '18px 22px',
    background: 'none',
    border: 'none',
    color: '#FFF',
    cursor: 'pointer',
    textAlign: 'left',
    gap: '16px',
  },
  faqQuestionText: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
    fontWeight: 500,
    textShadow: 'var(--ts-dark)',
    lineHeight: 1.5,
  },
  faqChevron: {
    fontSize: '1.2rem',
    color: '#10B981',
    flexShrink: 0,
    transition: 'transform 0.3s ease',
  },
  faqAnswer: {
    overflow: 'hidden',
    transition: 'max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease',
    paddingLeft: '22px',
    paddingRight: '22px',
  },
  faqAnswerText: {
    fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.7)',
    textShadow: 'var(--ts-dark)',
  },

  /* ── FAQ CTA ── */
  faqCta: {
    textAlign: 'center',
    marginTop: '48px',
    padding: '32px',
    background: 'rgba(16,185,129,0.06)',
    border: '1px solid rgba(16,185,129,0.15)',
    borderRadius: '16px',
    maxWidth: '800px',
    margin: '48px auto 0',
  },
  faqCtaText: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.7)',
    textShadow: 'var(--ts-dark)',
    marginBottom: '16px',
  },
  faqCtaBtn: {
    display: 'inline-block',
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #10B981, #059669)',
    color: '#FFF',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: 600,
    textDecoration: 'none',
    boxShadow: '0 4px 24px rgba(16,185,129,0.3)',
    textShadow: 'var(--ts-dark)',
    transition: 'transform 0.2s',
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


/* ── Responsive styles injected via global CSS-in-JS ── */
if (typeof document !== 'undefined') {
  const id = 'kontakty-responsive';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @media (max-width: 1024px) {
        .kontakty-cards-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        .kontakty-form-grid {
          grid-template-columns: 1fr !important;
        }
      }
      @media (max-width: 600px) {
        .kontakty-cards-grid {
          grid-template-columns: 1fr !important;
        }
        .kontakty-input-row {
          flex-direction: column !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

