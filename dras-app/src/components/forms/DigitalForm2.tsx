
'use client';

import React, { useState } from 'react';
import { 
  FileBox, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  Info,
  Package,
  ArrowRightLeft,
  Calendar,
  UserCheck,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DigitalForm2() {
  const [formData, setFormData] = useState({
    docNumber: '',
    docDate: new Date().toISOString().split('T')[0],
    validUntil: '',
    operationPurpose: '',
    service: '',
    sender: '',
    recipient: '',
    responsiblePerson: '',
    items: [
      { id: 1, name: '', code: '', unit: '', category: '', toIssue: 0, issued: 0, note: '' }
    ]
  });

  const addItem = () => {
    const newId = formData.items.length + 1;
    setFormData({
      ...formData,
      items: [...formData.items, { id: newId, name: '', code: '', unit: '', category: '', toIssue: 0, issued: 0, note: '' }]
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 shadow-lg shadow-amber-500/10">
            <FileBox className="text-amber-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ФОРМА 2: НАКЛАДНАЯ</h1>
            <p className="text-slate-400 text-sm font-medium">Для внутреннего перемещения материальных средств</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-semibold text-sm">
            <Printer size={18} /> Печать
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl transition-all font-bold text-sm shadow-lg shadow-amber-500/20">
            <Save size={18} /> Сохранить
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Meta & Parties */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Info size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Реквизиты</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Номер накладной</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all font-mono"
                  placeholder="000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Дата</label>
                <input 
                  type="date" 
                  defaultValue={formData.docDate}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Служба</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                  placeholder="Напр. Служба ГСМ"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <ArrowRightLeft size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Стороны</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Грузоотправитель</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all text-sm"
                  placeholder="Склад №..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Грузополучатель</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all text-sm"
                  placeholder="Подразделение..."
                />
              </div>
              <div className="space-y-2 pt-2 border-t border-white/5">
                <label className="text-[10px] font-bold text-amber-500/70 uppercase ml-1">Ответственный получатель</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User size={14} />
                  </div>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all text-sm"
                    placeholder="ФИО, звание"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl min-h-[600px]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-amber-400">
                <Package size={20} />
                <h2 className="text-xl font-bold">Спецификация материальных средств</h2>
              </div>
              <button 
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/20 transition-all text-xs font-bold"
              >
                <Plus size={14} /> Добавить строку
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-slate-500 border-b border-white/10">
                    <th className="pb-4 font-bold text-left w-12 text-[10px] uppercase">№</th>
                    <th className="pb-4 font-bold text-left text-[10px] uppercase">Наименование</th>
                    <th className="pb-4 font-bold text-left text-[10px] uppercase">Код</th>
                    <th className="pb-4 font-bold text-left text-[10px] uppercase">Ед.</th>
                    <th className="pb-4 font-bold text-left text-[10px] uppercase">Кат.</th>
                    <th className="pb-4 font-bold text-right text-[10px] uppercase">Выдать</th>
                    <th className="pb-4 font-bold text-right text-[10px] uppercase">Выдано</th>
                    <th className="pb-4 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {formData.items.map((item, index) => (
                    <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 text-slate-500 font-mono text-xs">{index + 1}</td>
                      <td className="py-4 pr-4">
                        <input type="text" className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-700 font-medium" placeholder="Наименование..." />
                      </td>
                      <td className="py-4 pr-4">
                        <input type="text" className="w-full bg-transparent border-none focus:ring-0 text-white font-mono text-xs" placeholder="000" />
                      </td>
                      <td className="py-4 pr-4">
                        <input type="text" className="w-full bg-transparent border-none focus:ring-0 text-white text-xs" placeholder="шт" />
                      </td>
                      <td className="py-4 pr-4">
                        <input type="text" className="w-full bg-transparent border-none focus:ring-0 text-white text-xs" placeholder="1" />
                      </td>
                      <td className="py-4 pr-2">
                        <input type="number" className="w-full bg-transparent border-none focus:ring-0 text-right text-white font-bold" placeholder="0" />
                      </td>
                      <td className="py-4">
                        <input type="number" className="w-full bg-transparent border-none focus:ring-0 text-right text-amber-400 font-black" placeholder="0" />
                      </td>
                      <td className="py-4 pl-4 text-right">
                        <button className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center italic text-slate-500 text-[10px]">сдал</div>
                   <div className="flex-1 space-y-4">
                      <div className="border-b border-white/10 h-8 flex items-end">
                        <span className="text-[10px] text-slate-600">Выдал (сдал) подпись</span>
                      </div>
                      <div className="border-b border-white/10 h-8"></div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center italic text-slate-500 text-[10px]">прин</div>
                   <div className="flex-1 space-y-4">
                      <div className="border-b border-white/10 h-8 flex items-end">
                        <span className="text-[10px] text-slate-600">Получил (принял) подпись</span>
                      </div>
                      <div className="border-b border-white/10 h-8"></div>
                   </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                   <UserCheck size={16} />
                   <h3 className="text-xs font-bold uppercase">Утверждение службы</h3>
                </div>
                <div className="h-10 border-b border-dashed border-white/20"></div>
                <div className="h-10 border-b border-dashed border-white/20"></div>
                <div className="pt-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-dashed border-white/10 flex items-center justify-center text-[10px] text-slate-600 font-bold text-center p-2 uppercase">
                    Мастичная печать
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
