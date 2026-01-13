import React from 'react';
import { PROCESS_STEPS } from '../constants';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-32 bg-white border-t border-slate-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <h2 className="text-[10px] uppercase tracking-[0.6em] text-slate-400 mb-6 font-bold">ПРОЦЕСС СОЗДАНИЯ</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">
            От идеи <span className="italic-serif text-slate-500">до воплощения</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} className="group flex flex-col items-start reveal-on-scroll">
              <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-xl transition-all duration-700">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
              </div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-900 mb-4">{step.title}</h4>
              <p className="text-[12px] text-slate-400 leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-32 p-12 md:p-16 rounded-[3rem] bg-slate-50 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="text-center md:text-left">
             <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-300 block mb-2">Since 2009</span>
             <p className="text-2xl font-serif italic text-slate-900">ThelMebel Workshop</p>
           </div>
           
           <div className="flex flex-wrap justify-center gap-x-16 gap-y-10">
             <div className="text-center">
               <p className="text-3xl font-serif text-slate-900 leading-none mb-2">14 дней</p>
               <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Срок исполнения</p>
             </div>
             <div className="text-center">
               <p className="text-3xl font-serif text-slate-900 leading-none mb-2">18 мес</p>
               <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Гарантия качества</p>
             </div>
             <div className="text-center">
               <p className="text-3xl font-serif text-slate-900 leading-none mb-2">3000+</p>
               <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Вариантов тканей</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Process;