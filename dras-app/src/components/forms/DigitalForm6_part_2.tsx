
'use client';

import React from 'react';
import { FileText, Save, Printer, ArrowLeft } from 'lucide-react';

export default function DigitalForm_______6_______2() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
            <FileText className="text-cyan-400" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ФОРМА 6 (ЧАСТЬ 2</h1>
            <p className="text-slate-400 text-xs font-medium">Форма_6_часть_2</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-sm">
            <Printer size={16} /> Печать
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl transition-all font-bold text-sm">
            <Save size={16} /> Сохранить
          </button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl p-8 min-h-[400px]">
        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
            <FileText className="text-slate-600" size={40} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Автосгенерированная форма</h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm">
            Это черновик цифровой формы Форма_6_часть_2. Вы можете отредактировать этот файл в src/components/forms/DigitalForm_______6_______2.tsx
          </p>
          
          <div className="mt-10 w-full max-w-2xl border border-white/5 rounded-2xl overflow-hidden">
            <div className="bg-white/5 p-4 border-b border-white/5 text-left font-mono text-[10px] text-slate-500 uppercase tracking-widest">
              Спецификация полей
            </div>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase font-black">
                  <th className="p-4">Поле</th>
                  <th className="p-4">Тип</th>
                  <th className="p-4">Значение</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-4 font-mono text-xs text-white">document_number</td>
                  <td className="p-4 text-xs text-slate-500">Number</td>
                  <td className="p-4"><input type="text" className="bg-black/20 border border-white/5 rounded px-2 py-1 w-full text-xs" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-xs text-white">date_issued</td>
                  <td className="p-4 text-xs text-slate-500">Date</td>
                  <td className="p-4"><input type="date" className="bg-black/20 border border-white/5 rounded px-2 py-1 w-full text-xs" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
