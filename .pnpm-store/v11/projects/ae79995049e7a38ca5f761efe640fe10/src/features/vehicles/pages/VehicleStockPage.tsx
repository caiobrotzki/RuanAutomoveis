import { EmptyState } from '../../../components/feedback/EmptyState';
import { ErrorMessage } from '../../../components/feedback/ErrorMessage';
import { Loading } from '../../../components/feedback/Loading';
import { useVehicles } from '../../../hooks/useVehicles';
import { VehicleGrid } from '../components/VehicleGrid';
import { VehicleFilters } from '../components/VehicleFilters';
import { useVehicleFilters } from '../hooks/useVehicleFilters';

export function VehicleStockPage() {
  const { filters, setFilter, clearFilters, activeFilterCount } = useVehicleFilters();
  const { vehicles, isLoading, error, reload } = useVehicles(filters);

  return (
    <main>
      <section className="relative overflow-hidden bg-brand-950 px-5 py-14 text-white sm:px-8 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand-900/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 h-1 w-12 rounded-full bg-brand-300" />
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-300">Nosso estoque</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Encontre o veículo certo para o seu próximo momento
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:mt-6 sm:text-lg sm:leading-8">
            Veículos selecionados e revisados, com informações claras para você escolher com segurança.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start lg:gap-8">
          <VehicleFilters activeFilterCount={activeFilterCount} filters={filters} onChange={setFilter} onClear={clearFilters} />
          <div className="mt-8 min-w-0 lg:mt-0">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-brand-700">Seleção atual</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-brand-950">Veículos encontrados</h2>
            </div>
            {!isLoading && !error && vehicles.length > 0 && (
              <p className="text-sm text-slate-500">
                {vehicles.length} {vehicles.length === 1 ? 'veículo' : 'veículos'}
              </p>
            )}
          </div>

          {isLoading && <Loading />}
          {!isLoading && error && <ErrorMessage message={error} onRetry={reload} />}
          {!isLoading && !error && vehicles.length === 0 && <EmptyState />}
          {!isLoading && !error && vehicles.length > 0 && <VehicleGrid vehicles={vehicles} />}
          </div>
        </div>
      </section>
    </main>
  );
}
