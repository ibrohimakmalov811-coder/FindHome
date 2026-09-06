import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { PropertyProvider } from '@/context/PropertyContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "UyBozor - O'zbekistonda uylarni ijaraga olish va sotib olish",
  description: "Toshkent va butun O'zbekiston bo'ylab uylar, kvartiralar, hovlilar va tijorat maydonlarini ijaraga olish yoki sotib olish bo'yicha eng yirik ko'chmas mulk platformasi.",
  keywords: ["uy arenda", "kvartira arenda toshkent", "uy sotib olish", "novostroyka toshkent", "ko'chmas mulk", "ijara uylar"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50/70 dark:bg-slate-950 text-gray-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-200`}>
        <LanguageProvider>
          <AuthProvider>
            <PropertyProvider>
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </PropertyProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
