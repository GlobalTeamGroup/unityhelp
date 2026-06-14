import Link from 'next/link';

const serviceLinks = [
  { href: '/uslugi/vyvod-iz-zapoya', label: 'Вывод из запоя' },
  { href: '/uslugi/kodirovanie', label: 'Кодирование' },
  { href: '/uslugi/reabilitaciya', label: 'Реабилитация' },
  { href: '/uslugi/narkolog-na-dom', label: 'Нарколог на дом' },
  { href: '/uslugi/detoksikaciya', label: 'Детоксикация' },
];

const cityLinks = [
  { href: '/goroda/moskva', label: 'Москва' },
  { href: '/goroda/sankt-peterburg', label: 'Санкт-Петербург' },
  { href: '/goroda/novosibirsk', label: 'Новосибирск' },
  { href: '/goroda/ekaterinburg', label: 'Екатеринбург' },
  { href: '/goroda/kazan', label: 'Казань' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* ─── Column 1: Brand ─── */}
          <div className="footer-brand">
            <div className="footer-logo">UNITY</div>
            <p className="footer-desc">
              Агрегатор проверенных наркологических клиник России. Анонимная
              помощь круглосуточно. Все клиники проходят верификацию лицензий.
            </p>
            <div className="footer-socials">
              {/* Placeholder social links — replace with real icons/URLs */}
              <a href="#" className="footer-social-link" aria-label="Telegram" title="Telegram">
                TG
              </a>
              <a href="#" className="footer-social-link" aria-label="ВКонтакте" title="ВКонтакте">
                VK
              </a>
              <a href="#" className="footer-social-link" aria-label="WhatsApp" title="WhatsApp">
                WA
              </a>
            </div>
          </div>

          {/* ─── Column 2: Услуги ─── */}
          <div>
            <div className="footer-col-title">Услуги</div>
            <div className="footer-links">
              {serviceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ─── Column 3: Города ─── */}
          <div>
            <div className="footer-col-title">Города</div>
            <div className="footer-links">
              {cityLinks.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
              <Link href="/goroda" className="footer-link" style={{ color: 'var(--primary)' }}>
                Все города →
              </Link>
            </div>
          </div>

          {/* ─── Column 4: Контакты ─── */}
          <div>
            <div className="footer-col-title">Контакты</div>
            <div className="footer-links">
              <a href="tel:+78001234567" className="footer-link">
                📞 +7 800 123-45-67
              </a>
              <a href="mailto:info@unityhelp.ru" className="footer-link">
                ✉️ info@unityhelp.ru
              </a>
              <span className="footer-link" style={{ cursor: 'default' }}>
                🕐 Круглосуточно, 24/7
              </span>
              <Link href="/kontakty" className="footer-link" style={{ color: 'var(--primary)' }}>
                Написать нам →
              </Link>
            </div>
          </div>
        </div>

        {/* ─── Divider ─── */}
        <hr className="divider-gradient" />

        {/* ─── Bottom / Legal ─── */}
        <div className="footer-bottom">
          <div className="footer-legal">
            © {currentYear} UNITY — unityhelp.ru. Все права защищены.
            <br />
            ИНН: 0000000000 &nbsp;|&nbsp;{' '}
            <Link href="/politika-konfidencialnosti">Политика конфиденциальности</Link>
            &nbsp;|&nbsp;{' '}
            <Link href="/polzovatelskoe-soglashenie">Пользовательское соглашение</Link>
          </div>
          <div className="footer-disclaimer">
            Имеются противопоказания. Необходима консультация специалиста.
            Информация на сайте не является публичной офертой. Обработка
            персональных данных осуществляется в соответствии с ФЗ-152.
          </div>
        </div>
      </div>
    </footer>
  );
}
