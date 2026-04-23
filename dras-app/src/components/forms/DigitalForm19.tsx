
'use client';

import React, { useState } from 'react';
import { 
  Ticket, 
  Utensils, 
  Beef, 
  Fish, 
  Milk, 
  Cookie,
  Printer, 
  Save, 
  CheckCircle2,
  Lock,
  User,
  Stamp
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DigitalForm19() {
  const [coupons, setCoupons] = useState([
    { id: 1, type: 'Meat', amount: '500г', status: 'ready' },
    { id: 2, type: 'Butter', amount: '250г', status: 'claimed', date: '2026-04-20' },
    { id: 3, type: 'Fish', amount: '400г', status: 'ready' },
    { id: 4, type: 'Bread', amount: '600г', status: 'ready' },
    { id: 5, type: 'Meat', amount: '500г', status: 'ready' },
    { id: 6, type: 'Butter', amount: '250г', status: 'ready' },
  ]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
           <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 shadow-lg shadow-amber-500/10">
              <Ticket className="text-amber-400" size={32} />
           </div>
           <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">ФОРМА 19: РАЗДАТОЧНЫЙ ЛИСТ</h1>
              <p className="text-slate-400 text-sm font-medium italic">На получение мяса, масла, рыбы и хлеба</p>
           </div>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all font-bold text-sm">
              <Printer size={18} /> Печать талонов
           </button>
           <button className="flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-2xl transition-all font-black text-sm shadow-lg shadow-amber-500/20">
              <Save size={18} /> Сохранить
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Holder Info */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-all">
                  <User size={80} className="text-amber-500" />
               </div>
               <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Владелец листа</h3>
               <div className="space-y-4 relative z-10">
                  <div className="space-y-1">
                     <p className="text-xs text-slate-500 uppercase font-bold">Воинское звание</p>
                     <p className="text-white font-bold">Капитан</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-xs text-slate-500 uppercase font-bold">Фамилия И.О.</p>
                     <p className="text-white font-bold text-lg">Мирзоев О.Ш.</p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                     <p className="text-[9px] text-slate-600 mb-2">НА МЕСЯЦ:</p>
                     <p className="text-amber-400 font-black tracking-widest text-xl uppercase">АПРЕЛЬ 2026</p>
                  </div>
               </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-3xl backdrop-blur-xl space-y-4">
               <div className="flex items-center gap-2 text-amber-500">
                  <Stamp size={18} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Аутентификация</h3>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs p-3 bg-black/20 rounded-xl border border-white/5">
                     <span className="text-slate-400">Нач. Прод. Службы</span>
                     <CheckCircle2 size={14} className="text-emerald-400" />
                  </div>
                  <div className="flex items-center justify-between text-xs p-3 bg-black/20 rounded-xl border border-white/5">
                     <span className="text-slate-400">Печать В/Ч</span>
                     <CheckCircle2 size={14} className="text-emerald-400" />
                  </div>
               </div>
               <p className="text-[9px] text-slate-600 italic mt-4">Без подписи и печати лист недействителен</p>
            </div>
         </div>

         {/* Digital Coupons Grid */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl flex flex-col gap-8">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Utensils size={24} className="text-amber-400" />
                     <h2 className="text-xl font-bold text-white tracking-tight">Цифровые талоны</h2>
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 uppercase tracking-widest">
                     Остаток: 5 / 6
                  </span>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coupons.map((c) => (
                     <motion.div 
                       whileHover={{ scale: 1.02 }}
                       key={c.id} 
                       className={`relative overflow-hidden rounded-2xl border transition-all cursor-pointer p-5 ${
                         c.status === 'claimed' 
                         ? 'bg-black/40 border-white/5 opacity-50 grayscale' 
                         : 'bg-white/5 border-white/10 hover:border-amber-500/50'
                       }`}
                     >
                        <div className="flex items-center justify-between relative z-10">
                           <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                 c.type === 'Meat' ? 'bg-rose-500/20 text-rose-400' :
                                 c.type === 'Butter' ? 'bg-amber-300/20 text-amber-300' :
                                 c.type === 'Fish' ? 'bg-blue-500/20 text-blue-400' :
                                 'bg-orange-500/20 text-orange-400'
                              }`}>
                                 {c.type === 'Meat' && <Beef size={24} />}
                                 {c.type === 'Butter' && <Milk size={24} />}
                                 {c.type === 'Fish' && <Fish size={24} />}
                                 {c.type === 'Bread' && <Cookie size={24} />}
                              </div>
                              <div>
                                 <h4 className="font-bold text-white">{c.type === 'Meat' ? 'МЯСО' : c.type === 'Butter' ? 'МАСЛО' : c.type === 'Fish' ? 'РЫБА' : 'ХЛЕБ'}</h4>
                                 <p className="text-xs text-slate-500">{c.amount}</p>
                              </div>
                           </div>
                           
                           {c.status === 'claimed' ? (
                              <div className="text-emerald-400 flex flex-col items-end">
                                 <CheckCircle2 size={24} />
                                 <span className="text-[9px] mt-1 uppercase font-bold">{c.date}</span>
                              </div>
                           ) : (
                              <button className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black rounded-xl text-[10px] font-black uppercase transition-all">
                                 Получить
                              </button>
                           )}
                        </div>
                        
                        {/* Cut Line Visualization */}
                        <div className="absolute top-0 bottom-0 right-14 border-r border-dashed border-white/10"></div>
                        <div className="absolute top-1/2 left-[-6px] translate-y-[-50%] w-3 h-3 bg-[#0f0f10] rounded-full border border-white/10"></div>
                        <div className="absolute top-1/2 right-[-6px] translate-y-[-50%] w-3 h-3 bg-[#0f0f10] rounded-full border border-white/10"></div>
                     </motion.div>
                  ))}
               </div>

               <div className="mt-4 p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-amber-400">
                     <Lock size={14} />
                     <h4 className="text-[10px] font-bold uppercase tracking-widest">Защитный механизм</h4>
                  </div>
                  <p className="text-xs text-slate-500">Выдача продуктов со склада производится только при предъявлении цифрового ключа раздаточного листа. По отдельным оторванным (удаленным) талонам выдача не разрешается.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
