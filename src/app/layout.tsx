import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'MovieShop',
  description: 'Buy and manage movies online',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
