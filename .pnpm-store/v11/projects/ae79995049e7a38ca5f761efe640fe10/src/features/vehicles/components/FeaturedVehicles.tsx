import { Link } from "react-router-dom";
import { ScrollReveal } from "../../../components/ui/ScrollReveal";
import { useVehicles } from "../../../hooks/useVehicles";
import type { VehicleFilters } from "../../../types/vehicle";
import { VehicleGrid } from "./VehicleGrid";

const featuredFilters: VehicleFilters = { featured: "true" };

export function FeaturedVehicles() {
  const { vehicles, isLoading, error, reload } = useVehicles(featuredFilters);
  const featuredVehicles = vehicles.slice(0, 3);

  return (
    <section
      className="bg-ivory-50 px-5 py-16 sm:px-8 sm:py-24 lg:py-32"
      aria-labelledby="featured-vehicles-title"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className="mt-4 max-w-3xl text-4xl font-black leading-none tracking-[-0.04em] text-brand-950 sm:text-5xl lg:text-6xl"
              id="featured-vehicles-title"
            >
              Em destaque
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-slate-600">
              Confira alguns dos veículos em destaque no momento.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 w-fit items-center gap-3 border-b border-brand-800 text-sm font-bold text-brand-950 transition hover:gap-5"
            to="/estoque"
          >
            Ver estoque completo <span aria-hidden="true">→</span>
          </Link>
        </ScrollReveal>

        {isLoading && (
          <div
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Carregando veículos em destaque"
            role="status"
          >
            {Array.from({ length: 3 }, (_, index) => (
              <div
                className="h-[470px] animate-pulse bg-brand-100"
                key={index}
              />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div
            className="mt-9 rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center"
            role="alert"
          >
            <p className="font-bold text-red-900">
              Não foi possível carregar os veículos em destaque.
            </p>
            <p className="mt-2 text-sm text-red-700">{error}</p>
            <button
              className="mt-5 rounded-full bg-red-900 px-5 py-2.5 text-sm font-bold text-white"
              onClick={reload}
              type="button"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!isLoading && !error && featuredVehicles.length === 0 && (
          <div className="mt-9 rounded-2xl border border-dashed border-brand-200 bg-white px-6 py-12 text-center">
            <p className="font-bold text-brand-950">
              Nenhum veículo em destaque no momento.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Novas oportunidades serão adicionadas em breve.
            </p>
          </div>
        )}

        {!isLoading && !error && featuredVehicles.length > 0 && (
          <div className="mt-12">
            <VehicleGrid vehicles={featuredVehicles} />
          </div>
        )}
      </div>
    </section>
  );
}
