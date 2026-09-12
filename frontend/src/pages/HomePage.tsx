import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <main className="flex min-h-[70vh] items-center bg-brand-950 px-5 py-16 text-white sm:px-8">
      <section className="mx-auto w-full max-w-7xl">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-300">Ruan Automóveis</span>
        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          Seu próximo veículo começa com uma escolha segura.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Veículos selecionados, atendimento próximo e transparência em cada etapa da sua compra.
        </p>
        <Link
          className="mt-10 inline-flex rounded-full bg-silver-200 px-6 py-3 font-semibold text-brand-950 transition hover:bg-brand-200"
          to="/estoque"
        >
          Ver estoque
        </Link>
      </section>
    </main>
  );
}
