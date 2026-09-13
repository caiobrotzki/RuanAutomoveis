import { Link } from 'react-router-dom';
import heroImage from '../assets/images/home-hero-golf.jpg';
import { FeaturedVehicles } from '../features/vehicles/components/FeaturedVehicles';

export function HomePage() {
  return (
    <main>
      <section className="bg-brand-950 text-white">
        <div className="grid lg:min-h-[70vh] lg:grid-cols-2">
          <div className="flex min-w-0 flex-col items-start justify-center px-5 py-10 sm:px-8 sm:py-16 lg:py-20 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12">
            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-300 sm:text-sm sm:tracking-[0.3em]">Ruan Automóveis</span>
            <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:mt-6 sm:text-5xl xl:text-6xl">
              A escolha de seu próximo veículo começa agora.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Encontre aqui os melhores preços da região
            </p>
            <Link
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-silver-200 px-7 py-3.5 font-semibold text-brand-950 transition hover:bg-brand-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-9 sm:w-auto"
              to="/estoque"
            >
              Ver estoque
            </Link>
          </div>
          <div className="relative aspect-[16/11] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-auto">
            <img
              alt="Detalhe da dianteira de um Volkswagen Golf prata"
              className="absolute inset-0 h-full w-full object-cover object-[center_58%]"
              fetchPriority="high"
              width={1927}
              height={2909}
              src={heroImage}
            />
          </div>
        </div>
      </section>
      <FeaturedVehicles />
    </main>
  );
}
