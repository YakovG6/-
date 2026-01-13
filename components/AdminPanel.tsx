
import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

const AdminPanel: React.FC = () => {
  const { 
    products, updateProduct, addProduct, deleteProduct, 
    categories, updateCategory,
    leads, deleteLead,
    chats, sendChatMessage, markChatAsRead,
    dbStatus,
    isAdmin, setIsAdmin,
    isAuthenticated, loginAdmin, logoutAdmin, refreshAdminData
  } = useData();
  
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'leads' | 'chats' | 'system'>('products');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [adminReply, setAdminReply] = useState('');
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  
  // Auth State
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const statusLabel = dbStatus === 'connected' ? '● System Connected' : dbStatus === 'syncing' ? '● Syncing Data' : '● Local Mode';
  const statusClass = dbStatus === 'connected' ? 'text-green-500' : dbStatus === 'syncing' ? 'text-amber-500' : 'text-slate-400';

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChatId, chats]);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        try {
          const has = await window.aistudio.hasSelectedApiKey();
          setHasApiKey(has);
        } catch (e) {
          console.error("API Key check error", e);
        }
      }
    };
    if (isAdmin && isAuthenticated) checkApiKey();
  }, [activeTab, isAdmin, isAuthenticated]);

  useEffect(() => {
    if (isAdmin && isAuthenticated) {
      refreshAdminData();
    }
  }, [isAdmin, isAuthenticated, refreshAdminData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const success = await loginAdmin(loginInput, passwordInput);
    setAuthError(!success);
    setIsLoggingIn(false);
  };

  if (!isAdmin) return null;

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[300] bg-slate-900/60 backdrop-blur-2xl flex items-center justify-center p-6 animate-fadeIn">
        <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900"></div>
          
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] text-slate-300 uppercase block mb-4">ThelMebel Core Access</span>
            <h2 className="text-3xl font-serif text-slate-900">Вход в систему</h2>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-2 block ml-2">Логин</label>
                <input 
                  type="text"
                  value={loginInput}
                  onChange={e => setLoginInput(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm outline-none ring-1 ring-slate-100 focus:ring-slate-900 transition-all"
                  placeholder="admin"
                  required
                />
              </div>
              <div className="relative">
                <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-2 block ml-2">Пароль</label>
                <input 
                  type="password"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className={`w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm outline-none ring-1 transition-all ${authError ? 'ring-red-300' : 'ring-slate-100 focus:ring-slate-900'}`}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {authError && (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest text-center animate-pulse">
                Ошибка авторизации: неверные данные
              </p>
            )}
            
            <div className="flex flex-col gap-4 pt-4">
              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-bold shadow-xl hover:bg-slate-800 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Проверка доступа...' : 'Авторизоваться'}
              </button>
              <button 
                type="button"
                onClick={() => setIsAdmin(false)}
                className="text-[10px] uppercase tracking-widest text-slate-400 font-bold hover:text-slate-900 transition-colors"
              >
                Вернуться на сайт
              </button>
            </div>
          </form>
          
          <div className="mt-12 pt-8 border-t border-slate-50 text-center">
             <p className="text-[8px] text-slate-300 uppercase tracking-widest leading-loose">
               Authorized personnel only. <br/>All attempts are logged for security reasons.
             </p>
          </div>
        </div>
      </div>
    );
  }

  const handleOpenKeySelect = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const handleSendReply = () => {
    if (!selectedChatId || !adminReply.trim()) return;
    sendChatMessage(selectedChatId, adminReply, 'admin');
    setAdminReply('');
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col animate-fadeIn font-sans overflow-hidden">
      {/* CMS Header */}
      <div className="h-20 border-b border-slate-100 px-8 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-10">
          <div className="flex flex-col">
            <span className="text-xl font-serif font-black tracking-tighter uppercase leading-none">THE LM CMS</span>
            <span className="text-[8px] uppercase tracking-widest text-slate-400 mt-1">v2.5 Enterprise Edition</span>
          </div>
          
          <nav className="flex space-x-2 bg-slate-50 p-1.5 rounded-2xl">
            {(['products', 'categories', 'leads', 'chats', 'system'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${
                  activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab === 'products' ? 'Товары' : tab === 'categories' ? 'Категории' : tab === 'leads' ? 'Заявки' : tab === 'chats' ? 'Чат' : 'Инструкции'}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
             <span className="text-[9px] font-bold text-slate-900 uppercase tracking-widest">Master Admin</span>
             <span className={`text-[8px] font-bold uppercase tracking-widest ${statusClass}`}>{statusLabel}</span>
          </div>
          <button 
            onClick={() => { setIsAdmin(false); logoutAdmin(); }}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-slate-700 transition-all shadow-md"
          >
            Выход
          </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-50/50 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-12">
          
          {activeTab === 'system' && (
            <div className="max-w-5xl mx-auto space-y-12 animate-fadeIn pb-20">
              {/* Technical Documentation Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col h-full">
                  <h2 className="text-2xl font-serif text-slate-900 mb-8">1. Установка и Деплой</h2>
                  <div className="space-y-6 text-xs text-slate-500 leading-relaxed">
                    <p><b>Локальный запуск:</b> <br/>Используйте команду <code>npm install</code> для установки зависимостей, затем <code>npm run dev</code> для старта сервера разработки. Проект базируется на React 18+ и Vite.</p>
                    <p><b>Environment Variables:</b> <br/>API ключ для Gemini передается автоматически через <code>process.env.API_KEY</code>. Для внешних баз данных (Supabase/Firebase) добавьте соответствующие ключи в корень проекта.</p>
                    <p><b>Деплой:</b> <br/>Проект оптимизирован для Vercel. Просто подключите Git-репозиторий — билд пройдет автоматически.</p>
                  </div>
                </div>

                <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col h-full">
                  <h2 className="text-2xl font-serif text-slate-900 mb-8">2. Работа с ИИ-консьержем</h2>
                  <div className="space-y-6 text-xs text-slate-500 leading-relaxed">
                    <p><b>Логика ответов:</b> <br/>Настройки поведения бота находятся в <code>AIChat.tsx</code>. Изменяйте <code>systemInstruction</code> для смены тональности общения или добавления новых условий.</p>
                    <p><b>Обновление данных:</b> <br/>Бот получает информацию из <code>constants.tsx</code>. Если вы добавите товар в CMS, бот автоматически узнает о нем при следующем обращении пользователя.</p>
                    <p><b>Модели:</b> <br/>Используется <code>gemini-3-flash-preview</code> для мгновенных ответов. Для более глубокой консультации можно переключить на <code>gemini-3-pro-preview</code>.</p>
                  </div>
                </div>

                <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col h-full">
                  <h2 className="text-2xl font-serif text-slate-900 mb-8">3. Оптимизация и SEO</h2>
                  <div className="space-y-6 text-xs text-slate-500 leading-relaxed">
                    <p><b>Изображения:</b> <br/>Всегда используйте формат WebP или AVIF для снижения нагрузки. Оптимальное разрешение для каталога: 1200x1500px.</p>
                    <p><b>Мета-теги:</b> <br/>Заголовки и описания страниц находятся в <code>index.html</code>. При добавлении новых позиций в <code>constants.tsx</code>, бот также помогает индексировать контент через динамические описания.</p>
                    <p><b>Скорость:</b> <br/>Для максимизации PageSpeed используйте ленивую загрузку (lazy loading) для всех медиа-файлов вне первого экрана.</p>
                  </div>
                </div>

                <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col h-full">
                  <h2 className="text-2xl font-serif text-slate-900 mb-8">4. Управление заказами</h2>
                  <div className="space-y-6 text-xs text-slate-500 leading-relaxed">
                    <p><b>Хранение:</b> <br/>В текущей версии данные заявок хранятся в <code>localStorage</code>. Для промышленного использования рекомендуется подключить Postgres базу данных через Prisma или напрямую в DataContext.</p>
                    <p><b>WhatsApp-интеграция:</b> <br/>Кнопка в CMS формирует ссылку <code>wa.me</code> с предзаполненным текстом заявки. Номер телефона можно изменить в глобальных константах.</p>
                    <p><b>Масштабирование:</b> <br/>Вы можете добавлять неограниченное количество категорий. Интерфейс каталога автоматически адаптируется под любой объем контента.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900 p-12 rounded-[3rem] text-white flex flex-col items-center text-center">
                 <h2 className="text-3xl font-serif mb-6">Готовы к масштабированию?</h2>
                 <p className="text-slate-400 text-xs max-w-2xl leading-loose mb-10">
                   Все компоненты системы полностью модульные. Вы можете легко заменить UI-библиотеку (Tailwind) или систему управления состоянием (React Context) без потери логики чат-бота или каталога.
                 </p>
                 <button 
                  onClick={handleOpenKeySelect}
                  className="bg-white text-slate-900 px-12 py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-slate-200 transition-all shadow-xl"
                 >
                   Управление API Ключами
                 </button>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-10 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-serif text-slate-900">Каталог изделий</h2>
                <button 
                  onClick={() => addProduct({ id: Date.now().toString(), name: 'Новое изделие', price: '0 ₽', category: 'chairs', images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800'] })}
                  className="bg-slate-900 text-white px-10 py-4 rounded-2xl text-[10px] uppercase tracking-widest font-bold shadow-lg"
                >
                  Добавить товар
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {products.map(p => (
                  <div key={p.id} className="bg-white p-8 rounded-3xl border border-slate-100 flex items-center gap-10 shadow-sm hover:shadow-md transition-all">
                    <img src={p.images[0]} className="w-24 h-24 object-cover rounded-2xl shadow-inner" />
                    <div className="flex-1 grid grid-cols-3 gap-10">
                      <div>
                        <label className="text-[9px] uppercase tracking-widest text-slate-300 font-bold mb-2 block">Наименование</label>
                        <input className="text-base font-serif w-full border-b border-transparent focus:border-slate-100 outline-none" value={p.name} onChange={e => updateProduct(p.id, { name: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase tracking-widest text-slate-300 font-bold mb-2 block">Цена</label>
                        <input className="text-base w-full border-b border-transparent focus:border-slate-100 outline-none" value={p.price} onChange={e => updateProduct(p.id, { price: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase tracking-widest text-slate-300 font-bold mb-2 block">Категория</label>
                        <select className="text-[10px] uppercase tracking-widest font-bold bg-slate-50 p-2 rounded-lg" value={p.category} onChange={e => updateProduct(p.id, { category: e.target.value })}>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <button onClick={() => deleteProduct(p.id)} className="text-red-300 hover:text-red-500 transition-colors p-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeWidth={1.5} /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-10 animate-fadeIn">
              <h2 className="text-4xl font-serif text-slate-900">Входящие заявки</h2>
              {leads.length === 0 ? (
                <div className="p-20 text-center text-slate-300 italic font-serif text-2xl">Нет новых заявок</div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {leads.map(l => (
                    <div key={l.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 flex justify-between items-center shadow-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold">{l.phone}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-green-50 text-green-600 px-3 py-1 rounded-full">New Lead</span>
                        </div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">{l.date}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <a 
                          href={`https://wa.me/${l.phone.replace(/\D/g,'')}?text=Здравствуйте! Вы оставляли заявку на сайте ThelMebel. Готов ответить на ваши вопросы.`} 
                          target="_blank"
                          className="bg-[#25D366] text-white px-10 py-4 rounded-2xl text-[10px] uppercase tracking-widest font-bold shadow-lg hover:scale-105 transition-all"
                        >
                          Ответить в WA
                        </a>
                        <button onClick={() => deleteLead(l.id)} className="text-slate-200 hover:text-red-500 transition-colors">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeWidth={2} /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'chats' && (
            <div className="flex h-[calc(100vh-160px)] gap-8 bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
              <div className="w-80 border-r border-slate-50 flex flex-col">
                <div className="p-6 border-b border-slate-50 bg-slate-50/20">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Активные диалоги</h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {chats.length === 0 ? (
                    <div className="p-10 text-center text-[10px] uppercase tracking-widest text-slate-300">Нет чатов</div>
                  ) : (
                    chats.map(chat => (
                      <button 
                        key={chat.id}
                        onClick={() => {
                          setSelectedChatId(chat.id);
                          markChatAsRead(chat.id);
                        }}
                        className={`w-full p-8 text-left border-b border-slate-50 transition-all hover:bg-slate-50 ${selectedChatId === chat.id ? 'bg-slate-50' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-bold">{chat.userName}</span>
                          {!chat.isRead && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                        </div>
                        <p className="text-[10px] text-slate-400 truncate uppercase tracking-widest">{chat.lastMessage}</p>
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="flex-1 flex flex-col bg-slate-50/10 relative">
                {selectedChatId ? (
                  <>
                    <div className="p-8 border-b border-slate-50 bg-white flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">U</div>
                        <span className="text-sm font-bold uppercase tracking-widest">Клиент: {selectedChatId.slice(-6)}</span>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-10 space-y-6">
                      {chats.find(c => c.id === selectedChatId)?.messages.map(m => (
                        <div key={m.id} className={`flex ${m.role === 'admin' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] p-5 rounded-[1.5rem] text-xs leading-relaxed shadow-sm ${
                            m.role === 'admin' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                          }`}>
                            {m.text}
                            <div className={`text-[8px] mt-2 opacity-50 font-bold uppercase tracking-widest ${m.role === 'admin' ? 'text-right' : 'text-left'}`}>
                              {m.timestamp}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    <div className="p-8 bg-white border-t border-slate-50 flex gap-4">
                      <input 
                        className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm outline-none focus:ring-1 ring-slate-200"
                        placeholder="Напишите ответ..."
                        value={adminReply}
                        onChange={e => setAdminReply(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSendReply()}
                      />
                      <button 
                        onClick={handleSendReply}
                        className="bg-slate-900 text-white px-10 rounded-2xl text-[10px] uppercase tracking-widest font-bold shadow-lg hover:bg-slate-800 transition-all"
                      >
                        Отправить
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-200 p-20 text-center">
                    <div className="w-20 h-20 rounded-full border-2 border-slate-100 flex items-center justify-center mb-6">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeWidth={1.5} /></svg>
                    </div>
                    <h3 className="italic font-serif text-3xl">Выберите диалог</h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] mt-4 font-bold">Для начала переписки</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
