import React from 'react';
import { ADVANTAGES } from '../constants';

const Advantages: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-white scroll-mt-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          {ADVANTAGES.map((item, idx) => (
            <div key={item.id} className="group reveal-on-scroll" style={{ transitionDelay: `${idx * 150}ms` }}>
              <div className="mb-10 w-full aspect-video rounded-[2rem] overflow-hidden relative shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={(item as any).imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                />
                <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-[10px] font-bold text-slate-300 tracking-[0.3em]">0{idx + 1}</span>
                <div className="h-[1px] w-8 bg-slate-100 group-hover:w-12 group-hover:bg-brand-dark transition-all duration-500"></div>
                <h4 className="text-xl font-serif text-brand-dark uppercase tracking-tighter leading-none">{item.title}</h4>
              </div>
              <p className="text-sm text-slate-400 leading-loose font-light pl-14">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;