
'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  Search,
  ArrowRightLeft,
  Calendar,
  Layers,
  History,
  FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalForm26() {
  const [activeAccount, setActiveAccount] = useState('001');
  const [accounts, setAccounts] = useState([
    { id: '001', name: 'Запчасти к автотехнике', type: 'ЗИП', category: 'I' },
    { id: '002', name: 'Инструменты слесарные', type: 'Инструмент', category: 'II' }
  ]);

  const [entries, setEntries] = useState([
    { id: 1, date: '2026-04-20', doc: 'Накладная №45', source: 'Склад №1', arrived: 10, departed: 0, balance: 10, note: 'Первичный приход' },
    { id: 2, date: '2026-04-22', doc: 'Требование №12', source: 'Ремрота', arrived: 0, departed: 2, balance: 8, note: 'На ремонт' }
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
            <BookOpen className="text-indigo-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ФОРМА 26: КНИГА УЧЕТА</h1>
            <p className="text-slate-400 text-sm font-medium">Учет наличия и движения материальных средств в подразделении</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-semibold text-sm">
            <Printer size={18} /> Отчет
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl transition-all font-bold text-sm shadow-lg shadow-indigo-500/20">
            <Save size={18} /> Сохранить книгу
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar - Accounts List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden">
            <div className="p-5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Лицевые счета</h2>
                <button className="p-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg text-indigo-400 transition-all">
                  <Plus size={14} />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                <input 
                  type="text" 
                  placeholder="Поиск счета..."
                  className="w-full bg-black/20 border border-white/5 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-indigo-500/30 transition-all"
                />
              </div>
            </div>
            
            <div className="p-2 space-y-1">
              {accounts.map(acc => (
                <button 
                  key={acc.id}
                  onClick={() => setActiveAccount(acc.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all group ${
                    activeAccount === acc.id 
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold ${
                      activeAccount === acc.id ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'
                    }`}>
                      {acc.id}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{acc.name}</div>
                      <div className={`text-[10px] ${activeAccount === acc.id ? 'text-indigo-100' : 'text-slate-600'}`}>
                        {acc.type} • Кат. {acc.category}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-6 rounded-3xl backdrop-blur-xl">
             <div className="flex items-center gap-2 text-indigo-400 mb-4">
                <Layers size={16} />
                <h3 className="text-xs font-bold uppercase tracking-wider">Инфо об объекте</h3>
             </div>
             <div className="space-y-4">
                <div>
                   <label className="text-[10px] text-slate-500 block mb-1">Подразделение</label>
                   <p className="text-sm text-white font-medium">Ремонтная рота (123 ВЧ)</p>
                </div>
                <div>
                   <label className="text-[10px] text-slate-500 block mb-1">Книга начата</label>
                   <p className="text-sm text-white font-medium">01 января 2026 г.</p>
                </div>
                <div className="pt-4 flex items-center gap-2">
                   <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-indigo-500"></div>
                   </div>
                   <span className="text-[10px] text-slate-500">75% заполнено</span>
                </div>
             </div>
          </div>
        </div>

        {/* Main Content - Ledger Table */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col h-[700px] overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <FileSpreadsheet size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Движение по счету №{activeAccount}</h2>
                  <p className="text-xs text-slate-500">История операций прихода и расхода</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/20 transition-all text-xs font-bold">
                    <History size={14} /> Сверка
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl transition-all text-xs font-bold">
                    <Plus size={14} /> Новая запись
                 </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-sm border-collapse">
                <thead className="sticky top-0 bg-[#0a0a0b] z-10">
                  <tr className="text-slate-500 border-b border-white/10">
                    <th className="p-4 font-bold text-left text-[10px] uppercase bg-[#0a0a0b]">Дата</th>
                    <th className="p-4 font-bold text-left text-[10px] uppercase bg-[#0a0a0b]">Документ (№ и дата)</th>
                    <th className="p-4 font-bold text-left text-[10px] uppercase bg-[#0a0a0b]">Откуда (куда)</th>
                    <th className="p-4 font-bold text-right text-[10px] uppercase text-emerald-400 bg-[#0a0a0b]">Прибыло</th>
                    <th className="p-4 font-bold text-right text-[10px] uppercase text-rose-400 bg-[#0a0a0b]">Убыло</th>
                    <th className="p-4 font-bold text-right text-[10px] uppercase text-indigo-400 bg-[#0a0a0b]">Состоит</th>
                    <th className="p-4 font-bold text-left text-[10px] uppercase bg-[#0a0a0b]">Примечание</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {entries.map((entry) => (
                      <motion.tr 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={entry.id} 
                        className="group hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="p-4 font-mono text-xs text-slate-400">{entry.date}</td>
                        <td className="p-4 font-medium text-white">{entry.doc}</td>
                        <td className="p-4 text-slate-400">{entry.source}</td>
                        <td className="p-4 text-right text-emerald-400 font-bold">{entry.arrived > 0 ? `+${entry.arrived}` : '-'}</td>
                        <td className="p-4 text-right text-rose-400 font-bold">{entry.departed > 0 ? `-${entry.departed}` : '-'}</td>
                        <td className="p-4 text-right text-white font-black">{entry.balance}</td>
                        <td className="p-4 text-slate-500 text-xs italic">{entry.note}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  
                  {/* Quick Add Row */}
                  <tr className="bg-indigo-500/5 border-t border-indigo-500/20">
                    <td className="p-4"><input type="date" className="bg-transparent border-none focus:ring-0 p-0 text-xs text-indigo-300 w-full" defaultValue={new Date().toISOString().split('T')[0]} /></td>
                    <td className="p-4"><input type="text" className="bg-transparent border-none focus:ring-0 p-0 text-xs text-white w-full" placeholder="Наименование документа..." /></td>
                    <td className="p-4"><input type="text" className="bg-transparent border-none focus:ring-0 p-0 text-xs text-white w-full" placeholder="Корреспондент..." /></td>
                    <td className="p-4"><input type="number" className="bg-transparent border-none focus:ring-0 p-0 text-xs text-emerald-400 text-right w-full" placeholder="0" /></td>
                    <td className="p-4"><input type="number" className="bg-transparent border-none focus:ring-0 p-0 text-xs text-rose-400 text-right w-full" placeholder="0" /></td>
                    <td className="p-4 text-right text-indigo-400 font-bold">---</td>
                    <td className="p-4"><input type="text" className="bg-transparent border-none focus:ring-0 p-0 text-xs text-slate-500 w-full" placeholder="..." /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
               <div className="flex gap-8">
                  <div className="flex flex-col">
                     <span className="text-[10px] text-slate-500 uppercase font-bold mb-1">Итого приход</span>
                     <span className="text-emerald-400 font-black text-xl">10</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] text-slate-500 uppercase font-bold mb-1">Итого расход</span>
                     <span className="text-rose-400 font-black text-xl">2</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] text-slate-500 uppercase font-bold mb-1">Тек. остаток</span>
                     <span className="text-indigo-400 font-black text-xl underline decoration-indigo-500/50 decoration-2 underline-offset-4">8</span>
                  </div>
               </div>
               
               <div className="flex items-center gap-4 text-slate-500 text-[10px] font-mono">
                  <span>ЛИСТ: 12 / 200</span>
                  <div className="flex gap-1">
                     <button className="w-6 h-6 flex items-center justify-center border border-white/10 rounded hover:bg-white/10 transition-all cursor-pointer">{'<'}</button>
                     <button className="w-6 h-6 flex items-center justify-center border border-white/10 rounded hover:bg-white/10 transition-all cursor-pointer">{'>'}</button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
