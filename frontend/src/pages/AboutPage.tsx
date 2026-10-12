import { Link } from "react-router-dom";
import { AboutSection } from "../components/home/AboutSection";

export function AboutPage() {
  return (
    <main>
      <section className="bg-brand-950 px-5 py-16 text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-300">
            Ruan Automóveis
          </p>
          <h1 className="mt-4 max-w-7xl text-5xl font-black leading-[0.98] tracking-[-0.045em] sm:text-7xl">
            O melhor lugar para encontrar seu próximo veículo
          </h1>
        </div>
      </section>
      <AboutSection showLink={false} />
      <section className="bg-ivory-50 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 border-t border-brand-200 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-2xl text-3xl font-black tracking-[-0.035em] text-brand-950 sm:text-4xl">
            Pronto para realizar seu poroximo sonho?
          </h2>
          <Link
            className="inline-flex min-h-12 w-fit items-center gap-3 border-b border-brand-800 text-sm font-bold text-brand-950 transition hover:gap-5"
            to="/estoque"
          >
            Conheça o estoque <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
