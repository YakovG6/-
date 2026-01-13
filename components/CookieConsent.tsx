
import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent-v2');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent-v2', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 flex justify-center pointer-events-none animate-slideUpBanner">
      <div className="bg-[#121212] text-white p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 max-w-5xl w-full pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-3 text-slate-400">Конфиденциальность и файлы cookie</h4>
          <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed font-light max-w-2xl">
            Мы используем современные технологии, включая файлы cookie, чтобы сделать ваш опыт на сайте ThelMebel максимально комфортным. Оставаясь на сайте, вы соглашаетесь с нашей <a href="#" className="underline hover:text-white transition-colors">Политикой конфиденциальности</a>. Данный сайт является визуальной витриной мастерской.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
          <button 
            onClick={handleAccept}
            className="bg-white text-[#121212] px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-slate-200 transition-all rounded-xl"
          >
            Принять
          </button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUpBanner {
          from { opacity: 0; transform: translateY(100px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUpBanner { animation: slideUpBanner 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
      ` }} />
    </div>
  );
};

export default CookieConsent;
