import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Блог — UNITY',
  description:
    'Полезные статьи о лечении зависимостей: вывод из запоя, кодирование, реабилитация, советы психологов. Экспертный блог платформы UNITY.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
