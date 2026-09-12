import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title?: string;
}

export function PlaceholderPage({ title = 'Página em construção' }: PlaceholderPageProps) {
  return (
    <main className="grid min-h-[65vh] place-items-center px-6 text-center">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">Em breve</p>
        <h1 className="mt-3 text-3xl font-bold text-brand-950">{title}</h1>
        <Link className="mt-6 inline-block font-semibold text-brand-700 hover:text-brand-900" to="/">
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
