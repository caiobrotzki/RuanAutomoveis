import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

const navigation = [
  { label: 'Início', to: '/' },
  { label: 'Estoque', to: '/estoque' },
  { label: 'Contato', to: '/contato' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setIsMenuOpen(false), [pathname]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent): void {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `rounded-xl px-4 py-3 text-base font-bold transition md:rounded-full md:py-2 md:text-sm md:font-medium ${
      isActive ? 'bg-brand-100 text-brand-950' : 'text-brand-700 hover:bg-brand-50 hover:text-brand-950'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-ivory-100/95 text-brand-950 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 px-4 py-1 sm:min-h-28 sm:px-8 sm:py-2">
        <NavLink aria-label="Ruan Automóveis — início" to="/">
          <BrandLogo />
        </NavLink>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          className="grid size-12 place-items-center rounded-xl border border-brand-200 bg-white text-brand-950 shadow-sm transition hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 md:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          <span className="relative block h-5 w-6" aria-hidden="true">
            <span className={`absolute left-0 top-0.5 h-0.5 w-6 rounded-full bg-current transition ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`absolute left-0 top-2.5 h-0.5 w-6 rounded-full bg-current transition ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 top-[18px] h-0.5 w-6 rounded-full bg-current transition ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => <NavLink className={linkClassName} key={item.to} to={item.to}>{item.label}</NavLink>)}
        </nav>
      </div>

      {isMenuOpen && (
        <nav id="mobile-navigation" aria-label="Navegação para dispositivos móveis" className="absolute inset-x-0 top-full border-y border-brand-100 bg-ivory-100 px-4 py-4 shadow-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => <NavLink className={linkClassName} key={item.to} to={item.to}>{item.label}</NavLink>)}
          </div>
        </nav>
      )}
    </header>
  );
}
