
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from 'react';
import Link from 'next/link';
import AuraExpert from '@/components/AuraExpert';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DRAS-260 | Standalone Regulatory System",
  description: "Цифровая Система Регуляторного Учета (Приказ №260)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-[#050b1a] text-slate-100 antialiased`}>
        <div className="min-h-screen selection:bg-cyan-500/30">
          {/* Background Glows */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Navigation Bar */}
            <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center px-8 justify-between sticky top-0">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <span className="text-white font-bold text-xs">D</span>
                </div>
                <h1 className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  DRAS-260 <span className="text-xs font-normal text-slate-500 ml-1 uppercase tracking-widest">Standalone</span>
                </h1>
              </Link>
              
              <nav className="flex items-center gap-6">
                <Link href="/navigator" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Навигатор</Link>
                <Link href="/navigator" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Формы</Link>
                <Link href="/" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">Дашборд</Link>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">Authorized Portal</span>
                </div>
              </nav>
            </header>

            <main className="flex-1 p-8">
              {children}
            </main>
            <AuraExpert />
          </div>
        </div>
      </body>
    </html>
  );
}
