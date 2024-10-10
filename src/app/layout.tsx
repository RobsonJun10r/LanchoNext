// src/app/layout.tsx

import Menu from '@/components/menu';
import './globals.css';

export const metadata = {
  title: 'Lanchonext',
  description: 'Facilitando a vida na sua lanchonete',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
      </head>
      <body style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Menu/>
        {children}
      </body>
    </html>
  );
}
