import { useAuth } from '../hooks/useAuth';

export function AdminHeader() {
  const { admin } = useAuth();

  return (
    <header className="border-b border-brand-100 bg-white px-5 py-4 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500">Painel administrativo</p>
          <p className="mt-0.5 font-bold text-brand-950">Ruan Automóveis</p>
        </div>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-brand-100 font-black text-brand-800">
            {admin?.name.charAt(0).toUpperCase()}
          </span>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-brand-950">{admin?.name}</p>
            <p className="text-xs text-slate-500">{admin?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
