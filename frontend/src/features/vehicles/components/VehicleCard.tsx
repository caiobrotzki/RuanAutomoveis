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
      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-brand-950">{value}</dd>
    </div>
  );
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const title = `${vehicle.brand} ${vehicle.model}`;
  const coverImage = vehicle.images[0];

  return (
    <article className="group overflow-hidden border border-brand-100 bg-white transition-colors duration-300 hover:border-brand-300">
      <Link className="relative block aspect-[4/3] overflow-hidden bg-brand-100" to={`/veiculos/${vehicle._id}`}>
        <div className="absolute inset-0 grid place-items-center text-sm font-medium text-slate-500">
          Imagem em breve
        </div>
        {coverImage && (
          <img
            alt={title}
            className="relative size-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.hidden = true;
            }}
            src={coverImage}
          />
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {vehicle.featured && (
            <span className="bg-ivory-50 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-brand-950">
              Destaque
            </span>
          )}
          {vehicle.status === 'reserved' && (
            <span className="bg-brand-950 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
              Reservado
            </span>
          )}
        </div>
      </Link>

      <div className="p-5 sm:p-6">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-600">{vehicle.brand}</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-brand-950">{vehicle.model}</h2>
        {vehicle.version && <p className="mt-1 truncate text-sm text-slate-500">{vehicle.version}</p>}

        <p className="mt-5 text-2xl font-black tracking-[-0.025em] text-brand-800">{formatPrice(vehicle.price)}</p>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-brand-100 py-5">
          <Specification label="Ano" value={String(vehicle.modelYear ?? vehicle.year)} />
          <Specification label="Quilometragem" value={formatMileage(vehicle.mileage)} />
          <Specification label="Câmbio" value={formatTransmission(vehicle.transmission)} />
          <Specification label="Combustível" value={formatFuel(vehicle.fuel)} />
        </dl>

        <Link
          className="mt-5 flex min-h-12 w-full items-center justify-between text-sm font-bold text-brand-950 transition hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-800"
          to={`/veiculos/${vehicle._id}`}
        >
          Ver detalhes <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
