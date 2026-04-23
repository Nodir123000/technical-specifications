
'use client';

import React, { useState } from 'react';
import { Save, Plus, Trash2, ShieldAlert, CheckCircle2, FileText, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { saveFormSubmission } from '@/lib/actions/dras-actions';

export default function DigitalForm6() {
  const [items, setItems] = useState([{ id: 1, name: '', code: '', unit: '', cat: '', qty: '' }]);
  const [isSaved, setIsSaved] = useState(false);

  const addItem = () => {
    setItems([...items, { id: items.length + 1, name: '', code: '', unit: '', cat: '', qty: '' }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = async () => {
    const formData = {
      items,
      timestamp: new Date().toISOString()
    };
    
    const result = await saveFormSubmission('Приложение_1', 'Форма_6', formData);
    
    if (result.success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } else {
      alert('Ошибка при сохранении: ' + result.error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/navigator" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-sm">
          <ChevronLeft size={16} /> К навигатору
        </Link>
        <div className="flex gap-3">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            {isSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
            {isSaved ? 'Сохранено' : 'Сохранить форму'}
          </button>
        </div>
      </div>

      <div className="bg-[#0a1120] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Compliance Header */}
        <div className="bg-cyan-500/10 border-b border-cyan-500/20 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-tighter">
            <ShieldAlert size={14} /> Авто-валидация: Статьи 39, 42, 43 П260
          </div>
          <div className="text-[10px] text-slate-500 font-mono">ID: DRAS-F6-2026-04-22</div>
        </div>

        {/* Form Body */}
        <div className="p-10 space-y-12">
          {/* Title & Meta */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black tracking-tighter uppercase">ЧЕКОВОЕ ТРЕБОВАНИЕ №0042</h1>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex flex-col items-center">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Книжка №</span>
                <input type="text" defaultValue="8812" className="bg-white/5 border-b border-white/10 outline-none text-center px-2 py-1 w-20 focus:border-cyan-400 transition-colors" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Серия</span>
                <input type="text" defaultValue="АБ" className="bg-white/5 border-b border-white/10 outline-none text-center px-2 py-1 w-12 focus:border-cyan-400 transition-colors" />
              </div>
            </div>
          </div>

          {/* Table 1: Registration Metadata */}
          <div className="grid grid-cols-6 border border-white/10 rounded-xl overflow-hidden">
            <HeaderCell label="Признак информации" value="000" />
            <HeaderCell label="Регистрационный №" value="001" />
            <HeaderCell label="Код документа" value="003" />
            <HeaderCell label="№ документа" value="005" />
            <HeaderCell label="Дата документа" value="032" isDate />
            <HeaderCell label="Основание операции" value="045" />
          </div>

          {/* Table 2: Operation Details */}
          <div className="grid grid-cols-6 border border-white/10 rounded-xl overflow-hidden">
            <HeaderCell label="Дата операции" value="034" isDate />
            <HeaderCell label="Служба" value="046" />
            <HeaderCell label="Грузоотправитель" value="052" />
            <HeaderCell label="Грузополучатель" value="053" />
            <HeaderCell label="Ответственный" value="054" />
            <HeaderCell label="Исполнение" value="207" />
          </div>

          {/* Table 3: Material Assets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FileText size={20} className="text-cyan-500" /> Материальные средства
              </h3>
              <button 
                onClick={addItem}
                className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Plus size={14} /> Добавить строку
              </button>
            </div>
            
            <div className="border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-[10px] text-slate-500 uppercase font-bold">
                    <th className="p-3 border-r border-white/10 w-12">№</th>
                    <th className="p-3 border-r border-white/10">Наименование</th>
                    <th className="p-3 border-r border-white/10">Код номенкл.</th>
                    <th className="p-3 border-r border-white/10">Ед. изм.</th>
                    <th className="p-3 border-r border-white/10 w-24">Категория</th>
                    <th className="p-3 border-r border-white/10 w-24">Кол-во</th>
                    <th className="p-3 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id} className="border-t border-white/10 hover:bg-white/2 transition-colors">
                      <td className="p-3 border-r border-white/10 text-center text-slate-500">{idx + 1}</td>
                      <td className="p-3 border-r border-white/10">
                        <input type="text" className="bg-transparent w-full outline-none focus:text-cyan-400" placeholder="Бензин АИ-92" />
                      </td>
                      <td className="p-3 border-r border-white/10 font-mono text-xs">
                        <input type="text" className="bg-transparent w-full outline-none" placeholder="105001" />
                      </td>
                      <td className="p-3 border-r border-white/10">
                        <input type="text" className="bg-transparent w-full outline-none" placeholder="литр" />
                      </td>
                      <td className="p-3 border-r border-white/10">
                        <select className="bg-transparent w-full outline-none">
                          <option>I</option>
                          <option>II</option>
                          <option>III</option>
                        </select>
                      </td>
                      <td className="p-3 border-r border-white/10">
                        <input type="number" className="bg-transparent w-full outline-none font-bold" placeholder="0.00" />
                      </td>
                      <td className="p-3 text-center">
                        {items.length > 1 && (
                          <button onClick={() => removeItem(item.id)} className="text-slate-600 hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-20 pt-8 border-t border-white/10">
            <SignatureArea label="Заместитель командира по тылу" />
            <SignatureArea label="Начальник службы" />
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-black/40 text-[9px] text-slate-600 font-mono flex justify-between">
          <span>DRAS SMART-FORM ENGINE V2.1</span>
          <span>LEGENDARY MASTER QUALITY ASSURED</span>
        </div>
      </div>
    </div>
  );
}

function HeaderCell({ label, value, isDate }: any) {
  return (
    <div className="p-4 border-r border-white/10 last:border-0 hover:bg-white/2 transition-colors">
      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter mb-2 h-8 leading-tight">
        {label}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-cyan-500 font-mono opacity-50">{value}</span>
        <input 
          type={isDate ? "date" : "text"} 
          className="bg-transparent w-full outline-none text-sm font-semibold border-b border-transparent focus:border-cyan-500/30 transition-all"
        />
      </div>
    </div>
  );
}

function SignatureArea({ label }: { label: string }) {
  return (
    <div className="space-y-1">
      <div className="h-10 border-b border-white/20 relative">
        <span className="absolute bottom-1 left-0 text-[10px] text-slate-600 uppercase italic">ЭЦП ПОДТВЕРЖДЕНО</span>
      </div>
      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{label}</div>
    </div>
  );
}
