import '@/styles/globals.css';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export const metadata = {
    title: 'MovieShop',
    description: 'Buy and manage movies online',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col bg-gold-matt text-slate-900">
                <Navbar />
                <main className="flex-1 container mx-auto px-4 py-6">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
