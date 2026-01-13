
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { PRODUCTS } from './constants';

const SUGGESTED_PROMPTS = [
  'Какие у вас бестселлеры?',
  'Как сделать заказ?',
  'Покажите модели кресел',
  'Есть ли у вас гарантия?',
  'Какие сроки изготовления?'
];

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Добро пожаловать в ThelMebel. Я помогу вам сориентироваться в наших коллекциях или рассчитать примерную стоимость.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (customMessage?: string) => {
    const messageToSend = (customMessage || input).trim();
    if (!messageToSend || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setIsLoading(true);

    try {
      // Fix: Create GoogleGenAI instance with direct process.env.API_KEY reference
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Fix: Removed non-existent 'description' property from PRODUCTS mapping
      const productContext = PRODUCTS.map(p => `- ${p.name}. Цена: ${p.price}`).join('\n');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: messageToSend }] }],
        config: {
          systemInstruction: `Вы — экспертный консультант ThelMebel. 
          Стиль: премиальный, лаконичный, вежливый. 
          Ваши товары:
          ${productContext}
          
          Инструкции:
          1. Отвечайте коротко (не более 3 предложений).
          2. Если клиент готов к заказу, предложите оставить номер в форме или написать в WhatsApp.
          3. Вы помощник витрины, продаж напрямую через чат нет.`,
          temperature: 0.6,
        },
      });

      const aiText = response.text || 'Прошу прощения, возникла заминка. Повторите ваш вопрос?';
      setMessages(prev => [...prev, { role: 'ai', text: String(aiText) }]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Сервис временно недоступен. Свяжитесь с нами по телефону.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 sm:bottom-28 sm:right-8 z-50 bg-white text-apple-black w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-slate-100 group"
        aria-label="Toggle AI Assistant"
      >
        <svg className="w-6 h-6 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 left-4 sm:left-auto sm:right-8 sm:bottom-32 w-auto sm:w-[380px] h-[75vh] sm:h-[600px] max-h-[650px] bg-white z-[60] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col animate-chatIn overflow-hidden rounded-3xl">
          <div className="p-5 sm:p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-slate-900">ThelMebel Assistant</h4>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">Online Support</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-slate-900 transition-colors p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 bg-white">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 sm:p-4 text-[12px] leading-relaxed rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-600 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {!isLoading && messages.length < 5 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="text-[10px] text-slate-500 border border-slate-100 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors text-left font-medium uppercase tracking-tighter"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-100 animate-pulse text-[10px] text-slate-400 uppercase tracking-widest">
                   Печатает...
                 </div>
               </div>
            )}
          </div>

          <div className="p-4 sm:p-5 bg-white border-t border-slate-50">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ваш вопрос..."
                className="flex-1 bg-slate-50 border-none px-4 py-3 rounded-xl text-xs outline-none focus:ring-1 focus:ring-slate-200 transition-all"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="p-3 text-slate-900 hover:opacity-50 transition-opacity disabled:opacity-20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(15px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-chatIn { animation: chatIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      ` }} />
    </>
  );
};

export default AIChat;
