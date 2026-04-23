
'use client';

import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  Fuel,
  UserCheck,
  Calendar,
  PenTool,
  Hash,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalForm8() {
  const [items, setItems] = useState([
    { id: 'item1', name: 'Бензин АИ-92', unit: 'л', code: '0302' },
    { id: 'item2', name: 'Дизельное топливо', unit: 'л', code: '0305' }
  ]);

  const [rows, setRows] = useState([
    { id: 1, recipient: 'л-нт Смирнов А.П.', code: '101', vehicle: 'ГАЗ-66', data: { item1: 50, item2: 0 }, date: '2026-04-20' },
    { id: 2, recipient: 'с-нт Петров В.В.', code: '202', vehicle: 'УАЗ-469', data: { item1: 20, item2: 0 }, date: '2026-04-20' }
  ]);

  const addRow = () => {
    const newId = rows.length + 1;
    setRows([...rows, { id: newId, recipient: '', code: '', vehicle: '', data: {}, date: new Date().toISOString().split('T')[0] }]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30 shadow-lg shadow-orange-500/10">
            <Fuel className="text-orange-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ФОРМА 8: РАЗДАТОЧНАЯ ВЕДОМОСТЬ</h1>
            <p className="text-slate-400 text-sm font-medium">Выдача горючего и материальных средств подразделениям</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-semibold text-sm">
            <Printer size={18} /> Печать
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-400 text-black rounded-xl transition-all font-bold text-sm shadow-lg shadow-orange-500/20">
            <Save size={18} /> Сохранить
          </button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden min-h-[600px] flex flex-col">
        {/* Table Meta */}
        <div className="p-6 border-b border-white/10 grid grid-cols-1 md:grid-cols-4 gap-6 bg-white/[0.02]">
           <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-bold">Ведомость №</label>
              <input type="text" className="w-full bg-black/20 border border-white/5 rounded-xl px-3 py-2 text-white font-mono text-sm" placeholder="000" />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-bold">Основание</label>
              <input type="text" className="w-full bg-black/20 border border-white/5 rounded-xl px-3 py-2 text-white text-sm" placeholder="Напр. Наряд №5" />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-bold">Служба</label>
              <input type="text" className="w-full bg-black/20 border border-white/5 rounded-xl px-3 py-2 text-white text-sm" placeholder="Служба ГСМ" />
           </div>
           <div className="flex items-end">
              <button 
                onClick={addRow}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-xl border border-orange-500/20 transition-all text-xs font-bold"
              >
                <Plus size={14} /> Добавить получателя
              </button>
           </div>
        </div>

        {/* Dynamic Table */}
        <div className="flex-1 overflow-x-auto">
           <table className="w-full text-sm border-collapse">
              <thead>
                 <tr className="text-slate-500 border-b border-white/10">
                    <th className="p-4 font-bold text-left text-[9px] uppercase bg-[#0a0a0b] sticky left-0 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.3)]">№</th>
                    <th className="p-4 font-bold text-left text-[9px] uppercase bg-[#0a0a0b] sticky left-12 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.3)] min-w-[200px]">Получатель (Машина)</th>
                    {items.map(item => (
                       <th key={item.id} className="p-4 font-bold text-center text-[9px] uppercase bg-orange-500/5 text-orange-400 border-x border-white/5">
                          <div className="flex flex-col items-center">
                             <span>{item.name}</span>
                             <span className="text-[8px] opacity-60">код {item.code} | {item.unit}</span>
                          </div>
                       </th>
                    ))}
                    <th className="p-4 font-bold text-left text-[9px] uppercase bg-[#0a0a0b]">Дата</th>
                    <th className="p-4 font-bold text-left text-[9px] uppercase bg-[#0a0a0b]">Расписка</th>
                    <th className="p-4 w-10 bg-[#0a0a0b]"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {rows.map((row, idx) => (
                    <tr key={row.id} className="group hover:bg-white/[0.01] transition-colors">
                       <td className="p-4 text-slate-600 font-mono text-xs sticky left-0 bg-[#0a0a0b] group-hover:bg-white/[0.01] transition-colors">{idx + 1}</td>
                       <td className="p-4 sticky left-12 bg-[#0a0a0b] group-hover:bg-white/[0.01] transition-colors">
                          <div className="flex flex-col">
                             <input type="text" defaultValue={row.recipient} className="bg-transparent border-none p-0 text-white font-medium focus:ring-0 placeholder-slate-700" placeholder="Звание, ФИО..." />
                             <input type="text" defaultValue={row.vehicle} className="bg-transparent border-none p-0 text-[10px] text-slate-500 focus:ring-0 placeholder-slate-800" placeholder="Номер машины..." />
                          </div>
                       </td>
                       {items.map(item => (
                          <td key={item.id} className="p-4 border-x border-white/5">
                             <input 
                               type="number" 
                               className="w-full bg-transparent border-none p-0 text-center text-white font-bold focus:ring-0 font-mono" 
                               placeholder="0"
                               defaultValue={row.data[item.id] || ''}
                             />
                          </td>
                       ))}
                       <td className="p-4">
                          <input type="text" defaultValue={row.date} className="bg-transparent border-none p-0 text-xs text-slate-400 focus:ring-0 w-20" />
                       </td>
                       <td className="p-4">
                          <div className="flex items-center gap-2 text-slate-600 italic text-[10px] bg-black/20 px-3 py-1 rounded-full border border-white/5">
                             <PenTool size={10} /> Подписано
                          </div>
                       </td>
                       <td className="p-4 text-right">
                          <button className="text-slate-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                             <Trash2 size={14} />
                          </button>
                       </td>
                    </tr>
                 ))}
                 
                 {/* Footer Stats Row */}
                 <tr className="bg-orange-500/5 font-black text-orange-400">
                    <td colSpan={2} className="p-4 text-right text-[10px] uppercase tracking-widest">Итого по ведомости:</td>
                    {items.map(item => (
                       <td key={item.id} className="p-4 text-center border-x border-white/5 font-mono">
                          {rows.reduce((sum, row) => sum + (row.data[item.id] || 0), 0)}
                       </td>
                    ))}
                    <td colSpan={3}></td>
                 </tr>
              </tbody>
           </table>
        </div>

        {/* Bottom Signature Area */}
        <div className="p-8 border-t border-white/10 bg-white/[0.01] grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-6">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                 <UserCheck size={16} />
                 <h3 className="text-xs font-bold uppercase tracking-widest">Учетные подписи</h3>
              </div>
              <div className="grid grid-cols-1 gap-6">
                 <div className="border-b border-dashed border-white/20 pb-2">
                    <div className="flex justify-between text-[10px] text-slate-600 mb-1">
                       <span>Начальник службы</span>
                       <span>Звание, подпись, фамилия</span>
                    </div>
                    <div className="h-6"></div>
                 </div>
                 <div className="border-b border-dashed border-white/20 pb-2">
                    <div className="flex justify-between text-[10px] text-slate-600 mb-1">
                       <span>Лицо, ведущее учет</span>
                       <span>Звание, подпись, фамилия</span>
                    </div>
                    <div className="h-6"></div>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                 <Activity size={16} />
                 <h3 className="text-xs font-bold uppercase tracking-widest">Отметка склада</h3>
              </div>
              <div className="bg-black/20 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Hash size={100} className="text-white" />
                 </div>
                 <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                       <span className="text-slate-500">Выдал (принял) материально ответственное лицо:</span>
                    </div>
                    <div className="border-b border-white/10 h-10"></div>
                    <div className="flex justify-end italic text-[10px] text-slate-600">Звание, подпись, фамилия</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
