
'use client';

import React, { useState } from 'react';
import { 
  FileCheck, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  AlertTriangle,
  RefreshCw,
  ClipboardCheck,
  Calendar,
  Users,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalForm13() {
  const [formData, setFormData] = useState({
    actNumber: '',
    actDate: new Date().toISOString().split('T')[0],
    service: '',
    unit: '',
    purpose: 'Перевод в низшую категорию / Списание',
    items: [
      { 
        id: 1, 
        name: 'Генератор Г-290', 
        code: '112-901', 
        unit: 'шт', 
        category: 'I', 
        amount: 1, 
        cost: 45000, 
        yearsUsed: 12,
        newName: 'Генератор (неисправный)',
        newCode: '112-901-R',
        newCategory: 'V',
        newAmount: 1
      }
    ],
    commission: {
      chairman: '',
      members: ['', '']
    }
  });

  const addItem = () => {
    const newId = formData.items.length + 1;
    setFormData({
      ...formData,
      items: [...formData.items, { 
        id: newId, 
        name: '', code: '', unit: '', category: '', amount: 0, cost: 0, yearsUsed: 0,
        newName: '', newCode: '', newCategory: '', newAmount: 0
      }]
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Approval Block & Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <FileCheck className="text-emerald-400" size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">ФОРМА 13: АКТ СОСТОЯНИЯ</h1>
              <p className="text-slate-400 text-xs font-medium">Изменение качественного состояния и списание</p>
            </div>
         </div>

         <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <ShieldCheck size={80} className="text-emerald-500" />
            </div>
            <div className="space-y-2 relative z-10">
               <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                  <span>УТВЕРЖДАЮ</span>
                  <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">М.П. ГЕРБОВАЯ</span>
               </div>
               <div className="border-b border-white/10 h-8 flex items-end">
                  <span className="text-xs text-slate-400 italic">Командир воинской части (подпись)</span>
               </div>
               <div className="border-b border-white/10 h-8"></div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <ClipboardCheck size={18} />
              <h2 className="text-lg font-bold uppercase tracking-wider">Данные акта</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Акт №</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-mono"
                  placeholder="000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Дата</label>
                <input 
                  type="date" 
                  defaultValue={formData.actDate}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-emerald-400">
                <RefreshCw size={20} />
                <h2 className="text-xl font-bold">Объекты изменений</h2>
              </div>
              <button 
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/20 transition-all text-xs font-bold"
              >
                <Plus size={14} /> Добавить
              </button>
            </div>

            <div className="space-y-4">
               {formData.items.map((item) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={item.id} 
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group overflow-hidden"
                  >
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        {/* DECOMMISSION */}
                        <div className="space-y-4">
                           <div className="flex items-center gap-2 text-rose-400 text-[10px] font-bold uppercase tracking-widest border-b border-rose-500/20 pb-2">
                              <AlertTriangle size={12} /> Списать / Перевести
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              <div className="col-span-2">
                                 <input type="text" className="w-full bg-transparent border-b border-white/5 focus:border-rose-500/50 focus:ring-0 text-white font-bold p-0 placeholder-slate-700" placeholder="Наименование..." />
                              </div>
                              <input type="text" className="bg-transparent border-b border-white/5 focus:ring-0 text-slate-400 text-xs p-0" placeholder="Код ном." />
                              <div className="flex gap-2">
                                 <input type="text" className="bg-transparent border-b border-white/5 focus:ring-0 text-slate-400 text-xs p-0 w-12 text-center" placeholder="Ед." />
                                 <input type="text" className="bg-transparent border-b border-white/5 focus:ring-0 text-slate-400 text-xs p-0 w-12 text-center" placeholder="Кат" />
                              </div>
                           </div>
                        </div>

                        {/* ACCOUNT */}
                        <div className="space-y-4">
                           <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border-b border-emerald-500/20 pb-2">
                              <RefreshCw size={12} /> Оприходовать
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              <div className="col-span-2">
                                 <input type="text" className="w-full bg-transparent border-b border-white/5 focus:border-emerald-500/50 focus:ring-0 text-white font-bold p-0 placeholder-slate-700" placeholder="Новое состояние..." />
                              </div>
                              <input type="text" className="bg-transparent border-b border-white/5 focus:ring-0 text-slate-400 text-xs p-0" placeholder="Новый код" />
                              <div className="flex gap-2">
                                 <input type="text" className="bg-transparent border-b border-white/5 focus:ring-0 text-slate-400 text-xs p-0 w-12 text-center" placeholder="Кат" />
                                 <input type="text" className="bg-transparent border-b border-white/5 focus:ring-0 text-slate-400 text-xs p-0 w-12 text-center font-bold" placeholder="Кол" />
                              </div>
                           </div>
                        </div>
                     </div>
                     <button className="absolute top-4 right-4 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 size={16} />
                     </button>
                  </motion.div>
               ))}
            </div>
          </div>
        </div>

        {/* Right Column - Commission */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl h-full">
            <div className="flex items-center gap-2 text-emerald-400 mb-8">
              <Users size={20} />
              <h2 className="text-xl font-bold">Комиссия</h2>
            </div>

            <div className="space-y-8">
               <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Председатель</label>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                     <input type="text" placeholder="Должность, звание" className="w-full bg-transparent border-none focus:ring-0 text-sm text-white" />
                     <div className="border-t border-white/5 pt-2 flex justify-between items-center">
                        <span className="text-[10px] text-slate-600 italic">Подпись</span>
                        <input type="text" placeholder="Фамилия И.О." className="bg-transparent border-none focus:ring-0 text-xs text-right text-emerald-400 font-bold" />
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Члены комиссии</label>
                    <button className="text-emerald-500 text-[10px] font-bold">+ Добавить</button>
                  </div>
                  {[1, 2].map(i => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-3">
                      <input type="text" placeholder={`Член комиссии №${i}`} className="w-full bg-transparent border-none focus:ring-0 text-xs text-slate-300" />
                      <div className="border-t border-white/5 pt-2 flex justify-between items-center text-right">
                        <input type="text" placeholder="Фамилия И.О." className="bg-transparent border-none focus:ring-0 text-[10px] text-slate-500" />
                      </div>
                    </div>
                  ))}
               </div>

               <div className="pt-8 border-t border-white/10">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-4">Заключение</label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all min-h-[150px]"
                    placeholder="Причины перевода в другую категорию, сорт; целесообразность использования узлов..."
                  ></textarea>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
