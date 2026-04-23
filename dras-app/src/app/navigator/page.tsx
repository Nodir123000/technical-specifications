
'use client';

import React, { useState, useMemo } from 'react';
import { Search, FileText, ChevronRight, BookOpen, ExternalLink, Filter, HardDrive as DbIcon } from 'lucide-react';
import Link from 'next/link';
import regIndex from '@/data/regulatory_index.json';

export default function RegulatoryNavigator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const filteredForms = useMemo(() => {
    let forms: any[] = [];
    regIndex.appendices.forEach(app => {
      if (selectedApp && app.id !== selectedApp) return;
      app.forms.forEach(form => {
        if (form.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            form.id.toLowerCase().includes(searchQuery.toLowerCase())) {
          forms.push({ ...form, appendix: app.name });
        }
      });
    });
    return forms;
  }, [searchQuery, selectedApp]);

  return (
    <div className="flex gap-8 h-[calc(100vh-160px)]">
      {/* Sidebar Filters */}
      <aside className="w-72 flex flex-col gap-6">
        <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex items-center px-3 focus-within:border-cyan-500/50 transition-colors">
          <Search size={18} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Поиск по формам..."
            className="bg-transparent border-0 outline-none p-3 text-sm w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-4 flex items-center gap-2">
            <Filter size={12} /> Разделы
          </h3>
          <button 
            onClick={() => setSelectedApp(null)}
            className={`w-full text-left p-3 rounded-xl text-sm transition-all flex items-center justify-between group ${!selectedApp ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-white/5'}`}
          >
            Все разделы
            <ChevronRight size={14} className={!selectedApp ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
          </button>
          {regIndex.appendices.map(app => (
            <button 
              key={app.id}
              onClick={() => setSelectedApp(app.id)}
              className={`w-full text-left p-3 rounded-xl text-sm transition-all flex items-center justify-between group ${selectedApp === app.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-white/5'}`}
            >
              {app.name}
              <ChevronRight size={14} className={selectedApp === app.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
            </button>
          ))}
        </div>
      </aside>

      {/* Results Content */}
      <main className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Навигатор Форм</h2>
            <p className="text-slate-500 text-sm mt-1">
              Найдено {filteredForms.length} соответствий в реестре
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-slate-400">
            <BookOpen size={14} /> База: П260 (v1.0)
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredForms.map((form, idx) => (
            <Link 
              key={idx} 
              href={`/forms/${form.id.split('_')[0] === 'Форма' ? selectedApp || 'Приложение_1' : selectedApp}/${form.id}`}
            >
              <div 
                className="p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-cyan-500/30 transition-all group cursor-pointer relative overflow-hidden h-full"
              >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all">
                <FileText size={80} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                    {form.appendix}
                  </span>
                  <ExternalLink size={14} className="text-slate-600 group-hover:text-cyan-400" />
                </div>
                <h4 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {form.name}
                </h4>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <DbIcon size={12} /> {Math.round(form.size / 1024)} KB
                  </span>
                  <span className="flex items-center gap-1 uppercase tracking-tighter">
                    Ready for Digitization
                  </span>
                </div>
                </div>
              </div>
            </Link>
          ))}

          {filteredForms.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 space-y-4 border border-dashed border-white/10 rounded-3xl">
              <Search size={48} className="opacity-20" />
              <p className="text-lg font-medium">Ничего не найдено</p>
              <p className="text-sm">Попробуйте изменить параметры поиска или выбрать другой раздел.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
