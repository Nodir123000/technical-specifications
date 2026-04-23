
'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, User, Bot, X } from 'lucide-react';

export default function AuraExpert() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Приветствую! Я Aura, ваш эксперт по Приказу №260. Какой раздел или форма вас интересует?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user', content: input };
    setMessages([...messages, newMsg]);
    setInput('');
    
    // Simulate thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Согласно статье 157 Части I, учет в данном случае ведется по Форме 6. Рекомендую проверить наличие инвентарного номера.' 
      }]);
    }, 1000);
  };

  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)}
      className="fixed bottom-8 right-8 w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/40 hover:scale-110 transition-all active:scale-95 group z-50"
    >
      <Sparkles className="text-black group-hover:rotate-12 transition-transform" />
    </button>
  );

  return (
    <div className="fixed bottom-8 right-8 w-[400px] h-[550px] bg-[#0a1120] border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 backdrop-blur-2xl animate-in slide-in-from-bottom-10 duration-300">
      {/* Header */}
      <div className="p-4 bg-cyan-500/10 border-b border-cyan-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
            <Bot size={24} className="text-black" />
          </div>
          <div>
            <div className="font-bold text-sm">Aura AI Expert</div>
            <div className="flex items-center gap-1 text-[10px] text-cyan-400 uppercase font-bold">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" /> Legendary Level
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/5">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-blue-500/20' : 'bg-cyan-500/20'}`}>
              {m.role === 'user' ? <User size={16} className="text-blue-400" /> : <Bot size={16} className="text-cyan-400" />}
            </div>
            <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${m.role === 'user' ? 'bg-blue-500/10 text-blue-100 rounded-tr-none' : 'bg-white/5 text-slate-200 rounded-tl-none'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Спросите Aura..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-cyan-500/50 transition-colors"
        />
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-black hover:bg-cyan-400 transition-all active:scale-95"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
