import { Link } from 'react-router-dom';
import type { Vehicle } from '../../../types/vehicle';
import { formatFuel, formatMileage, formatPrice, formatTransmission } from '../../../utils/formatters';

interface VehicleCardProps {
  vehicle: Vehicle;
}

interface SpecificationProps {
  label: string;
  value: string;
}

function Specification({ label, value }: SpecificationProps) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-1 font-semibold text-slate-700">{value}</dd>
    </div>
  );
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const title = `${vehicle.brand} ${vehicle.model}`;
  const coverImage = vehicle.images[0];

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
        <div className="absolute inset-0 grid place-items-center text-sm font-medium text-slate-500">
          Imagem em breve
        </div>
        {coverImage && (
          <img
            alt={title}
            className="relative size-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.hidden = true;
            }}
            src={coverImage}
          />
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {vehicle.featured && (
            <span className="rounded-full bg-silver-200 px-3 py-1 text-xs font-bold text-brand-950">
              Destaque
            </span>
          )}
          {vehicle.status === 'reserved' && (
            <span className="rounded-full bg-brand-950/90 px-3 py-1 text-xs font-bold text-white">
              Reservado
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">{vehicle.brand}</p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-brand-950">{vehicle.model}</h2>
        {vehicle.version && <p className="mt-1 truncate text-sm text-slate-500">{vehicle.version}</p>}

        <p className="mt-5 text-2xl font-black tracking-tight text-brand-950">{formatPrice(vehicle.price)}</p>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-slate-100 py-4 text-sm">
          <Specification label="Ano" value={String(vehicle.modelYear ?? vehicle.year)} />
          <Specification label="Quilometragem" value={formatMileage(vehicle.mileage)} />
          <Specification label="Câmbio" value={formatTransmission(vehicle.transmission)} />
          <Specification label="Combustível" value={formatFuel(vehicle.fuel)} />
        </dl>

        <Link
          className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-brand-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800"
          to={`/veiculos/${vehicle._id}`}
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}
