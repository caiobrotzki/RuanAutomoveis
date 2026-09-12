import { NavLink } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

const navigation = [
  { label: 'Início', to: '/' },
  { label: 'Estoque', to: '/estoque' },
  { label: 'Contato', to: '/contato' },
];

export function Header() {
  return (
    <header className="border-b border-brand-100 bg-ivory-100 text-brand-950 shadow-sm">
      <div className="mx-auto flex min-h-24 max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-2 sm:px-8">
        <NavLink aria-label="Ruan Automóveis — início" to="/">
          <BrandLogo />
        </NavLink>

        <nav aria-label="Navegação principal" className="flex items-center gap-1">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition sm:px-4 ${
                  isActive ? 'bg-brand-100 text-brand-900' : 'text-brand-700 hover:bg-brand-50 hover:text-brand-950'
                }`
              }
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
