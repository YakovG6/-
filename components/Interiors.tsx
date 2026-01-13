
import React, { useState } from 'react';
import { INTERIORS } from '../constants';

const Interiors: React.FC = () => {
  const [activeImg, setActiveImg] = useState<string | null>(null);

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-slate-400 mb-6 font-bold">Inspiration</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-slate-900">
              ThelMebel <span className="italic-serif">в интерьерах</span>
            </h3>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hidden md:block text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-1 hover:text-apple-blue hover:border-apple-blue transition-all">Наш Instagram</a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {INTERIORS.map((img, i) => (
            <div 
              key={i} 
              className="group aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50 reveal-on-scroll cursor-zoom-in relative" 
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setActiveImg(img.url)}
            >
              <img 
                src={img.url} 
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                 </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a 
            href="https://instagram.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-4 bg-white border border-slate-200 px-10 py-6 rounded-3xl hover:bg-slate-900 hover:text-white transition-all duration-700 shadow-lg hover:shadow-2xl"
          >
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold">Больше вдохновения в Instagram</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {activeImg && (
        <div 
          className="fixed inset-0 z-[300] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActiveImg(null)}
        >
          <button className="absolute top-10 right-10 text-white hover:scale-110 transition-transform z-10" aria-label="Закрыть">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img 
            src={activeImg} 
            className="max-w-full max-h-full rounded-2xl shadow-2xl animate-scaleUp" 
            alt="Увеличенное фото интерьера"
          />
        </div>
      )}
    </section>
  );
};

export default Interiors;
