
import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const LeadForm: React.FC = () => {
  const { addLead } = useData();
  const [phone, setPhone] = useState('');
  const [botField, setBotField] = useState(''); // Скрытое поле для ботов
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setIsSubmitting(true);
    
    // Передаем значение botField. Если оно заполнено — это бот.
    const success = addLead({ phone }, botField);

    setTimeout(() => {
      if (success) {
        setIsSuccess(true);
        setPhone('');
      } else if (!botField) {
        alert("Пожалуйста, подождите немного перед следующей отправкой.");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-[#121212] rounded-[4rem] overflow-hidden shadow-2xl">
          <div className="md:w-1/2 p-12 md:p-24 text-white">
            <h3 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Ваш уют <br/><span className="italic-serif text-slate-500">начинается здесь</span></h3>
            <p className="text-slate-400 font-light leading-loose text-sm md:text-base">
              Оставьте ваш номер телефона. Мы свяжемся с вами в WhatsApp, пришлем каталог тканей и поможем рассчитать стоимость вашего проекта.
            </p>
          </div>
          
          <div className="md:w-1/2 bg-white p-12 md:p-24 flex items-center">
            {isSuccess ? (
              <div className="text-center w-full animate-fadeIn">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-2xl font-serif mb-4">Заявка принята</h4>
                <p className="text-slate-400 text-sm font-light">Мастер скоро свяжется с вами.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full space-y-10">
                {/* Скрытое поле для ботов (Honeypot) */}
                <div className="hidden">
                  <input 
                    type="text" 
                    value={botField} 
                    onChange={e => setBotField(e.target.value)} 
                    tabIndex={-1} 
                    autoComplete="off" 
                  />
                </div>

                <div className="relative">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-slate-300 font-bold mb-4 block">Телефон</label>
                  <input 
                    className="w-full border-b border-slate-100 py-6 text-2xl font-light outline-none focus:border-slate-900 transition-all bg-transparent"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white py-6 rounded-2xl text-[10px] uppercase tracking-[0.4em] font-bold hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить запрос'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
