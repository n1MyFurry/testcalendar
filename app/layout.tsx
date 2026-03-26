import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'English Mentor C1',
  description: '120-day English mentor plan with daily lessons and calendar-style navigation.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

