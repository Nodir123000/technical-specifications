
'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  Info,
  Layers,
  Settings,
  History,
  Tag,
  MapPin,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalForm43() {
  const [activeTab, setActiveTab] = useState('main');
  const [items, setItems] = useState([
    { 
      id: 1, 
      date: '2026-04-10', 
      doc: 'Накладная №88', 
      source: 'База №303', 
      category1: 50, 
      category2: 0, 
      category3: 0, 
      category4: 0, 
      category5: 0,
      total: 50,
      type: 'arrived'
    }
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <CreditCard className="text-cyan-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ФОРМА 43: УЧЕТ КАТЕГОРИЙ</h1>
            <p className="text-slate-400 text-sm font-medium">Карточка учета категорийных материальных средств</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-semibold text-sm text-slate-300">
            <Printer size={18} /> Печать
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl transition-all font-bold text-sm shadow-lg shadow-cyan-500/20">
            <Save size={18} /> Сохранить
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Info Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-6">
             <div className="flex items-center gap-2 text-cyan-400">
                <MapPin size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider">Место хранения</h2>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-[10px] text-slate-500 uppercase font-bold">Стеллаж</label>
                   <input type="text" className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/30" placeholder="№..." />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] text-slate-500 uppercase font-bold">Полка</label>
                   <input type="text" className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/30" placeholder="№..." />
                </div>
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-6">
             <div className="flex items-center gap-2 text-cyan-400">
                <Tag size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider">Параметры ресурса</h2>
             </div>
             <div className="space-y-4">
                <div className="space-y-1">
                   <label className="text-[10px] text-slate-500 uppercase font-bold">Наименование</label>
                   <input type="text" className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white text-sm font-bold" placeholder="Напр. АК-74" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-bold">Код ном.</label>
                      <input type="text" className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white text-xs font-mono" placeholder="000-000" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-bold">Цена</label>
                      <div className="relative">
                         <input type="number" className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white text-xs text-right pr-8" placeholder="0.00" />
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">сум</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 p-6 rounded-3xl backdrop-blur-xl">
             <div className="flex items-center gap-2 text-cyan-400 mb-4">
                <Coins size={16} />
                <h3 className="text-xs font-bold uppercase tracking-wider">Драгоценные металлы</h3>
             </div>
             <textarea className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/30 min-h-[80px]" placeholder="Содержание золота, серебра и т.д."></textarea>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col min-h-[600px] overflow-hidden">
            <div className="p-1 border-b border-white/10 flex bg-white/[0.02]">
               {['main', 'details', 'inspections'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                      activeTab === tab ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tab === 'main' ? 'Движение' : tab === 'details' ? 'Характеристики' : 'Осмотры'}
                    {activeTab === tab && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500" />
                    )}
                  </button>
               ))}
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-slate-500 border-b border-white/10">
                    <th rowSpan={2} className="p-4 font-bold text-left text-[9px] uppercase bg-[#0a0a0b] border-r border-white/5">Дата</th>
                    <th rowSpan={2} className="p-4 font-bold text-left text-[9px] uppercase bg-[#0a0a0b] border-r border-white/5">Документ</th>
                    <th colSpan={6} className="p-2 font-bold text-center text-[9px] uppercase bg-cyan-500/5 text-cyan-400 border-b border-cyan-500/20">Категории</th>
                    <th rowSpan={2} className="p-4 font-bold text-right text-[9px] uppercase bg-[#0a0a0b] border-l border-white/5">Всего</th>
                  </tr>
                  <tr className="text-slate-600 border-b border-white/10">
                    <th className="p-2 text-[9px] font-black text-center bg-white/[0.02] border-r border-white/5">I</th>
                    <th className="p-2 text-[9px] font-black text-center bg-white/[0.02] border-r border-white/5">II</th>
                    <th className="p-2 text-[9px] font-black text-center bg-white/[0.02] border-r border-white/5">III</th>
                    <th className="p-2 text-[9px] font-black text-center bg-white/[0.02] border-r border-white/5">IV</th>
                    <th className="p-2 text-[9px] font-black text-center bg-white/[0.02] border-r border-white/5">V</th>
                    <th className="p-2 text-[9px] font-black text-center bg-white/[0.02]">тип</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {items.map((entry) => (
                    <tr key={entry.id} className="group hover:bg-white/[0.01] transition-colors">
                      <td className="p-4 font-mono text-[10px] text-slate-500 border-r border-white/5">{entry.date}</td>
                      <td className="p-4 font-medium text-white border-r border-white/5 text-xs">
                         <div className="flex flex-col">
                            <span>{entry.doc}</span>
                            <span className="text-[10px] text-slate-600">{entry.source}</span>
                         </div>
                      </td>
                      <td className="p-2 text-center text-xs font-bold text-slate-300 border-r border-white/5">{entry.category1 || '-'}</td>
                      <td className="p-2 text-center text-xs font-bold text-slate-300 border-r border-white/5">{entry.category2 || '-'}</td>
                      <td className="p-2 text-center text-xs font-bold text-slate-300 border-r border-white/5">{entry.category3 || '-'}</td>
                      <td className="p-2 text-center text-xs font-bold text-slate-300 border-r border-white/5">{entry.category4 || '-'}</td>
                      <td className="p-2 text-center text-xs font-bold text-slate-300 border-r border-white/5">{entry.category5 || '-'}</td>
                      <td className="p-2 text-center">
                         <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                            entry.type === 'arrived' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                         }`}>
                            {entry.type === 'arrived' ? 'ПРИХОД' : 'РАСХОД'}
                         </span>
                      </td>
                      <td className="p-4 text-right text-white font-black border-l border-white/5">{entry.total}</td>
                    </tr>
                  ))}
                  
                  {/* Action Row */}
                  <tr className="bg-cyan-500/5">
                     <td colSpan={2} className="p-4">
                        <button className="flex items-center gap-2 text-cyan-400 text-[10px] font-bold uppercase hover:text-cyan-300 transition-all">
                           <Plus size={14} /> Добавить движение
                        </button>
                     </td>
                     <td colSpan={7} className="p-4 text-right">
                        <span className="text-[10px] text-slate-600 font-bold uppercase">Общий остаток:</span>
                        <span className="ml-4 text-white font-black text-lg">50</span>
                     </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-8 border-t border-white/10 bg-white/[0.01]">
               <div className="flex items-start gap-12">
                  <div className="flex-1 space-y-4">
                     <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase">
                        <Info size={14} />
                        Нормативный запас
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 border border-white/5 rounded-2xl p-4">
                           <span className="text-[9px] text-slate-600 block mb-1">МАКСИМАЛЬНЫЙ</span>
                           <span className="text-xl font-black text-white">100</span>
                        </div>
                        <div className="bg-black/20 border border-white/5 rounded-2xl p-4">
                           <span className="text-[9px] text-slate-600 block mb-1">МИНИМАЛЬНЫЙ</span>
                           <span className="text-xl font-black text-white">10</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="w-64 space-y-4">
                     <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase">
                        <Layers size={14} />
                        Подписи
                     </div>
                     <div className="space-y-4 pt-2">
                        <div className="border-b border-dashed border-white/20 h-8 flex items-end justify-between">
                           <span className="text-[9px] text-slate-600 italic">Нач. склада</span>
                           <div className="w-20 h-1 bg-white/5"></div>
                        </div>
                        <div className="border-b border-dashed border-white/20 h-8 flex items-end justify-between">
                           <span className="text-[9px] text-slate-600 italic">Учетчик</span>
                           <div className="w-20 h-1 bg-white/5"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
