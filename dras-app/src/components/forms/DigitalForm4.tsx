
'use client';

import React, { useState } from 'react';
import { 
  PackageCheck, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  Truck,
  ShieldCheck,
  AlertCircle,
  FileSearch,
  Scale,
  Users,
  LocateFixed
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DigitalForm4() {
  const [activeStep, setActiveStep] = useState(1);
  const [items, setItems] = useState([
    { id: 1, name: 'Бензин АИ-92', code: '030201', unit: 'кг', category: 'I', docAmount: 15000, actualAmount: 14980, lossNormal: 15, lossExcess: 5, note: 'Испарение при трансп.' }
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Stepper Header */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 shadow-lg shadow-amber-500/10">
            <PackageCheck className="text-amber-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ФОРМА 4: АКТ ПРИЕМА</h1>
            <p className="text-slate-400 text-sm font-medium">Оформление поступления материальных средств от поставщиков</p>
          </div>
        </div>
        
        <div className="flex gap-2">
           {[1, 2, 3].map(step => (
             <button 
               key={step}
               onClick={() => setActiveStep(step)}
               className={`w-10 h-10 rounded-xl font-bold text-xs transition-all border ${
                 activeStep === step 
                 ? 'bg-amber-500 border-amber-400 text-black shadow-lg shadow-amber-500/20' 
                 : 'bg-white/5 border-white/10 text-slate-500 hover:border-amber-500/30'
               }`}
             >
               {step}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-6">
          <AnimatePresence mode="wait">
            {activeStep === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl space-y-8"
              >
                <div className="flex items-center gap-2 text-amber-400">
                   <LocateFixed size={20} />
                   <h2 className="text-lg font-bold uppercase tracking-wider">Общие сведения и Транспорт</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Номер акта</label>
                      <input type="text" className="w-full bg-black/20 border border-white/5 rounded-2xl py-3 px-4 text-white font-mono" placeholder="№ 000" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Начало приема</label>
                      <input type="datetime-local" className="w-full bg-black/20 border border-white/5 rounded-2xl py-3 px-4 text-white text-xs" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Окончание приема</label>
                      <input type="datetime-local" className="w-full bg-black/20 border border-white/5 rounded-2xl py-3 px-4 text-white text-xs" />
                   </div>
                </div>

                <div className="pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 text-slate-400 mb-2">
                         <Truck size={16} />
                         <span className="text-xs font-bold uppercase">Транспортное средство</span>
                      </div>
                      <input type="text" placeholder="Вид транспорта (Ж/Д, Авто...)" className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" />
                      <input type="text" placeholder="Номер вагона/цистерны/авто" className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" />
                      <input type="text" placeholder="Состояние пломб" className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" />
                   </div>
                   
                   <div className="space-y-4 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 text-slate-400 mb-2">
                         <FileSearch size={16} />
                         <span className="text-xs font-bold uppercase">Сопроводительные док.</span>
                      </div>
                      <input type="text" placeholder="Накладная (№ и дата)" className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" />
                      <input type="text" placeholder="Паспорт качества" className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" />
                      <input type="text" placeholder="Коммерческий акт (если есть)" className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" />
                   </div>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl space-y-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Scale size={20} />
                    <h2 className="text-xl font-bold">Количественная приемка</h2>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl text-xs font-bold border border-amber-500/20">
                    <Plus size={14} /> Добавить строку
                  </button>
                </div>

                <div className="overflow-x-auto">
                   <table className="w-full text-sm border-collapse">
                      <thead>
                         <tr className="text-slate-500 border-b border-white/10">
                            <th className="pb-4 font-bold text-left text-[10px] uppercase">Наименование</th>
                            <th className="pb-4 font-bold text-right text-[10px] uppercase">По док-там</th>
                            <th className="pb-4 font-bold text-right text-[10px] uppercase">Фактически</th>
                            <th className="pb-4 font-bold text-right text-[10px] uppercase text-rose-400">Недостача</th>
                            <th className="pb-4 font-bold text-right text-[10px] uppercase text-emerald-400">Излишек</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {items.map(item => (
                            <tr key={item.id} className="group hover:bg-white/[0.01]">
                               <td className="py-4 font-medium text-white">
                                  <div className="flex flex-col">
                                     <span>{item.name}</span>
                                     <span className="text-[10px] text-slate-600 font-mono">{item.code} • {item.unit}</span>
                                  </div>
                               </td>
                               <td className="py-4 text-right text-slate-300 font-mono">{item.docAmount}</td>
                               <td className="py-4 text-right text-white font-bold font-mono">{item.actualAmount}</td>
                               <td className="py-4 text-right text-rose-400 font-black font-mono">
                                  {item.docAmount > item.actualAmount ? item.docAmount - item.actualAmount : '-'}
                               </td>
                               <td className="py-4 text-right text-emerald-400 font-black font-mono">
                                  {item.actualAmount > item.docAmount ? item.actualAmount - item.docAmount : '-'}
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>

                <div className="p-6 bg-rose-500/5 rounded-2xl border border-rose-500/10 space-y-4">
                   <div className="flex items-center gap-2 text-rose-400">
                      <AlertCircle size={16} />
                      <span className="text-xs font-bold uppercase">Расшифровка недостачи</span>
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                         <label className="text-[10px] text-slate-500 block mb-1">В пределах норм естественной убыли</label>
                         <input type="number" className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-white font-mono text-sm" placeholder="0.00" />
                      </div>
                      <div>
                         <label className="text-[10px] text-slate-500 block mb-1">СВЕРХ НОРМ (Претензия)</label>
                         <input type="number" className="w-full bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-rose-400 font-black text-sm" placeholder="0.00" />
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl space-y-8"
              >
                <div className="flex items-center gap-2 text-amber-400">
                   <Users size={20} />
                   <h2 className="text-xl font-bold uppercase tracking-wider">Комиссия и Подписи</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <div className="space-y-4">
                         <h3 className="text-[10px] font-bold text-slate-500 uppercase">Члены комиссии</h3>
                         <div className="space-y-3">
                            <div className="flex gap-2">
                               <input type="text" placeholder="Звание, ФИО" className="flex-1 bg-white/5 border border-white/5 rounded-xl p-3 text-xs text-white" />
                               <button className="p-3 bg-rose-500/10 text-rose-400 rounded-xl"><Trash2 size={14} /></button>
                            </div>
                            <button className="w-full py-2 border-2 border-dashed border-white/5 rounded-xl text-[10px] text-slate-600 hover:border-amber-500/30 hover:text-amber-500 transition-all font-bold uppercase">+ Добавить члена</button>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-4">
                         <h3 className="text-[10px] font-bold text-slate-500 uppercase">Представитель поставщика</h3>
                         <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6 space-y-4">
                            <input type="text" placeholder="ФИО представителя" className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" />
                            <input type="text" placeholder="Документ (№ доверенности)" className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                   <label className="text-[10px] font-bold text-slate-500 uppercase block mb-4">Заключение комиссии (Раздел VI)</label>
                   <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-amber-500/50 min-h-[150px]" placeholder="Причины расхождения, состояние тары, условия транспортировки..."></textarea>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Action Bar */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
              <div className="flex items-center gap-2 text-amber-400 mb-6">
                 <ShieldCheck size={18} />
                 <h2 className="text-xs font-bold uppercase tracking-widest">Статус Акта</h2>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Заполнение</span>
                    <span className="text-amber-400 font-bold">В ПРОЦЕССЕ</span>
                 </div>
                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                 </div>
                 <div className="pt-4 space-y-2">
                    <button className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black rounded-2xl font-bold text-xs shadow-lg shadow-amber-500/10 transition-all">
                       ОТПРАВИТЬ НА ПОДПИСЬ
                    </button>
                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 rounded-2xl font-bold text-xs transition-all">
                       ПЕЧАТЬ ЧЕРНОВИКА
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6 rounded-3xl backdrop-blur-xl">
              <h3 className="text-[10px] font-bold text-amber-500/70 uppercase mb-3">Приложения</h3>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-[10px] text-slate-400 p-2 bg-black/20 rounded-xl border border-white/5 cursor-pointer hover:bg-black/40 transition-all">
                    <span>📄 Транспортная накл.</span>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] text-slate-400 p-2 bg-black/20 rounded-xl border border-white/5 cursor-pointer hover:bg-black/40 transition-all">
                    <span>📄 Сертификат соотв.</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
