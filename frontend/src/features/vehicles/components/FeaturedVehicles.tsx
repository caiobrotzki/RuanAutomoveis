import { Link } from 'react-router-dom';
import { useVehicles } from '../../../hooks/useVehicles';
import type { VehicleFilters } from '../../../types/vehicle';
import { VehicleGrid } from './VehicleGrid';

const featuredFilters: VehicleFilters = { featured: 'true' };

export function FeaturedVehicles() {
  const { vehicles, isLoading, error, reload } = useVehicles(featuredFilters);
  const featuredVehicles = vehicles.slice(0, 3);

  return (
    <section className="bg-ivory-50 px-5 py-12 sm:px-8 sm:py-20" aria-labelledby="featured-vehicles-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-600">Seleção especial</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-brand-950 sm:text-4xl" id="featured-vehicles-title">Veículos em destaque</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">Conheça alguns dos veículos selecionados pela Ruan Automóveis.</p>
          </div>
          <Link className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-brand-100 px-4 font-bold text-brand-800 transition hover:bg-brand-200 hover:text-brand-950 sm:min-h-0 sm:bg-transparent sm:px-0" to="/estoque">Ver estoque completo <span aria-hidden="true">→</span></Link>
        </div>

        {isLoading && (
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Carregando veículos em destaque" role="status">
            {Array.from({ length: 3 }, (_, index) => <div className="h-[430px] animate-pulse rounded-2xl bg-brand-100" key={index} />)}
          </div>
        )}

        {!isLoading && error && (
          <div className="mt-9 rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center" role="alert">
            <p className="font-bold text-red-900">Não foi possível carregar os veículos em destaque.</p>
            <p className="mt-2 text-sm text-red-700">{error}</p>
            <button className="mt-5 rounded-full bg-red-900 px-5 py-2.5 text-sm font-bold text-white" onClick={reload} type="button">Tentar novamente</button>
          </div>
        )}

        {!isLoading && !error && featuredVehicles.length === 0 && (
          <div className="mt-9 rounded-2xl border border-dashed border-brand-200 bg-white px-6 py-12 text-center">
            <p className="font-bold text-brand-950">Nenhum veículo em destaque no momento.</p>
            <p className="mt-2 text-sm text-slate-500">Novas oportunidades serão adicionadas em breve.</p>
          </div>
        )}

        {!isLoading && !error && featuredVehicles.length > 0 && <div className="mt-9"><VehicleGrid vehicles={featuredVehicles} /></div>}
      </div>
    </section>
  );
}
