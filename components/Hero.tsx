
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden pt-20 md:pt-0">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2400" 
          className="w-full h-full object-cover scale-105"
          alt="Интерьер премиум-класса от ThelMebel"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent md:hidden"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl">
          <div className="mb-8 md:mb-12 overflow-hidden">
            <span className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-slate-400 font-bold border-b border-slate-100 pb-4 reveal-on-scroll">
              EST. 2009 • HANDCRAFTED IN RUSSIA
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-[8rem] font-serif text-slate-900 mb-8 md:mb-12 leading-[1.05] md:leading-[0.85] tracking-tight reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
            Мебель <br /> 
            <span className="italic-serif text-slate-400">напрямую</span> <br/>
            с фабрики
          </h1>
          
          <p className="text-base md:text-xl text-slate-500 mb-12 md:mb-16 max-w-lg leading-relaxed font-light reveal-on-scroll" style={{ transitionDelay: '400ms' }}>
            Дизайнерские решения без наценок шоурумов. Мы создаем изделия из массива дерева по индивидуальным размерам уже более 15 лет.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 reveal-on-scroll" style={{ transitionDelay: '600ms' }}>
            <a 
              href="https://wa.me/79000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 text-white px-12 py-6 text-[11px] uppercase tracking-[0.4em] font-bold rounded-2xl shadow-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all duration-700 ease-apple text-center"
            >
              Обсудить проект
            </a>
            <a 
              href="#catalog" 
              className="px-12 py-6 text-[11px] uppercase tracking-[0.4em] font-bold border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all duration-700 ease-apple text-center"
            >
              Смотреть каталог
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
