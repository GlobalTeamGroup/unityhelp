import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакты — UNITY',
  description:
    'Свяжитесь с платформой UNITY — помощь в подборе наркологической клиники. Телефон, email, форма обратной связи. Круглосуточно, анонимно.',
};

export default function KontaktyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
