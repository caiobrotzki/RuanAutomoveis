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
      <section className="bg-brand-950 px-5 py-14 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-300">Nosso estoque</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Encontre o veículo ideal para o seu momento.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Uma seleção de veículos revisados, apresentados com transparência e prontos para uma nova história.
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
