import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AL HURRA | كريم الأركان وفيتامين E',
  description:
    'كريم AL HURRA المضاد لعلامات التقدم في السن، بتركيبة الأركان وفيتامين E.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} antialiased`}>{children}</body>
    </html>
  );
}
