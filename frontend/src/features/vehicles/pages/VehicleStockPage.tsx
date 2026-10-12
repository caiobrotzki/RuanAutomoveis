import { EmptyState } from "../../../components/feedback/EmptyState";
import { ErrorMessage } from "../../../components/feedback/ErrorMessage";
import { Loading } from "../../../components/feedback/Loading";
import { useVehicles } from "../../../hooks/useVehicles";
import { VehicleGrid } from "../components/VehicleGrid";
import { VehicleFilters } from "../components/VehicleFilters";
import { useVehicleFilters } from "../hooks/useVehicleFilters";

export function VehicleStockPage() {
  const { filters, setFilter, clearFilters, activeFilterCount } =
    useVehicleFilters();
  const { vehicles, isLoading, error, reload } = useVehicles(filters);

  return (
    <main className="bg-ivory-50">
      <section className="border-b border-brand-100 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            Nosso estoque
          </p>
          <h1 className="mt-4 max-w-8xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-brand-950 sm:text-5xl lg:text-6xl">
            Encontre aqui o seu próximo veículo.
          </h1>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start lg:gap-8">
          <VehicleFilters
            activeFilterCount={activeFilterCount}
            filters={filters}
            onChange={setFilter}
            onClear={clearFilters}
          />
          <div className="mt-10 min-w-0 lg:mt-0">
            <div className="mb-10 flex items-end justify-between gap-4 border-b border-brand-100 pb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600">
                  Seleção atual
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.025em] text-brand-950">
                  Veículos encontrados
                </h2>
              </div>
              {!isLoading && !error && vehicles.length > 0 && (
                <p className="text-sm text-slate-500">
                  {vehicles.length}{" "}
                  {vehicles.length === 1 ? "veículo" : "veículos"}
                </p>
              )}
            </div>

            {isLoading && <Loading />}
            {!isLoading && error && (
              <ErrorMessage message={error} onRetry={reload} />
            )}
            {!isLoading && !error && vehicles.length === 0 && <EmptyState />}
            {!isLoading && !error && vehicles.length > 0 && (
              <VehicleGrid vehicles={vehicles} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
