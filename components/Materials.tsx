
import React from 'react';
import { MATERIALS } from '../constants';

const Materials: React.FC = () => {
  return (
    <section className="py-32 bg-[#fafafa]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-xl mb-24">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-slate-400 mb-6 font-bold">Soul of Object</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
            Материалы, <br/><span className="italic-serif text-slate-400">которые мы любим</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {MATERIALS.map((mat, idx) => (
            <div key={mat.id} className="relative group overflow-hidden rounded-3xl h-[400px] bg-white border border-slate-100 reveal-on-scroll" style={{ transitionDelay: `${idx * 200}ms` }}>
              <img 
                src={mat.img} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                alt={mat.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <h4 className="text-white text-2xl font-serif mb-2">{mat.name}</h4>
                <p className="text-white/60 text-xs font-light tracking-wide leading-relaxed">
                  {mat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Materials;
