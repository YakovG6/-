
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useData } from '../context/DataContext';

const SUGGESTED_PROMPTS = [
  'Какие у вас бестселлеры?',
  'Как заказать индивидуально?',
  'Сроки изготовления?',
  'Гарантия на изделия'
];

const AIChat: React.FC = () => {
  const { products, materials } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Рад приветствовать вас в ThelMebel. Я помогу подобрать идеальную мебель или отвечу на вопросы о производстве. Что вас интересует?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (msg?: string) => {
    const textToSend = (msg || input).trim();
    if (!textToSend || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);

    try {
      // Правильная инициализация согласно SDK
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const productContext = products.map(p => `- ${p.name}: ${p.price}`).join('\n');
      const materialContext = materials.map(m => `- ${m.name}: ${m.desc}`).join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: textToSend }] }],
        config: {
          systemInstruction: `Вы — премиальный ИИ-консьерж мебельной фабрики ThelMebel.
          Ваш стиль: Apple-like (лаконичный, профессиональный, дорогой). 
          
          ИНФОРМАЦИЯ О НАС:
          - Работаем с 2009 года.
          - Прямое производство (цены ниже на 30%).
          - Материалы: массив бука, дуба, премиальный велюр.
          - Срок: от 14 рабочих дней.
          
          КАТАЛОГ:
          ${productContext}
          
          МАТЕРИАЛЫ:
          ${materialContext}

          ПРАВИЛА:
          1. Отвечайте коротко (1-2 предложения).
          2. Если клиент хочет купить, направляйте в WhatsApp.
          3. Акцентируйте внимание на качестве и ручной работе.`,
        },
      });

      // Доступ через свойство .text
      const aiResponse = response.text || 'Я готов обсудить ваш проект. Что именно вы ищете?';
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Простите, небольшая техническая пауза. Вы можете связаться с нами напрямую через WhatsApp.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 sm:bottom-28 sm:right-8 z-50 bg-white border border-slate-100 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        aria-label="ИИ Консультант"
      >
        <svg className="w-7 h-7 group-hover:rotate-6 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-8 w-auto sm:w-[420px] h-[600px] bg-white z-[60] shadow-2xl rounded-[2.5rem] flex flex-col overflow-hidden animate-chatIn border border-slate-50">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-900">THE LM CONCIERGE</h4>
              <p className="text-[8px] uppercase tracking-widest text-green-500 mt-1 font-bold">● Intelligent Service</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-slate-900 transition-colors p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeWidth={1.5} /></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 text-[13px] rounded-[1.5rem] leading-relaxed ${m.role === 'user' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            
            {!isLoading && messages.length < 5 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {SUGGESTED_PROMPTS.map((p, i) => (
                  <button key={i} onClick={() => handleSend(p)} className="text-[9px] text-slate-400 border border-slate-100 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all font-bold uppercase tracking-tight">
                    {p}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-50 px-6 py-4 rounded-2xl animate-pulse text-[10px] uppercase tracking-widest text-slate-300 font-bold">Подбираю решение...</div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-50 flex gap-4">
            <input 
              className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-xs outline-none focus:ring-1 ring-slate-200"
              placeholder="Введите ваш вопрос..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={() => handleSend()} className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeWidth={2} /></svg>
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes chatIn { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-chatIn { animation: chatIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      ` }} />
    </>
  );
};

export default AIChat;
