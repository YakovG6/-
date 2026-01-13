
import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const ProductModal: React.FC<{ item: any; onClose: () => void }> = ({ item, onClose }) => {
  const { materials } = useData();
  const [activeImg, setActiveImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8 animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className={`relative bg-white w-full max-w-6xl rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[90vh] animate-slideUp transition-all duration-700 ${isZoomed ? 'scale-[1.02]' : ''}`}>
        <button 
          onClick={onClose} 
          className="absolute top-10 right-10 z-30 w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-110 transition-all shadow-xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={1.5} /></svg>
        </button>

        <div className="md:w-3/5 bg-slate-50 relative overflow-hidden h-[45vh] md:h-auto group/img">
          <img 
            src={item.images[activeImg]} 
            alt={item.alt || item.name}
            className={`w-full h-full object-cover transition-transform duration-1000 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-105 cursor-zoom-in'}`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
          <div className="absolute bottom-10 left-10 flex space-x-4 z-20">
            {item.images.map((img: string, i: number) => (
              <button 
                key={i} 
                onClick={() => { setActiveImg(i); setIsZoomed(false); }}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 shadow-lg ${activeImg === i ? 'border-slate-900 scale-110' : 'border-transparent opacity-60'}`}
              >
                <img src={img} alt="Вид изделия" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-2/5 p-12 md:p-20 overflow-y-auto bg-white flex flex-col">
          <div className="mb-auto">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-6 block">Premium Atelier Collection</span>
            <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 leading-tight">{item.name}</h2>
            <p className="text-2xl font-serif text-slate-400 mb-12 italic">{item.price}</p>
            
            <div className="space-y-12">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-900 mb-8">Материалы и отделка</h4>
                <div className="grid grid-cols-4 gap-6">
                  {materials.map(m => (
                    <div key={m.id} className="flex flex-col items-center group cursor-help" title={m.desc}>
                      <div className="w-14 h-14 rounded-full overflow-hidden mb-3 border border-slate-100 group-hover:scale-110 transition-all shadow-sm">
                        <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[8px] uppercase tracking-widest text-slate-400 text-center font-bold">{m.name.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-slate-50 p-10 rounded-[2.5rem]">
            <p className="text-xs text-slate-500 leading-relaxed font-light mb-10">
              Каждое изделие — это ручная работа. Мы подберем для вас идеальную фактуру ткани из нашей библиотеки материалов.
            </p>
            <a 
              href={`https://wa.me/79000000000?text=Интересует модель: ${item.name}`}
              target="_blank"
              className="block w-full bg-slate-900 text-white py-6 rounded-2xl text-[10px] uppercase tracking-[0.4em] font-bold text-center hover:bg-slate-800 transition-all shadow-2xl"
            >
              Связаться с мастером
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ item: any; onClick: () => void }> = ({ item, onClick }) => (
  <div onClick={onClick} className="group flex flex-col min-w-[300px] md:min-w-[420px] cursor-pointer snap-start">
    <div className="aspect-[4/5] bg-slate-50 rounded-[3rem] overflow-hidden mb-8 relative transition-all duration-1000 group-hover:shadow-2xl">
      <img 
        src={item.images[0]} 
        alt={item.name}
        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-[2px]">
        <div className="bg-white px-8 py-4 rounded-full text-slate-900 text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl scale-90 group-hover:scale-100 transition-all">
           Детали модели
        </div>
      </div>
    </div>
    <div className="px-6 flex justify-between items-end">
      <div>
        <h5 className="text-2xl font-serif text-slate-900 mb-1">{item.name}</h5>
        <p className="text-sm font-serif text-slate-400 italic">{item.price}</p>
      </div>
      <span className="text-[10px] text-slate-200 uppercase tracking-widest font-bold mb-1">Explore</span>
    </div>
  </div>
);

const Catalog: React.FC = () => {
  const { products, categories } = useData();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <section id="catalog" className="py-40 bg-white">
      <div className="container mx-auto px-6 text-center mb-40">
        <h2 className="text-[11px] uppercase tracking-[0.7em] text-slate-300 mb-8 font-bold">THE ATELIER COLLECTION</h2>
        <h3 className="text-6xl md:text-8xl font-serif text-slate-900 leading-tight">
          Искусство <br/><span className="italic-serif text-slate-400">вашего комфорта</span>
        </h3>
      </div>

      <div className="space-y-60">
        {categories.map((cat) => {
          const catProducts = products.filter(p => p.category === cat.id);
          if (catProducts.length === 0) return null;
          return (
            <div key={cat.id} id={`cat-${cat.id}`} className="relative">
              <div className="container mx-auto px-6 mb-16 flex items-end justify-between border-b border-slate-50 pb-12">
                <h4 className="text-4xl md:text-6xl font-serif">{cat.name}</h4>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">Handmade Units: {catProducts.length}</span>
                </div>
              </div>
              <div className="flex overflow-x-auto space-x-12 px-6 md:px-[calc(50vw-600px)] pb-20 scrollbar-hide snap-x scroll-smooth">
                {catProducts.map((p) => (
                  <ProductCard key={p.id} item={p} onClick={() => setSelectedProduct(p)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedProduct && <ProductModal item={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  );
};

export default Catalog;
