import type { Metadata, Viewport } from 'next';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import DisclaimerBar from './components/DisclaimerBar';
import CinematicBackground from './components/CinematicBackground';
import './globals.css';

/* ─── Fonts (Next.js optimised) ───────────────────────────── */
const dmSerif = DM_Serif_Display({
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-body',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

/* ─── Viewport ────────────────────────────────────────────── */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#10B981',
};

/* ─── Metadata ────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: 'UNITY — Найдите проверенную наркологическую клинику рядом с вами',
    template: '%s | UNITY — помощь зависимым людям',
  },
  description:
    'Агрегатор наркологических клиник России. Проверенные лицензии, реальные отзывы, анонимная помощь. Вывод из запоя, кодирование, реабилитация — круглосуточно.',
  keywords: [
    'наркологическая клиника',
    'вывод из запоя',
    'кодирование',
    'реабилитация',
    'лечение зависимости',
    'нарколог',
    'анонимно',
    'помощь зависимым',
    'наркологический центр',
  ],
  authors: [{ name: 'UNITY', url: 'https://unityhelp.ru' }],
  creator: 'UNITY',
  publisher: 'UNITY',
  metadataBase: new URL('https://unityhelp.ru'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'UNITY — помощь зависимым людям',
    description:
      'Проверенные наркологические клиники по всей России. Анонимно, круглосуточно.',
    url: 'https://unityhelp.ru',
    siteName: 'UNITY',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UNITY — помощь зависимым людям',
    description:
      'Проверенные наркологические клиники по всей России. Анонимно, круглосуточно.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ─── Root Layout ─────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <head>
        {/* Schema.org — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'UNITY',
              url: 'https://unityhelp.ru',
              description:
                'Агрегатор наркологических клиник России. Проверенные лицензии, реальные отзывы, анонимная помощь.',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+7-800-123-45-67',
                contactType: 'customer service',
                areaServed: 'RU',
                availableLanguage: 'Russian',
              },
            }),
          }}
        />

        {/* Yandex.Metrika — placeholder: replace XXXXXXXX with your counter ID
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return;}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
              ym(XXXXXXXX,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/XXXXXXXX" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
        */}
      </head>

      <body>
        <CinematicBackground />
        <Header />

        <main>{children}</main>

        <Footer />
        <DisclaimerBar />
      </body>
    </html>
  );
}
