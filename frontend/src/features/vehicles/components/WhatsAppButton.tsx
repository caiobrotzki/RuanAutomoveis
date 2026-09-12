import type { Vehicle } from '../../../types/vehicle';
import { createVehicleWhatsAppUrl } from '../../../utils/whatsapp';

interface WhatsAppButtonProps {
  vehicle: Vehicle;
}

export function WhatsAppButton({ vehicle }: WhatsAppButtonProps) {
  return (
    <a
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
      href={createVehicleWhatsAppUrl(vehicle)}
      rel="noreferrer"
      target="_blank"
    >
      <span aria-hidden="true">●</span>
      Falar pelo WhatsApp
    </a>
  );
}
