import type { VehicleStatus } from '../../types/vehicle';

const statusStyles: Record<VehicleStatus, string> = {
  available: 'bg-emerald-100 text-emerald-800',
  reserved: 'bg-amber-100 text-amber-800',
  sold: 'bg-slate-200 text-slate-700',
};

const statusLabels: Record<VehicleStatus, string> = {
  available: 'Disponível',
  reserved: 'Reservado',
  sold: 'Vendido',
};

interface StatusBadgeProps {
  status: VehicleStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[status]}`}>{statusLabels[status]}</span>;
}
