import { Link, useParams } from 'react-router-dom';
import { ErrorMessage } from '../../../components/feedback/ErrorMessage';
import { useVehicle } from '../../../hooks/useVehicle';
import type { VehicleStatus } from '../../../types/vehicle';
import { formatFuel, formatMileage, formatPrice, formatTransmission } from '../../../utils/formatters';
import { VehicleGallery } from '../components/VehicleGallery';
import { WhatsAppButton } from '../components/WhatsAppButton';

const statusLabels: Record<VehicleStatus, string> = {
  available: 'Disponível',
  reserved: 'Reservado',
  sold: 'Vendido',
};

interface DetailItemProps {
  label: string;
  value: string | number;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="rounded-2xl bg-brand-50 p-4">
      <dt className="text-xs font-bold uppercase tracking-wider text-brand-500">{label}</dt>
      <dd className="mt-1 font-bold text-brand-950">{value}</dd>
    </div>
  );
}

function DetailsLoading() {
  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.35fr_0.85fr] lg:py-16">
      <div className="aspect-[4/3] animate-pulse rounded-3xl bg-brand-100" />
      <div className="space-y-5">
        <div className="h-4 w-28 animate-pulse rounded bg-brand-100" />
        <div className="h-12 w-4/5 animate-pulse rounded bg-brand-100" />
        <div className="h-8 w-2/5 animate-pulse rounded bg-brand-100" />
        <div className="h-56 animate-pulse rounded-3xl bg-brand-50" />
      </div>
    </main>
  );
}

export function VehicleDetailsPage() {
  const { id } = useParams();
  const { vehicle, isLoading, error, reload } = useVehicle(id);

  if (isLoading) {
    return <DetailsLoading />;
  }

  if (error || !vehicle) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <ErrorMessage message={error ?? 'Veículo não encontrado.'} onRetry={reload} />
        <Link className="mt-6 block text-center font-semibold text-brand-700 hover:text-brand-900" to="/estoque">
          Voltar para o estoque
        </Link>
      </main>
    );
  }

  const vehicleName = `${vehicle.brand} ${vehicle.model}`;

  return (
    <main className="bg-ivory-50">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-14">
        <Link className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-950" to="/estoque">
          <span aria-hidden="true">←</span> Voltar para o estoque
        </Link>

        <div className="mt-7 grid gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:items-start">
          <VehicleGallery images={vehicle.images} vehicleName={vehicleName} />

          <aside className="lg:sticky lg:top-6">
            <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
                  {statusLabels[vehicle.status]}
                </span>
                {vehicle.featured && (
                  <span className="rounded-full bg-silver-200 px-3 py-1 text-xs font-bold text-brand-950">Destaque</span>
                )}
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{vehicle.brand}</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-brand-950 sm:text-4xl">{vehicle.model}</h1>
              {vehicle.version && <p className="mt-2 text-base text-slate-500">{vehicle.version}</p>}
              <p className="mt-7 text-3xl font-black text-brand-800">{formatPrice(vehicle.price)}</p>

              <dl className="mt-7 grid grid-cols-2 gap-3">
                <DetailItem label="Ano" value={vehicle.year} />
                <DetailItem label="Ano modelo" value={vehicle.modelYear ?? vehicle.year} />
                <DetailItem label="Quilometragem" value={formatMileage(vehicle.mileage)} />
                <DetailItem label="Câmbio" value={formatTransmission(vehicle.transmission)} />
                <DetailItem label="Combustível" value={formatFuel(vehicle.fuel)} />
                {vehicle.color && <DetailItem label="Cor" value={vehicle.color} />}
                {vehicle.doors && <DetailItem label="Portas" value={vehicle.doors} />}
              </dl>

              <div className="mt-7 space-y-3">
                <WhatsAppButton vehicle={vehicle} />
                <Link
                  className="flex w-full items-center justify-center rounded-xl border border-brand-300 px-5 py-3.5 text-sm font-bold text-brand-800 transition hover:bg-brand-50"
                  to="/contato"
                >
                  Entrar em contato
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-brand-100 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Sobre o veículo</p>
            <h2 className="mt-2 text-2xl font-black text-brand-950">Descrição</h2>
            <p className="mt-5 whitespace-pre-line leading-7 text-slate-600">
              {vehicle.description || 'Entre em contato para conhecer todos os detalhes deste veículo.'}
            </p>
          </section>

          <section className="rounded-3xl border border-brand-100 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Conforto e segurança</p>
            <h2 className="mt-2 text-2xl font-black text-brand-950">Opcionais</h2>
            {vehicle.features.length > 0 ? (
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {vehicle.features.map((feature) => (
                  <li className="flex items-start gap-3 text-sm text-slate-700" key={feature}>
                    <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-slate-600">Consulte nossa equipe para confirmar os opcionais.</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
