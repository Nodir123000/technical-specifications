
'use client';

import React, { useState } from 'react';
import { 
  ClipboardList, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  UserPlus,
  RotateCcw,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalForm37() {
  const [items, setItems] = useState([
    { 
      id: 1, 
      name: 'Радиостанция Р-168', 
      serial: 'SN-99281', 
      recipient: 'ст. л-нт Иванов А.П.', 
      unit: '1-й взвод',
      issueDate: '2026-04-10',
      returnDate: null,
      deadline: '2026-05-10',
      status: 'issued'
    },
    { 
      id: 2, 
      name: 'Дозиметр ДК-02', 
      serial: 'D-441', 
      recipient: 'с-нт Петров В.В.', 
      unit: 'Склад №3',
      issueDate: '2026-04-15',
      returnDate: '2026-04-18',
      deadline: '2026-05-15',
      status: 'returned'
    }
  ]);

  const toggleStatus = (id) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const isReturning = item.status === 'issued';
        return {
          ...item,
          status: isReturning ? 'returned' : 'issued',
          returnDate: isReturning ? new Date().toISOString().split('T')[0] : null
        };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30 shadow-lg shadow-rose-500/10">
            <ClipboardList className="text-rose-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ФОРМА 37: ВРЕМЕННОЕ ПОЛЬЗОВАНИЕ</h1>
            <p className="text-slate-400 text-sm font-medium">Учет материальных средств, выданных на срок до одного месяца</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-semibold text-sm">
            <Printer size={18} /> Журнал
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-rose-500 hover:bg-rose-400 text-white rounded-xl transition-all font-bold text-sm shadow-lg shadow-rose-500/20">
            <Plus size={18} /> Выдать имущество
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Stats Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
               <span className="text-slate-500 text-xs font-bold uppercase">На руках</span>
               <span className="bg-rose-500/20 text-rose-400 text-[10px] px-2 py-0.5 rounded-full font-bold">АКТИВНО</span>
            </div>
            <div className="text-4xl font-black text-white">
               {items.filter(i => i.status === 'issued').length} <span className="text-lg text-slate-600 font-medium">ед.</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
               <span className="text-slate-500 text-xs font-bold uppercase">Просрочено</span>
               <AlertCircle size={14} className="text-red-500" />
            </div>
            <div className="text-4xl font-black text-red-500">
               0 <span className="text-lg text-slate-600 font-medium">ед.</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
             <h3 className="text-xs font-bold text-slate-500 uppercase mb-4">Ближайшие возвраты</h3>
             <div className="space-y-3">
                {items.filter(i => i.status === 'issued').map(item => (
                   <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
                      <Clock size={14} className="text-amber-400" />
                      <div>
                         <div className="text-[10px] text-white font-bold">{item.deadline}</div>
                         <div className="text-[9px] text-slate-500 truncate w-24">{item.name}</div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Main List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
               <h2 className="text-lg font-bold text-white uppercase tracking-tight">Реестр выдачи</h2>
               <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white transition-all">Все</button>
                  <button className="px-3 py-1 bg-rose-500/20 rounded-lg text-[10px] font-bold text-rose-400">На руках</button>
                  <button className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white transition-all">Возвращено</button>
               </div>
            </div>

            <div className="divide-y divide-white/5">
               {items.map((item) => (
                  <div key={item.id} className={`p-6 flex items-center justify-between group transition-all ${item.status === 'returned' ? 'opacity-60' : ''}`}>
                     <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                           item.status === 'issued' 
                           ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                           : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        }`}>
                           {item.status === 'issued' ? <Calendar size={24} /> : <CheckCircle2 size={24} />}
                        </div>
                        
                        <div>
                           <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-white">{item.name}</h3>
                              <span className="text-[10px] font-mono text-slate-600">[{item.serial}]</span>
                           </div>
                           <div className="flex items-center gap-4 mt-1">
                              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                 <UserPlus size={12} className="text-slate-500" />
                                 {item.recipient}
                              </div>
                              <div className="text-[10px] text-slate-600 bg-white/5 px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">
                                 {item.unit}
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center gap-12">
                        <div className="text-right">
                           <div className="text-[10px] text-slate-500 uppercase font-bold">Выдано</div>
                           <div className="text-xs text-white font-mono">{item.issueDate}</div>
                        </div>
                        
                        {item.status === 'returned' ? (
                           <div className="text-right">
                              <div className="text-[10px] text-emerald-500 uppercase font-bold">Возврат</div>
                              <div className="text-xs text-emerald-400 font-mono">{item.returnDate}</div>
                           </div>
                        ) : (
                           <div className="text-right">
                              <div className="text-[10px] text-amber-500 uppercase font-bold">Срок до</div>
                              <div className="text-xs text-amber-400 font-mono">{item.deadline}</div>
                           </div>
                        )}

                        <div className="flex items-center gap-2">
                           <button 
                              onClick={() => toggleStatus(item.id)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                 item.status === 'issued'
                                 ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                                 : 'bg-white/5 text-slate-400 hover:bg-white/10'
                              }`}
                           >
                              {item.status === 'issued' ? <RotateCcw size={14} /> : 'Принято'}
                              {item.status === 'issued' ? 'Принять' : ''}
                           </button>
                           <button className="p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                              <Trash2 size={16} />
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
