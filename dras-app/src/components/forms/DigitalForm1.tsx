
'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  Info,
  Package,
  Truck,
  Building,
  Calendar,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DigitalForm1() {
  const [formData, setFormData] = useState({
    docNumber: '',
    docDate: new Date().toISOString().split('T')[0],
    validUntil: '',
    operationPurpose: '',
    service: '',
    sender: '',
    items: [
      { id: 1, name: '', code: '', unit: '', category: '', total: 0 }
    ],
    recipients: [
      { id: 1, code: '', station: '', address: '', transport: '', deadline: '' }
    ],
    distribution: {} // { itemId_recipientId: amount }
  });

  const addItem = () => {
    const newId = formData.items.length + 1;
    setFormData({
      ...formData,
      items: [...formData.items, { id: newId, name: '', code: '', unit: '', category: '', total: 0 }]
    });
  };

  const addRecipient = () => {
    const newId = formData.recipients.length + 1;
    setFormData({
      ...formData,
      recipients: [...formData.recipients, { id: newId, code: '', station: '', address: '', transport: '', deadline: '' }]
    });
  };

  const updateDistribution = (itemId: number | string, recipientId: number | string, amount: string) => {
    setFormData({
      ...formData,
      distribution: {
        ...formData.distribution,
        [`${itemId}_${recipientId}`]: parseFloat(amount) || 0
      }
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <FileText className="text-cyan-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ФОРМА 1: РАЗНАРЯДКА</h1>
            <p className="text-slate-400 text-sm font-medium">Распоряжение на отпуск материальных средств нескольким получателям</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-semibold text-sm">
            <Printer size={18} /> Печать
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl transition-all font-bold text-sm shadow-lg shadow-cyan-500/20">
            <Save size={18} /> Сохранить
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Info size={18} />
              <h2 className="text-lg font-bold uppercase tracking-wider">Реквизиты документа</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Номер разнарядки</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                    <span className="font-bold text-xs">№</span>
                  </div>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-mono"
                    placeholder="000-Р"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Дата документа</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                    <Calendar size={16} />
                  </div>
                  <input 
                    type="date" 
                    defaultValue={formData.docDate}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Действительна до</label>
                <input 
                  type="date" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Служба (Орган управления)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                    <Building size={16} />
                  </div>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                    placeholder="Напр. Вещевая служба"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Основание (цель) операции</label>
              <textarea 
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                placeholder="Укажите цель распределения материальных средств..."
              />
            </div>
          </div>

          {/* Table of Items */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-cyan-400">
                <Package size={18} />
                <h2 className="text-lg font-bold uppercase tracking-wider">Материальные средства</h2>
              </div>
              <button 
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/20 transition-all text-xs font-bold"
              >
                <Plus size={14} /> Добавить позицию
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-500 border-b border-white/5 italic">
                    <th className="pb-4 font-medium text-left">Наименование</th>
                    <th className="pb-4 font-medium text-left">Код</th>
                    <th className="pb-4 font-medium text-left">Ед. изм.</th>
                    <th className="pb-4 font-medium text-left">Кат/Сорт</th>
                    <th className="pb-4 font-medium text-right">Всего</th>
                    <th className="pb-4 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {formData.items.map((item) => (
                    <tr key={item.id} className="group">
                      <td className="py-4 pr-4">
                        <input type="text" className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-600" placeholder="Средство..." />
                      </td>
                      <td className="py-4 pr-4">
                        <input type="text" className="w-full bg-transparent border-none focus:ring-0 text-white font-mono" placeholder="0000" />
                      </td>
                      <td className="py-4 pr-4">
                        <input type="text" className="w-full bg-transparent border-none focus:ring-0 text-white" placeholder="шт." />
                      </td>
                      <td className="py-4 pr-4">
                        <input type="text" className="w-full bg-transparent border-none focus:ring-0 text-white" placeholder="1" />
                      </td>
                      <td className="py-4">
                        <input type="number" className="w-full bg-transparent border-none focus:ring-0 text-right text-white font-bold" placeholder="0" />
                      </td>
                      <td className="py-4 pl-4 text-right">
                        <button className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recipients List */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-cyan-400">
                <Truck size={18} />
                <h2 className="text-lg font-bold uppercase tracking-wider">Грузополучатели</h2>
              </div>
              <button 
                onClick={addRecipient}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
              >
                <Plus size={16} className="text-cyan-400" />
              </button>
            </div>

            <div className="space-y-4">
              {formData.recipients.map((recipient) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={recipient.id} 
                  className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400">
                        {recipient.id}
                      </div>
                      <input 
                        type="text" 
                        placeholder="Код получателя"
                        className="bg-transparent border-none focus:ring-0 text-sm font-bold text-white placeholder-slate-600 w-32 font-mono"
                      />
                    </div>
                    <button className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Станция назначения"
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-2 px-3 text-xs text-white"
                    />
                    <input 
                      type="text" 
                      placeholder="Почтовый адрес"
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-2 px-3 text-xs text-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <select className="bg-white/5 border border-white/5 rounded-xl py-2 px-3 text-xs text-slate-400 focus:text-white">
                        <option>Ж/Д</option>
                        <option>Авто</option>
                        <option>Авиа</option>
                      </select>
                      <input 
                        type="date" 
                        className="bg-white/5 border border-white/5 rounded-xl py-2 px-3 text-xs text-white"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-2 text-cyan-400 mb-8">
          <UserCheck size={18} />
          <h2 className="text-lg font-bold uppercase tracking-wider">Подписи ответственных лиц</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Руководитель органа управления</label>
              <div className="flex items-end justify-between gap-4">
                <span className="text-slate-400 text-sm">Должность, звание</span>
                <div className="flex-1 border-b border-dashed border-white/20 h-6"></div>
              </div>
            </div>
            <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
              <span className="text-slate-400 text-sm italic">Подпись, фамилия</span>
              <div className="flex-1 border-b border-dashed border-white/20 h-6"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Лицо, ведущее учет</label>
              <div className="flex items-end justify-between gap-4">
                <span className="text-slate-400 text-sm">Должность, звание</span>
                <div className="flex-1 border-b border-dashed border-white/20 h-6"></div>
              </div>
            </div>
            <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
              <span className="text-slate-400 text-sm italic">Подпись, фамилия</span>
              <div className="flex-1 border-b border-dashed border-white/20 h-6"></div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="px-8 py-4 border-2 border-dashed border-white/10 rounded-2xl text-slate-500 text-xs font-mono">
            МЕСТО ДЛЯ ПЕЧАТИ (М.П.)
          </div>
        </div>
      </div>
    </div>
  );
}
