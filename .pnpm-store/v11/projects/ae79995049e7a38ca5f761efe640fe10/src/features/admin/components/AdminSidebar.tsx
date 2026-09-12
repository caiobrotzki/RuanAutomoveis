import { NavLink, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../../components/layout/BrandLogo';
import { useAuth } from '../hooks/useAuth';

const links = [
  { label: 'Dashboard', symbol: '▦', to: '/admin/dashboard' },
  { label: 'Veículos', symbol: '◆', to: '/admin/veiculos' },
];

export function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout(): void {
    logout();
    navigate('/admin', { replace: true });
  }

  return (
    <aside className="border-b border-brand-800 bg-brand-950 px-4 py-4 text-white lg:flex lg:min-h-screen lg:flex-col lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
      <div className="flex items-center justify-between gap-4 lg:block">
        <BrandLogo className="rounded-lg" />
        <p className="hidden text-xs font-bold uppercase tracking-[0.2em] text-brand-300 lg:mt-5 lg:block">Painel administrativo</p>

        <nav aria-label="Navegação administrativa" className="flex items-center gap-1 lg:mt-10 lg:block lg:space-y-2">
          {links.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition lg:px-4 ${
                  isActive ? 'bg-white text-brand-950' : 'text-brand-200 hover:bg-white/10 hover:text-white'
                }`
              }
              key={link.to}
              to={link.to}
            >
              <span aria-hidden="true">{link.symbol}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        className="mt-4 hidden w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-brand-200 transition hover:bg-white/10 hover:text-white lg:mt-auto lg:flex"
        onClick={handleLogout}
        type="button"
      >
        <span aria-hidden="true">↪</span> Sair
      </button>
    </aside>
  );
}
