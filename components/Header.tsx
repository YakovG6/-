
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsAdmin } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }
  }, [isMobileMenuOpen]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const menuLinks = [
    { name: 'О КОМПАНИИ', href: '#about' },
    { name: 'КАТАЛОГ', href: '#catalog' },
    { name: 'ПЕРСОНАЛИЗАЦИЯ', href: '#personalization' },
    { name: 'HORECA', href: '#horeca' },
    { name: 'КОНТАКТЫ', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const Logo = ({ light = false }: { light?: boolean }) => (
    <div 
      className="flex flex-col cursor-pointer transition-transform active:scale-95 group select-none" 
      onClick={() => {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        window.scrollTo({top: 0, behavior: 'smooth'});
      }}
    >
      <div className="flex items-baseline">
        <span className={`text-2xl md:text-3xl font-serif font-black tracking-[-0.08em] uppercase leading-none ${light ? 'text-white' : 'text-brand-dark'}`}>THE LM</span>
      </div>
      <span className={`italic-serif !text-[10px] md:!text-[12px] lowercase tracking-normal -mt-1 ${light ? 'text-white/70' : 'text-slate-500'}`}>premium furniture</span>
    </div>
  );

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ease-in-out ${
          isScrolled && !isMobileMenuOpen 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100 py-3 md:py-4' 
            : 'bg-transparent py-8 md:py-10'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Logo />
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-12">
            {menuLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`label-small transition-all duration-300 hover:text-slate-400 ${
                  isScrolled ? 'text-brand-dark font-bold' : 'text-brand-dark/70'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsAdmin(true)}
              className={`hidden lg:block px-10 py-3.5 label-small rounded-full transition-all duration-500 shadow-xl active:scale-95 ${
                isScrolled 
                  ? 'bg-slate-900 text-white hover:bg-slate-700' 
                  : 'bg-white text-brand-dark border border-slate-200 hover:bg-brand-dark hover:text-white'
              }`}
            >
              Войти / Регистрация
            </button>
            
            <button 
              onClick={toggleMenu}
              className="lg:hidden w-12 h-12 flex items-center justify-center focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-8 h-8 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <div className="flex flex-col space-y-2 items-end">
                  <span className={`w-8 h-[1.5px] bg-brand-dark`}></span>
                  <span className={`w-5 h-[1.5px] bg-brand-dark`}></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[105] bg-white transition-all duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)] lg:hidden ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full px-8 pt-44 pb-20 justify-start overflow-y-auto">
          <nav className="flex flex-col space-y-10 md:space-y-14 max-w-lg mx-auto w-full">
            {menuLinks.map((link, idx) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`flex flex-col group transition-all duration-1000 transform ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <span className="label-small !text-[11px] !text-slate-300 mb-3 tracking-[0.4em]">0{idx + 1}</span>
                <span className="text-4xl md:text-5xl font-serif font-black text-brand-dark tracking-tighter uppercase group-hover:text-slate-400 transition-colors leading-none">
                  {link.name}
                </span>
              </a>
            ))}
          </nav>
          
          <div className={`mt-auto pt-10 transition-all duration-1000 delay-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
             <Logo />
             <div className="h-10"></div>
             <div className="flex flex-col gap-6">
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); setIsAdmin(true); }}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl label-small text-center"
                >
                  Войти / Регистрация
                </button>
                <div className="flex space-x-8">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="label-small !text-brand-dark">Instagram</a>
                  <a href="https://wa.me/79000000000" target="_blank" rel="noopener noreferrer" className="label-small !text-brand-dark">WhatsApp</a>
                </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
