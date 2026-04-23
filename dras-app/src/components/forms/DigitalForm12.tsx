
'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  Gauge,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  History,
  Info,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalForm12() {
  const [activeTab, setActiveTab] = useState('general');
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
              <Wrench className="text-indigo-400" size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">ФОРМА 12: ТЕХНИЧЕСКИЙ АКТ</h1>
              <p className="text-slate-400 text-xs font-medium">Акт технического состояния вооружения и техники</p>
            </div>
         </div>

         <div className="flex items-center justify-end gap-3 px-6">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-semibold text-sm">
              <Printer size={18} /> Печать
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl transition-all font-bold text-sm shadow-lg shadow-indigo-500/20">
              <Save size={18} /> Утвердить
            </button>
         </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden min-h-[700px] flex flex-col">
         {/* Tabs Navigation */}
         <div className="flex border-b border-white/10 bg-white/[0.02] overflow-x-auto no-scrollbar">
            {[
               { id: 'general', label: 'Основные данные', icon: FileText },
               { id: 'metrics', label: 'Показатели (ресурс)', icon: Gauge },
               { id: 'condition', label: 'Техсостояние', icon: Wrench },
               { id: 'conclusion', label: 'Заключение', icon: CheckCircle2 }
            ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`flex items-center gap-2 px-8 py-5 text-xs font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                   activeTab === tab.id ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
                 }`}
               >
                 <tab.icon size={16} />
                 {tab.label}
                 {activeTab === tab.id && (
                   <motion.div layoutId="tab-bar" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
                 )}
               </button>
            ))}
         </div>

         <div className="p-8 flex-1">
            <AnimatePresence mode="wait">
               {activeTab === 'general' && (
                  <motion.div 
                    key="general"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] text-slate-500 uppercase font-bold">Наименование изделия</label>
                           <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-bold" placeholder="Напр. ЗИЛ-131" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] text-slate-500 uppercase font-bold">Заводской номер</label>
                           <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-mono" placeholder="№..." />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] text-slate-500 uppercase font-bold">Паспорт/Формуляр</label>
                           <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-mono" placeholder="№..." />
                        </div>
                     </div>

                     <div className="pt-8 border-t border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 mb-6">
                           <Info size={18} />
                           <h3 className="text-sm font-bold uppercase tracking-wider">Заводские данные</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                              <input type="text" placeholder="Завод-изготовитель" className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50" />
                              <input type="text" placeholder="Дата изготовления" className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50" />
                           </div>
                           <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-6">
                              <p className="text-[10px] text-indigo-400 font-bold uppercase mb-4">Текущая категория</p>
                              <div className="flex gap-4">
                                 {['I', 'II', 'III', 'IV', 'V'].map(cat => (
                                    <button key={cat} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-xs font-black text-slate-500 hover:border-indigo-500/50 hover:text-indigo-400 transition-all">
                                       {cat}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               )}

               {activeTab === 'metrics' && (
                  <motion.div 
                    key="metrics"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                  >
                     <div className="space-y-8">
                        <div className="space-y-4">
                           <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Эксплуатация</h3>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-black/20 border border-white/5 p-4 rounded-2xl">
                                 <span className="text-[9px] text-slate-600 block mb-1">ВВЕДЕНО В ЭКСПЛ.</span>
                                 <input type="date" className="bg-transparent border-none p-0 text-white font-bold text-sm w-full" />
                              </div>
                              <div className="bg-black/20 border border-white/5 p-4 rounded-2xl">
                                 <span className="text-[9px] text-slate-600 block mb-1">СРОК (ЛЕТ/МЕС)</span>
                                 <input type="text" className="bg-transparent border-none p-0 text-white font-bold text-sm w-full" placeholder="10 лет" />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Наработка</h3>
                           <div className="bg-black/20 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
                              <div>
                                 <span className="text-[9px] text-slate-600 block mb-1">ПРОБЕГ / ЧАСЫ</span>
                                 <input type="number" className="bg-transparent border-none p-0 text-2xl font-black text-white w-32" placeholder="0" />
                              </div>
                              <div className="text-right">
                                 <span className="text-[9px] text-slate-600 block mb-1">ИЗНОС (%)</span>
                                 <span className="text-xl font-bold text-indigo-400">45%</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-3xl p-8 space-y-6">
                        <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                           <History size={14} /> Ремонтная история
                        </h3>
                        <div className="space-y-4">
                           <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                              <p className="text-[10px] text-slate-600 mb-1">ПОСЛЕДНИЙ КАПИТАЛЬНЫЙ РЕМОНТ</p>
                              <p className="text-sm text-white font-medium">12.08.2023 - АРЗ №10</p>
                           </div>
                           <button className="w-full py-3 border-2 border-dashed border-white/5 rounded-2xl text-[10px] text-slate-600 hover:border-indigo-500/30 hover:text-indigo-400 transition-all font-bold">
                              + ДОБАВИТЬ ДАННЫЕ О РЕМОНТЕ
                           </button>
                        </div>
                     </div>
                  </motion.div>
               )}

               {activeTab === 'condition' && (
                  <motion.div 
                    key="condition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                           <label className="text-[10px] text-slate-500 uppercase font-bold">Внешний осмотр</label>
                           <textarea className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white min-h-[120px] focus:outline-none focus:border-indigo-500/30" placeholder="Состояние окраски, наличие коррозии, целостность стекол..."></textarea>
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] text-slate-500 uppercase font-bold">Проверка в работе</label>
                           <textarea className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white min-h-[120px] focus:outline-none focus:border-indigo-500/30" placeholder="Пуск двигателя, работа агрегатов, давление в системах..."></textarea>
                        </div>
                     </div>

                     <div className="p-6 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
                        <div className="flex items-center gap-2 text-rose-400 mb-4">
                           <AlertTriangle size={16} />
                           <h3 className="text-xs font-bold uppercase tracking-wider">Выявленные дефекты</h3>
                        </div>
                        <div className="space-y-3">
                           <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                              <span className="text-xs text-white">Течь масла из-под сальника заднего моста</span>
                              <button className="text-slate-600 hover:text-rose-400 transition-all"><Trash2 size={14} /></button>
                           </div>
                           <button className="text-[10px] font-bold text-rose-400 hover:text-rose-300 transition-all">+ ДОБАВИТЬ ДЕФЕКТ</button>
                        </div>
                     </div>
                  </motion.div>
               )}

               {activeTab === 'conclusion' && (
                  <motion.div 
                    key="conclusion"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                     <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-8">
                        <h2 className="text-lg font-bold text-white mb-6">Заключение комиссии</h2>
                        <textarea className="w-full bg-black/20 border border-white/5 rounded-2xl p-6 text-sm text-white min-h-[200px] focus:outline-none focus:border-indigo-500/30" placeholder="На основании осмотра комиссия пришла к выводу..."></textarea>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl relative">
                           <div className="absolute top-0 right-0 p-4 opacity-5">
                              <ShieldCheck size={40} className="text-indigo-400" />
                           </div>
                           <p className="text-[10px] text-slate-500 uppercase font-bold mb-4">Председатель</p>
                           <div className="border-b border-white/10 h-8"></div>
                           <p className="text-[9px] text-slate-600 mt-2 text-right">Звание, Фамилия И.О.</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                           <p className="text-[10px] text-slate-500 uppercase font-bold mb-4">Члены комиссии</p>
                           <div className="space-y-4">
                              <div className="border-b border-white/10 h-6"></div>
                              <div className="border-b border-white/10 h-6"></div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
