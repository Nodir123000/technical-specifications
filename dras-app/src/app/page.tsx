
import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  Activity, 
  Search, 
  ChevronRight,
  Database,
  Lock
} from 'lucide-react';

export default function DrasDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="relative p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:text-cyan-500/10 transition-colors duration-700">
          <Database size={240} strokeWidth={0.5} />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Lock size={12} /> Closed Network Authorized
          </div>
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Цифровая Система <br /> 
            <span className="text-cyan-400">Регуляторного Учета</span>
          </h2>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Интеллектуальная среда для работы с Приказом №260. Автоматизация учета вооружения, 
            техники и имущества на уровне Gold Master.
          </p>
          <div className="flex gap-4">
            <Link href="/navigator">
              <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/25 active:scale-95">
                Начать работу
              </button>
            </Link>
            <Link href="/navigator">
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all active:scale-95">
                Изучить ТЗ
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModuleCard 
          icon={<BookOpen className="text-cyan-400" />}
          title="Навигатор П260"
          description="Семантический поиск по 45,000 строкам документации."
          count="5 Приложений"
        />
        <ModuleCard 
          icon={<FileText className="text-purple-400" />}
          title="Реестр Форм"
          description="217 интерактивных форм для автоматизированного заполнения."
          count="217 Форм"
        />
        <ModuleCard 
          icon={<ShieldCheck className="text-emerald-400" />}
          title="Комплаенс-Аудит"
          description="Автоматическая проверка операций на соответствие нормам."
          count="4 Раздела"
        />
        <ModuleCard 
          icon={<Activity className="text-orange-400" />}
          title="Монитор Активов"
          description="Визуализация движения имущества в реальном времени."
          count="Active"
        />
      </div>

      {/* Bottom Section: Recent Activity & Aura AI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <Activity className="text-cyan-500" /> Активность Системы
          </h3>
          <div className="rounded-2xl border border-white/10 bg-white/2 overflow-hidden">
            <Link href="/forms/Приложение_1/Форма_6_часть_3">
              <div className="p-4 flex items-center justify-between border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <FileText size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium">Чековое требование (Форма 6)</div>
                    <div className="text-xs text-slate-500">Доступно для оцифровки • Приложение 1</div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            {/* More recent items could be added here */}
          </div>
        </div>

        <div className="rounded-3xl p-8 border border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Activity size={100} className="text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full" /> Aura AI Expert
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Задайте вопрос по правилам учета. Я изучила все разделы Приказа 260.
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white/5 text-xs text-slate-300 border border-white/5 hover:border-cyan-500/30 transition-colors cursor-pointer">
              "Как правильно оформить акт списания по форме 11?"
            </div>
            <div className="p-3 rounded-xl bg-white/5 text-xs text-slate-300 border border-white/5 hover:border-cyan-500/30 transition-colors cursor-pointer">
              "В чем различие учета в подразделении и на складе?"
            </div>
          </div>
          <button className="w-full mt-6 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-sm hover:bg-cyan-500 hover:text-black transition-all">
            Открыть Чат
          </button>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ icon, title, description, count }: any) {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/2 hover:bg-white/5 hover:border-white/20 transition-all group cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-500 font-mono uppercase tracking-tighter">
          {count}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
