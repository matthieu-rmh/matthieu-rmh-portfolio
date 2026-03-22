import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Matthieu Heritiana — Developer Portfolio',
  description:
    'Software Developer crafting digital products at the intersection of engineering precision and quiet aesthetics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
