
'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  Info,
  History,
  Tag,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalForm44() {
  const [items, setItems] = useState([
    { 
      id: 1, 
      date: '2026-04-15', 
      doc: 'Накладная №12', 
      source: 'База №50', 
      arrived: 200, 
      departed: 0, 
      balance: 200,
      type: 'arrived'
    }
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shadow-lg shadow-blue-500/10">
            <CreditCard className="text-blue-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ФОРМА 44: УЧЕТ НЕКАТЕГОРИЙНЫХ</h1>
            <p className="text-slate-400 text-sm font-medium">Карточка учета некатегорийных материальных средств</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-semibold text-sm">
            <Printer size={18} /> Печать
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-xl transition-all font-bold text-sm shadow-lg shadow-blue-500/20">
            <Save size={18} /> Сохранить
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Info Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-6">
             <div className="flex items-center gap-2 text-blue-400">
                <Tag size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider">Сведения об имуществе</h2>
             </div>
             <div className="space-y-4">
                <div className="space-y-1">
                   <label className="text-[10px] text-slate-500 uppercase font-bold">Наименование</label>
                   <input type="text" className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white text-sm font-bold" placeholder="Канцтовары / Мыло / Ткань..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-bold">Код ном.</label>
                      <input type="text" className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white text-xs font-mono" placeholder="44-000" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-bold">Ед. изм.</label>
                      <input type="text" className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white text-xs" placeholder="кг / шт / м" />
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-6">
             <div className="flex items-center gap-2 text-blue-400">
                <MapPin size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider">Складские данные</h2>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-[10px] text-slate-500 uppercase font-bold">Хранилище</label>
                   <input type="text" className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white text-sm" placeholder="№" />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] text-slate-500 uppercase font-bold">Стеллаж/Полка</label>
                   <input type="text" className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white text-sm" placeholder="№/№" />
                </div>
             </div>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-3xl backdrop-blur-xl space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-blue-400 uppercase">Текущий запас</h3>
                <TrendingUp size={16} className="text-blue-400" />
             </div>
             <div className="text-4xl font-black text-white">
                200 <span className="text-sm text-slate-500 font-medium tracking-normal">ед.</span>
             </div>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="lg:col-span-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col min-h-[600px] overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
               <div className="flex items-center gap-3">
                  <History size={18} className="text-blue-400" />
                  <h2 className="text-lg font-bold text-white">История движения</h2>
               </div>
               <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all">
                  <Plus size={14} /> Новая запись
               </button>
            </div>

            <div className="flex-1 overflow-auto">
               <table className="w-full text-sm border-collapse">
                  <thead>
                     <tr className="text-slate-500 border-b border-white/10">
                        <th className="p-4 font-bold text-left text-[10px] uppercase">Дата</th>
                        <th className="p-4 font-bold text-left text-[10px] uppercase">Документ</th>
                        <th className="p-4 font-bold text-right text-[10px] uppercase text-emerald-400">Прибыло</th>
                        <th className="p-4 font-bold text-right text-[10px] uppercase text-rose-400">Убыло</th>
                        <th className="p-4 font-bold text-right text-[10px] uppercase text-blue-400">Состоит</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {items.map(item => (
                        <tr key={item.id} className="group hover:bg-white/[0.01]">
                           <td className="p-4 font-mono text-xs text-slate-500">{item.date}</td>
                           <td className="p-4">
                              <div className="flex flex-col">
                                 <span className="text-sm font-medium text-white">{item.doc}</span>
                                 <span className="text-[10px] text-slate-600">{item.source}</span>
                              </div>
                           </td>
                           <td className="p-4 text-right text-emerald-400 font-bold">{item.arrived > 0 ? `+${item.arrived}` : '-'}</td>
                           <td className="p-4 text-right text-rose-400 font-bold">{item.departed > 0 ? `-${item.departed}` : '-'}</td>
                           <td className="p-4 text-right text-white font-black">{item.balance}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-500 font-mono">
               <span>КАРТОЧКА № _________</span>
               <div className="flex gap-4">
                  <span>ОТВЕТСТВЕННЫЙ: ________________</span>
                  <span>УЧЕТЧИК: ________________</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
