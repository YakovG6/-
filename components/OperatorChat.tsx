
import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';

const VISITOR_ID_KEY = 'thelmebel_visitor_id';

const OperatorChat: React.FC = () => {
  const { chats, sendChatMessage } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [visitorId, setVisitorId] = useState('');
  const [isCooldown, setIsCooldown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = 'v_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    setVisitorId(id);
  }, []);

  const currentChat = chats.find(c => c.id === visitorId);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [currentChat?.messages, isOpen]);

  const handleSend = () => {
    if (!input.trim() || isCooldown) return;
    
    const success = sendChatMessage(visitorId, input, 'user');
    if (success) {
      setInput('');
    } else {
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 2000);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 sm:bottom-28 sm:right-8 z-50 bg-slate-900 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all group"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <div className="relative">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            {!currentChat?.isRead && currentChat?.messages.some(m => m.role === 'admin') && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-8 w-auto sm:w-[380px] h-[550px] bg-white z-[60] shadow-2xl rounded-[2.5rem] flex flex-col overflow-hidden animate-chatIn border border-slate-100">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold">M</div>
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-900 leading-none">ThelMebel Chat</h4>
              <p className="text-[8px] uppercase tracking-widest text-green-500 mt-1 font-bold">Оператор онлайн</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {(!currentChat || currentChat.messages.length === 0) ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  Здравствуйте! Напишите ваш вопрос, и наш менеджер ответит вам здесь в ближайшее время.
                </p>
              </div>
            ) : (
              currentChat.messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 text-[12px] rounded-2xl ${
                    m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-slate-100 text-slate-600 rounded-tl-none'
                  }`}>
                    {m.text}
                    <div className={`text-[8px] mt-1 opacity-50 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isCooldown && <div className="text-center text-[8px] text-red-400 uppercase tracking-widest animate-pulse">Пожалуйста, не спамьте</div>}
          </div>

          <div className="p-6 bg-white border-t border-slate-50 flex gap-2">
            <input 
              className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-xs outline-none focus:ring-1 ring-slate-200"
              placeholder={isCooldown ? "Подождите..." : "Введите сообщение..."}
              value={input}
              disabled={isCooldown}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              disabled={isCooldown}
              onClick={handleSend} 
              className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center disabled:opacity-30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes chatIn { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-chatIn { animation: chatIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      ` }} />
    </>
  );
};

export default OperatorChat;
