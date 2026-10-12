import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { createGeneralWhatsAppUrl } from '../../utils/whatsapp';
import { BrandLogo } from './BrandLogo';

const navigation = [
  { label: 'Início', to: '/' },
  { label: 'Estoque', to: '/estoque' },
  { label: 'Sobre nós', to: '/sobre' },
  { label: 'Contato', to: '/contato' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { hash, pathname } = useLocation();
  const isDarkHeader = pathname === '/' && !isScrolled;

  useEffect(() => setIsMenuOpen(false), [hash, pathname]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent): void {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    function handleScroll(): void {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `relative px-1 py-3 text-base font-bold transition-colors after:absolute after:inset-x-1 after:bottom-1 after:h-px after:origin-left after:bg-current after:transition-transform md:text-sm md:font-semibold ${
      isActive
        ? 'text-brand-950 after:scale-x-100 md:text-inherit'
        : `text-brand-700 after:scale-x-0 hover:text-brand-950 hover:after:scale-x-100 ${isDarkHeader ? 'md:text-white/80 md:hover:text-white' : ''}`
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
        isDarkHeader
          ? 'border-white/10 bg-brand-950 text-white'
          : 'border-brand-100 bg-ivory-50 text-brand-950 shadow-[0_8px_30px_rgba(12,34,51,0.06)]'
      }`}
    >
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <NavLink aria-label="Ruan Automóveis — início" to="/">
          <BrandLogo className="bg-ivory-50" />
        </NavLink>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          className={`grid size-12 place-items-center border transition focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden ${
            isDarkHeader ? 'border-white/40 text-white focus-visible:outline-white' : 'border-brand-200 text-brand-950 focus-visible:outline-brand-700'
          }`}
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          <span className="relative block h-5 w-6" aria-hidden="true">
            <span className={`absolute left-0 top-0.5 h-0.5 w-6 bg-current transition ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`absolute left-0 top-2.5 h-0.5 w-6 bg-current transition ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 top-[18px] h-0.5 w-6 bg-current transition ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <nav aria-label="Navegação principal" className="flex items-center gap-7">
            {navigation.map((item) => <NavLink className={linkClassName} end={item.to === '/'} key={item.to} to={item.to}>{item.label}</NavLink>)}
          </nav>
          <a
            className={`inline-flex min-h-11 items-center px-5 text-sm font-bold transition ${isDarkHeader ? 'bg-white text-brand-950 hover:bg-brand-100' : 'bg-brand-950 text-white hover:bg-brand-700'}`}
            href={createGeneralWhatsAppUrl()}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="mobile-navigation" aria-label="Navegação para dispositivos móveis" className="absolute inset-x-0 top-full border-y border-brand-100 bg-ivory-50 px-5 py-5 text-brand-950 shadow-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => <NavLink className={linkClassName} end={item.to === '/'} key={item.to} to={item.to}>{item.label}</NavLink>)}
            <a className="mt-3 inline-flex min-h-12 items-center justify-center bg-brand-950 px-5 text-sm font-bold text-white" href={createGeneralWhatsAppUrl()} rel="noreferrer" target="_blank">
              Falar pelo WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
