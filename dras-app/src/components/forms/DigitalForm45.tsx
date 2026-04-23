
'use client';

import React, { useState } from 'react';
import { 
  UserCircle, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  Ruler,
  ShoppingBag,
  History,
  ShieldCheck,
  Calendar,
  PenTool,
  ScanFace
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalForm45() {
  const [personalData, setPersonalData] = useState({
    rank: 'Сержант',
    name: 'Ахмедов Сардор Бахтиёрович',
    unit: '3-й взвод 1-й роты',
    service: 'Вещевая служба',
    height: 182,
    chest: 104,
    shoeSize: 43
  });

  const [items, setItems] = useState([
    { id: 1, name: 'Куртка полевая демисезонная', code: 'V-102', wearTerm: '2 года', issued: '2025-10-01', status: 'issued' },
    { id: 2, name: 'Брюки полевые', code: 'V-103', wearTerm: '1 год', issued: '2026-03-15', status: 'issued' },
    { id: 3, name: 'Сапоги юфтевые', code: 'V-201', wearTerm: '1 год', issued: '2026-01-20', status: 'issued' }
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center border border-violet-500/30 shadow-lg shadow-violet-500/10">
            <UserCircle className="text-violet-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ФОРМА 45: ЛИЧНЫЙ УЧЕТ</h1>
            <p className="text-slate-400 text-sm font-medium">Карточка учета материальных средств личного пользования</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-semibold text-sm">
            <Printer size={18} /> Карточка
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-violet-500 hover:bg-violet-400 text-white rounded-xl transition-all font-bold text-sm shadow-lg shadow-violet-500/20">
            <Save size={18} /> Сохранить
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <ScanFace size={120} className="text-violet-500" />
             </div>
             
             <div className="space-y-4 relative z-10">
                <div className="flex flex-col items-center text-center">
                   <div className="w-24 h-24 rounded-full bg-violet-500/10 border-2 border-violet-500/20 flex items-center justify-center mb-4">
                      <UserCircle size={48} className="text-violet-400" />
                   </div>
                   <h2 className="text-lg font-bold text-white">{personalData.name}</h2>
                   <p className="text-violet-400 text-xs font-bold uppercase tracking-widest mt-1">{personalData.rank}</p>
                   <p className="text-slate-500 text-xs mt-2">{personalData.unit}</p>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                   <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase">
                      <Ruler size={14} /> Антропометрические данные
                   </div>
                   <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                         <span className="text-[10px] text-slate-500 block mb-1">РОСТ</span>
                         <span className="text-sm font-bold text-white">{personalData.height}</span>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                         <span className="text-[10px] text-slate-500 block mb-1">ГРУДЬ</span>
                         <span className="text-sm font-bold text-white">{personalData.chest}</span>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                         <span className="text-[10px] text-slate-500 block mb-1">ОБУВЬ</span>
                         <span className="text-sm font-bold text-white">{personalData.shoeSize}</span>
                      </div>
                   </div>
                </div>

                <div className="pt-4 space-y-3">
                   <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Норма снабжения</span>
                      <span className="text-white font-medium">№1 (Общевойск.)</span>
                   </div>
                   <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Зачислен приказом</span>
                      <span className="text-white font-medium">№45 от 12.01.2025</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 p-6 rounded-3xl backdrop-blur-xl">
             <div className="flex items-center gap-2 text-violet-400 mb-4">
                <ShieldCheck size={16} />
                <h3 className="text-xs font-bold uppercase tracking-wider">Статус обеспечения</h3>
             </div>
             <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                   <span className="text-slate-400">Укомплектованность</span>
                   <span className="text-emerald-400 font-bold text-sm">92%</span>
                </div>
                <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                   <div className="w-[92%] h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
                <p className="text-[10px] text-slate-500 italic">Необходимо выдать: Перчатки теплые (1 пара)</p>
             </div>
          </div>
        </div>

        {/* Content Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden flex flex-col min-h-[600px]">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
               <div className="flex items-center gap-3">
                  <ShoppingBag size={20} className="text-violet-400" />
                  <h2 className="text-lg font-bold text-white">Список имущества</h2>
               </div>
               <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl text-xs font-bold border border-white/10 transition-all">
                     <History size={14} /> История сдачи
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-violet-500/20 transition-all">
                     <Plus size={14} /> Выдать новое
                  </button>
               </div>
            </div>

            <div className="flex-1 overflow-auto">
               <table className="w-full text-sm border-collapse">
                  <thead>
                     <tr className="text-slate-500 border-b border-white/10">
                        <th className="p-4 font-bold text-left text-[10px] uppercase">Наименование</th>
                        <th className="p-4 font-bold text-center text-[10px] uppercase">Срок носки</th>
                        <th className="p-4 font-bold text-center text-[10px] uppercase">Дата выдачи</th>
                        <th className="p-4 font-bold text-center text-[10px] uppercase">Статус</th>
                        <th className="p-4 w-10"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {items.map(item => (
                        <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                           <td className="p-4">
                              <div className="flex flex-col">
                                 <span className="text-sm font-medium text-white">{item.name}</span>
                                 <span className="text-[10px] text-slate-600 font-mono">{item.code}</span>
                              </div>
                           </td>
                           <td className="p-4 text-center text-xs text-slate-400">{item.wearTerm}</td>
                           <td className="p-4 text-center font-mono text-xs text-white">{item.issued}</td>
                           <td className="p-4 text-center">
                              <span className="text-[9px] font-black px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                                 Используется
                              </span>
                           </td>
                           <td className="p-4 text-right">
                              <button className="text-slate-700 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all">
                                 <Trash2 size={14} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="p-8 border-t border-white/10 bg-white/[0.01] flex items-center justify-between">
               <div className="flex gap-12">
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase">
                        <PenTool size={14} /> Подпись военнослужащего
                     </div>
                     <div className="border-b border-white/10 w-48 h-8 flex items-end">
                        <span className="text-[9px] text-slate-700 italic">Электронная подпись</span>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase">
                        <Calendar size={14} /> Дата закрытия
                     </div>
                     <div className="border-b border-white/10 w-48 h-8"></div>
                  </div>
               </div>
               
               <div className="text-right">
                  <p className="text-[10px] text-slate-600 mb-2">АТТЕСТАТ ПРИ УБЫТИИ</p>
                  <button className="px-4 py-2 border border-white/10 rounded-xl text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all">Сгенерировать Форму 21</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
