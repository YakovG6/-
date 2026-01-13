
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS, CATEGORIES, MATERIALS } from '../constants';

interface Message {
  id: string;
  role: 'user' | 'admin';
  text: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  userName: string;
  lastMessage: string;
  messages: Message[];
  isRead: boolean;
}

interface DataContextType {
  products: any[];
  categories: any[];
  materials: any[];
  leads: any[];
  chats: ChatSession[];
  dbStatus: 'local' | 'syncing' | 'connected';
  isAuthenticated: boolean;
  updateProduct: (id: string, updates: any) => void;
  addProduct: (product: any) => void;
  deleteProduct: (id: string) => void;
  updateCategory: (id: string, updates: any) => void;
  addLead: (lead: any, botField?: string) => boolean;
  deleteLead: (id: string) => void;
  sendChatMessage: (sessionId: string, text: string, role: 'user' | 'admin') => boolean;
  markChatAsRead: (sessionId: string) => void;
  loginAdmin: (username: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  refreshAdminData: () => Promise<void>;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const [categories, setCategories] = useState(CATEGORIES);
  const [materials, setMaterials] = useState(MATERIALS);
  const [leads, setLeads] = useState<any[]>([]);
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dbStatus, setDbStatus] = useState<'local' | 'syncing' | 'connected'>('local');
  const [lastActionTime, setLastActionTime] = useState(0);
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('lm_admin_token'));
  const isAuthenticated = Boolean(adminToken);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const apiFetch = useCallback(async (path: string, options: RequestInit = {}, token?: string) => {
    const headers = new Headers(options.headers);
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }
    if (response.status === 204) return null;
    return response.json();
  }, [API_BASE]);

  // Load from LocalStorage
  useEffect(() => {
    const savedLeads = localStorage.getItem('lm_leads');
    const savedChats = localStorage.getItem('lm_chats');
    const savedProducts = localStorage.getItem('lm_products');
    
    if (savedLeads) setLeads(JSON.parse(savedLeads));
    if (savedChats) setChats(JSON.parse(savedChats));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  useEffect(() => {
    const syncFromApi = async () => {
      try {
        await apiFetch('/api/status');
        setDbStatus('connected');
        const [apiProducts, apiCategories, apiMaterials] = await Promise.all([
          apiFetch('/api/products'),
          apiFetch('/api/categories'),
          apiFetch('/api/materials')
        ]);
        if (apiProducts) setProducts(apiProducts);
        if (apiCategories) setCategories(apiCategories);
        if (apiMaterials) setMaterials(apiMaterials);
        if (adminToken) {
          const [apiLeads, apiChats] = await Promise.all([
            apiFetch('/api/leads', {}, adminToken),
            apiFetch('/api/chats', {}, adminToken)
          ]);
          if (apiLeads) setLeads(apiLeads);
          if (apiChats) setChats(apiChats);
        }
      } catch (error) {
        console.warn('API unavailable, using local storage.');
        setDbStatus('local');
      }
    };
    syncFromApi();
  }, [adminToken, apiFetch]);

  // Save to LocalStorage (as fallback)
  useEffect(() => {
    localStorage.setItem('lm_leads', JSON.stringify(leads));
    localStorage.setItem('lm_chats', JSON.stringify(chats));
    localStorage.setItem('lm_products', JSON.stringify(products));
  }, [leads, chats, products]);

  const isRateLimited = () => {
    const now = Date.now();
    if (now - lastActionTime < 2000) return true;
    setLastActionTime(now);
    return false;
  };

  // Функция для дублирования сообщения на почту
  const notifyByEmail = async (sessionId: string, text: string) => {
    try {
      // Используем Formspree или аналогичный сервис для отправки без бэкенда
      // В реальном проекте здесь будет вызов вашего API эндпоинта
      await fetch("https://formspree.io/f/mqakevve", { // MQAKEVVE - пример ID, замените на свой при деплое
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _to: "gyakovg11@gmail.com",
          subject: "Новое сообщение в чате ThelMebel",
          visitor: sessionId,
          message: text,
          timestamp: new Date().toLocaleString()
        })
      });
      console.log("Email notification sent to gyakovg11@gmail.com");
    } catch (error) {
      console.error("Failed to send email notification:", error);
    }
  };

  const refreshAdminData = useCallback(async () => {
    if (!adminToken) return;
    try {
      setDbStatus('syncing');
      const [apiLeads, apiChats] = await Promise.all([
        apiFetch('/api/leads', {}, adminToken),
        apiFetch('/api/chats', {}, adminToken)
      ]);
      if (apiLeads) setLeads(apiLeads);
      if (apiChats) setChats(apiChats);
      setDbStatus('connected');
    } catch (error) {
      setDbStatus('local');
    }
  }, [adminToken, apiFetch]);

  const loginAdmin = async (username: string, password: string) => {
    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      if (data?.token) {
        localStorage.setItem('lm_admin_token', data.token);
        setAdminToken(data.token);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem('lm_admin_token');
    setAdminToken(null);
  };

  const updateProduct = (id: string, updates: any) => {
    setProducts(p => p.map(x => x.id === id ? { ...x, ...updates } : x));
    if (dbStatus === 'connected' && adminToken) {
      apiFetch(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      }, adminToken).catch(() => null);
    }
  };
  const addProduct = (p: any) => {
    setProducts(prev => [p, ...prev]);
    if (dbStatus === 'connected' && adminToken) {
      apiFetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(p)
      }, adminToken).catch(() => null);
    }
  };
  const deleteProduct = (id: string) => {
    setProducts(p => p.filter(x => x.id !== id));
    if (dbStatus === 'connected' && adminToken) {
      apiFetch(`/api/products/${id}`, { method: 'DELETE' }, adminToken).catch(() => null);
    }
  };
  const updateCategory = (id: string, updates: any) => {
    setCategories(c => c.map(x => x.id === id ? { ...x, ...updates } : x));
    if (dbStatus === 'connected' && adminToken) {
      apiFetch(`/api/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      }, adminToken).catch(() => null);
    }
  };
  
  const addLead = (lead: any, botField?: string) => {
    if (botField) return false;
    if (isRateLimited()) return false;

    const newLead = { ...lead, id: Date.now().toString(), date: new Date().toLocaleString() };
    setLeads(prev => [newLead, ...prev]);

    if (dbStatus === 'connected') {
      apiFetch('/api/leads', {
        method: 'POST',
        body: JSON.stringify({ ...lead, botField })
      }).catch(() => null);
    } else {
      notifyByEmail("NEW_LEAD", `Телефон: ${lead.phone}`);
    }
    return true;
  };

  const deleteLead = (id: string) => {
    setLeads(l => l.filter(x => x.id !== id));
    if (dbStatus === 'connected' && adminToken) {
      apiFetch(`/api/leads/${id}`, { method: 'DELETE' }, adminToken).catch(() => null);
    }
  };

  const sendChatMessage = (sessionId: string, text: string, role: 'user' | 'admin') => {
    if (role === 'user' && isRateLimited()) return false;

    setChats(prev => {
      const existing = prev.find(s => s.id === sessionId);
      const newMessage: Message = {
        id: Date.now().toString(),
        role,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (role === 'user' && dbStatus === 'local') {
        notifyByEmail(sessionId, text);
      }

      if (existing) {
        return prev.map(s => s.id === sessionId ? {
          ...s,
          lastMessage: text,
          messages: [...s.messages, newMessage],
          isRead: role === 'admin'
        } : s);
      } else {
        return [{
          id: sessionId,
          userName: `Клиент ${sessionId.slice(-4)}`,
          lastMessage: text,
          messages: [newMessage],
          isRead: false
        }, ...prev];
      }
    });
    if (dbStatus === 'connected') {
      apiFetch(`/api/chats/${sessionId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ text, role })
      }, role === 'admin' ? adminToken ?? undefined : undefined).catch(() => null);
    }
    return true;
  };

  const markChatAsRead = (sessionId: string) => {
    setChats(prev => prev.map(s => s.id === sessionId ? { ...s, isRead: true } : s));
    if (dbStatus === 'connected' && adminToken) {
      apiFetch(`/api/chats/${sessionId}/read`, { method: 'PUT' }, adminToken).catch(() => null);
    }
  };

  return (
    <DataContext.Provider value={{ 
      products, categories, materials, leads, chats, dbStatus,
      isAuthenticated,
      updateProduct, addProduct, deleteProduct,
      updateCategory, addLead, deleteLead,
      sendChatMessage, markChatAsRead,
      loginAdmin, logoutAdmin, refreshAdminData,
      isAdmin, setIsAdmin 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
