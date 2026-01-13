import React from 'react';
import { useData } from '../context/DataContext';

const Categories: React.FC = () => {
  const { categories } = useData();

  return (
    <section id="categories" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 reveal-on-scroll">
           <h2 className="text-[10px] uppercase tracking-[0.6em] text-slate-400 mb-4 font-bold">SELECT CATEGORY</h2>
           <p className="text-slate-900 font-serif italic text-2xl">Выберите интересующий раздел</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, idx) => (
            <a 
              key={cat.id} 
              href={`#cat-${cat.id}`}
              className="group relative aspect-[4/5] overflow-hidden cursor-pointer rounded-2xl bg-slate-50 reveal-on-scroll"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <img 
                src={cat.imageUrl} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={cat.alt || cat.name} 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-white text-[10px] uppercase tracking-[0.4em] font-bold block mb-1 opacity-60">Collect</span>
                <span className="text-white text-xs md:text-sm font-serif tracking-tight leading-tight">{cat.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
