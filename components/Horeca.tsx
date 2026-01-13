import React from 'react';
import { HORECA_FEATURES } from '../constants';

const Horeca: React.FC = () => {
  return (
    <section id="horeca" className="py-20 md:py-32 bg-[#121212] text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <span className="text-apple-blue text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] mb-4 md:mb-6 block">Business & HoReCa</span>
            <h2 className="text-3xl md:text-6xl font-serif mb-6 md:mb-10 leading-tight">
              Мебель для <span className="italic-serif text-slate-500">ресторанов и отелей</span>
            </h2>
            <p className="text-slate-400 mb-10 md:mb-12 leading-relaxed font-light text-sm md:text-lg">
              Мы специализируемся на производстве мебели для бизнеса. Понимаем специфику эксплуатации и предоставляем лучшие условия как прямой производитель.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-10">
              {HORECA_FEATURES.map((item, i) => (
                <div key={i} className="border-l border-white/10 pl-5 md:pl-6">
                  <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-2 md:mb-3">{item.title}</h4>
                  <p className="text-slate-500 text-[11px] md:text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <a href="#contact" className="mt-12 md:mt-16 inline-block bg-white text-slate-900 px-10 md:px-12 py-4 md:py-5 text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold rounded-xl md:rounded-2xl hover:bg-slate-200 transition-all w-full md:w-auto text-center shadow-lg">
              Получить КП для бизнеса
            </a>
          </div>
          
          <div className="lg:w-1/2 relative order-1 lg:order-2 w-full">
             <div className="aspect-[16/10] sm:aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative z-10 shadow-2xl">
               <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Horeca project" />
             </div>
             <div className="absolute -bottom-10 -right-10 w-48 md:w-64 h-48 md:h-64 bg-apple-blue/20 blur-[60px] md:blur-[100px] rounded-full"></div>
             <div className="absolute top-1/2 -left-10 w-24 md:w-40 h-24 md:h-40 bg-white/5 blur-[40px] md:blur-[60px] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Horeca;