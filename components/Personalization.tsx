import React from 'react';

const Personalization: React.FC = () => {
  return (
    <section id="personalization" className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-[10px] uppercase tracking-[0.6em] text-slate-400 mb-6 font-bold">Customization</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-slate-900 mb-8 leading-tight">
            Сделайте её <span className="italic-serif">уникальной</span>
          </h3>
          <p className="text-slate-400 font-light">
            Мы предлагаем бесконечные возможности для кастомизации вашего изделия.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="group bg-[#fcfcfc] p-12 rounded-[3rem] border border-slate-50 hover:shadow-2xl transition-all duration-700">
            <div className="mb-10 aspect-video rounded-2xl overflow-hidden">
               <img src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" alt="Fabrics" />
            </div>
            <h4 className="text-2xl font-serif mb-4">Выбор ткани</h4>
            <p className="text-sm text-slate-400 font-light leading-loose mb-8">
              Более 3000 вариантов: от износостойкого микровелюра до натурального льна. Поможем подобрать плотность под ваши задачи.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="w-8 h-8 rounded-full bg-[#E5D3B3] border border-black/5"></span>
              <span className="w-8 h-8 rounded-full bg-[#4A5D4E] border border-black/5"></span>
              <span className="w-8 h-8 rounded-full bg-[#3D3D3D] border border-black/5"></span>
              <span className="w-8 h-8 rounded-full bg-[#7D5A5A] border border-black/5"></span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 flex items-center font-bold">+ еще 3000</span>
            </div>
          </div>

          <div className="group bg-[#fcfcfc] p-12 rounded-[3rem] border border-slate-50 hover:shadow-2xl transition-all duration-700">
            <div className="mb-10 aspect-video rounded-2xl overflow-hidden">
               <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" alt="Leg colors" />
            </div>
            <h4 className="text-2xl font-serif mb-4">Цвет ножек</h4>
            <p className="text-sm text-slate-400 font-light leading-loose mb-8">
              Выбирайте из различных оттенков дерева или покраску по каталогу RAL. Массив дуба или бука на ваш выбор.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="w-12 h-6 rounded bg-[#2C1B10] border border-black/5"></div>
              <div className="w-12 h-6 rounded bg-[#5D4037] border border-black/5"></div>
              <div className="w-12 h-6 rounded bg-[#A1887F] border border-black/5"></div>
              <div className="w-12 h-6 rounded bg-[#1A1A1A] border border-black/5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personalization;