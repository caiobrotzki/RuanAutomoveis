import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../../components/layout/BrandLogo';
import { useAuth } from '../hooks/useAuth';

interface LocationState {
  from?: string;
}

export function AdminLoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate replace to="/admin/dashboard" />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      const destination = (location.state as LocationState | null)?.from ?? '/admin/dashboard';
      navigate(destination, { replace: true });
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : 'Não foi possível entrar.';
      setError(message === 'Failed to fetch' ? 'Não foi possível conectar à API.' : message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-ivory-50 lg:grid-cols-2">
      <section className="hidden bg-brand-950 px-12 text-white lg:flex lg:flex-col lg:justify-between lg:py-14">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-300">Área administrativa</p>
        <div>
          <h1 className="max-w-xl text-5xl font-black leading-tight tracking-tight">Gestão simples para um estoque sempre atualizado.</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-brand-200">Acesso exclusivo para administradores da Ruan Automóveis.</p>
        </div>
        <p className="text-sm text-brand-300">Qualidade e confiança sobre rodas.</p>
      </section>

      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <BrandLogo className="mx-auto scale-125" />
          <div className="mt-10 rounded-3xl border border-brand-100 bg-white p-6 shadow-xl shadow-brand-950/5 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">Bem-vindo</p>
            <h2 className="mt-2 text-3xl font-black text-brand-950">Acesse o painel</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Use suas credenciais administrativas para continuar.</p>

            <form className="mt-8 space-y-5" onSubmit={(event) => void handleSubmit(event)}>
              <div>
                <label className="text-sm font-bold text-brand-900" htmlFor="email">E-mail</label>
                <input
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-brand-200 bg-ivory-50 px-4 py-3 text-brand-950 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-3 focus:ring-brand-100"
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@exemplo.com"
                  required
                  type="email"
                  value={email}
                />
              </div>

              <div>
                <label className="text-sm font-bold text-brand-900" htmlFor="password">Senha</label>
                <input
                  autoComplete="current-password"
                  className="mt-2 w-full rounded-xl border border-brand-200 bg-ivory-50 px-4 py-3 text-brand-950 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-3 focus:ring-brand-100"
                  id="password"
                  minLength={8}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Sua senha"
                  required
                  type="password"
                  value={password}
                />
              </div>

              {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800" role="alert">{error}</p>}

              <button
                className="w-full rounded-xl bg-brand-800 px-5 py-3.5 font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
