
'use client';

import React, { useState } from 'react';
import { 
  IdCard, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  Sword,
  Shirt,
  Utensils,
  Wallet,
  UserCheck,
  Calendar,
  Lock,
  ChevronRight,
  ShieldCheck,
  QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalForm21() {
  const [activeTab, setActiveTab] = useState('personal');

  const [weapons, setWeapons] = useState([
    { id: 1, name: 'АК-74М', serial: '782341', year: '2020', count: 1 },
    { id: 2, name: 'Штык-нож', serial: '0023', year: '2020', count: 1 }
  ]);

  const [clothing, setClothing] = useState([
    { id: 1, name: 'Куртка полевая', size: '52/4', count: 1, status: 'новый' },
    { id: 2, name: 'Брюки полевые', size: '52/4', count: 1, status: 'новый' },
    { id: 3, name: 'Ремень кожаный', size: '2', count: 1, status: 'б/у' }
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5">
           <QrCode size={120} className="text-cyan-400" />
        </div>
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <IdCard className="text-cyan-400" size={32} />
          </div>
          <div>
            <div className="flex items-center gap-2">
               <h1 className="text-2xl font-bold text-white tracking-tight">ФОРМА 21: АТТЕСТАТ</h1>
               <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest">Действителен</span>
            </div>
            <p className="text-slate-400 text-sm font-medium italic">Аттестат военнослужащего на все виды довольствия</p>
          </div>
        </div>
        
        <div className="flex gap-3 relative z-10">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all font-bold text-sm">
            <Printer size={18} /> Печать книжки
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-2xl transition-all font-black text-sm shadow-lg shadow-cyan-500/20">
            <Save size={18} /> Сохранить
          </button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden min-h-[700px] flex flex-col">
         {/* Tabs */}
         <div className="flex border-b border-white/10 bg-white/[0.02] overflow-x-auto no-scrollbar">
            {[
               { id: 'personal', label: 'Владелец', icon: UserCheck },
               { id: 'weapons', label: 'Оружие', icon: Sword },
               { id: 'clothing', label: 'Вещевое', icon: Shirt },
               { id: 'food', label: 'Продовольствие', icon: Utensils },
               { id: 'money', label: 'Денежное', icon: Wallet }
            ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`flex items-center gap-2 px-8 py-6 text-xs font-bold uppercase tracking-widest transition-all relative ${
                   activeTab === tab.id ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                 }`}
               >
                 <tab.icon size={16} />
                 {tab.label}
                 {activeTab === tab.id && (
                   <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                 )}
               </button>
            ))}
         </div>

         <div className="p-10 flex-1">
            <AnimatePresence mode="wait">
               {activeTab === 'personal' && (
                  <motion.div 
                    key="personal"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                  >
                     <div className="space-y-8">
                        <div className="space-y-4">
                           <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Основные сведения</h3>
                           <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-1">
                                 <label className="text-[10px] text-slate-600 font-bold uppercase">ФИО Военнослужащего</label>
                                 <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-bold" defaultValue="Рахимов Алишер Бахтиёрович" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-1">
                                    <label className="text-[10px] text-slate-600 font-bold uppercase">Звание</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-bold" defaultValue="Лейтенант" />
                                 </div>
                                 <div className="space-y-1">
                                    <label className="text-[10px] text-slate-600 font-bold uppercase">Личный номер</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white font-mono" defaultValue="АБ-456789" />
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-3xl space-y-4">
                           <div className="flex items-center gap-2 text-cyan-400">
                              <Calendar size={18} />
                              <h4 className="text-xs font-bold uppercase tracking-wider">Сроки аттестата</h4>
                           </div>
                           <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                 <p className="text-slate-500 mb-1">Выдан от:</p>
                                 <p className="text-white font-bold">15.04.2026</p>
                              </div>
                              <div>
                                 <p className="text-slate-500 mb-1">Убывает в:</p>
                                 <p className="text-white font-bold">В/Ч 54321</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-black/20 rounded-3xl border border-white/5 p-8 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group hover:border-cyan-500/30 transition-all cursor-pointer">
                           <QrCode size={64} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <div>
                           <p className="text-white font-bold">QR-код аттестата</p>
                           <p className="text-[10px] text-slate-500 mt-2 max-w-[200px]">Отсканируйте код в принимающей части для мгновенного импорта всех данных в систему</p>
                        </div>
                        <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all uppercase tracking-widest">Обновить токен</button>
                     </div>
                  </motion.div>
               )}

               {activeTab === 'weapons' && (
                  <motion.div 
                    key="weapons"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <Sword size={24} className="text-cyan-400" />
                           <h2 className="text-xl font-bold text-white">Учет оружия и боеприпасов</h2>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black rounded-xl text-xs font-black uppercase tracking-tighter">
                           <Plus size={14} /> Добавить
                        </button>
                     </div>

                     <div className="border border-white/5 rounded-3xl overflow-hidden">
                        <table className="w-full text-sm text-left">
                           <thead className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                              <tr>
                                 <th className="p-5">Наименование</th>
                                 <th className="p-5 text-center">Серийный №</th>
                                 <th className="p-5 text-center">Год</th>
                                 <th className="p-5 text-center">Кол-во</th>
                                 <th className="p-5 w-10"></th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-white/5">
                              {weapons.map(w => (
                                 <tr key={w.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="p-5 font-bold text-white">{w.name}</td>
                                    <td className="p-5 text-center font-mono text-cyan-400">{w.serial}</td>
                                    <td className="p-5 text-center text-slate-400">{w.year}</td>
                                    <td className="p-5 text-center font-black text-white">{w.count}</td>
                                    <td className="p-5">
                                       <button className="text-slate-700 hover:text-rose-400 transition-all opacity-0 group-hover:opacity-100">
                                          <Trash2 size={14} />
                                       </button>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </motion.div>
               )}

               {activeTab === 'food' && (
                  <motion.div 
                    key="food"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                     <div className="bg-amber-500/5 border border-amber-500/10 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center gap-3">
                           <Utensils size={24} className="text-amber-400" />
                           <h2 className="text-xl font-bold text-white">Продовольственное довольствие</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Удовлетворен по:</p>
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                                    <span className="text-[9px] text-slate-600 block mb-1">ДАТА</span>
                                    <p className="text-white font-bold">20.04.2026</p>
                                 </div>
                                 <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                                    <span className="text-[9px] text-slate-600 block mb-1">ЗАВТРАК / ОБЕД</span>
                                    <p className="text-white font-bold">Обед</p>
                                 </div>
                              </div>
                           </div>
                           <div className="space-y-4">
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Сухой паек выдан:</p>
                              <div className="bg-black/20 p-5 rounded-2xl border border-white/5 flex items-center justify-between">
                                 <span className="text-xs text-white">Норма №3 (Горная)</span>
                                 <span className="text-amber-400 font-black">3 сут.</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* Bottom Control */}
         <div className="p-8 border-t border-white/10 bg-white/[0.01] flex items-center justify-between">
            <div className="flex items-center gap-4 text-slate-500">
               <Lock size={18} />
               <p className="text-xs italic">Данные зашифрованы и подписаны ЭЦП Начальника штаба</p>
            </div>
            <div className="flex gap-4">
               <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">Закрыть</button>
               <button className="px-8 py-3 bg-cyan-500 text-black rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20 transition-all">Передать в В/Ч</button>
            </div>
         </div>
      </div>
    </div>
  );
}
