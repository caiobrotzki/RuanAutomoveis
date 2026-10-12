import type { Vehicle } from '../../../types/vehicle';
import { createVehicleWhatsAppUrl } from '../../../utils/whatsapp';

interface WhatsAppButtonProps {
  vehicle: Vehicle;
}

export function WhatsAppButton({ vehicle }: WhatsAppButtonProps) {
  return (
    <a
      aria-label={`Falar pelo WhatsApp sobre ${vehicle.brand} ${vehicle.model}`}
      className="flex min-h-12 w-full items-center justify-center gap-2.5 bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#20bd5a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      href={createVehicleWhatsAppUrl(vehicle)}
      rel="noreferrer"
      target="_blank"
    >
      <svg aria-hidden="true" className="size-5 shrink-0" fill="none" viewBox="0 0 24 24">
        <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.45L3 20.45l1.3-4.72A8.5 8.5 0 1 1 20.5 11.7Z" fill="currentColor" />
        <path d="M8.2 7.3c.2-.45.4-.46.72-.47h.62c.18 0 .36.04.46.34l.78 1.9c.08.22.04.4-.1.59l-.6.75c-.15.18-.22.34-.08.58.51.9 1.18 1.67 2.04 2.3.28.2.5.16.68-.06l.86-1.08c.18-.22.37-.26.62-.16l2.02.96c.26.12.43.18.46.38.04.2-.05 1.12-.52 1.75-.47.64-1.36 1.03-2.18 1.03-.65 0-1.48-.18-2.8-.75a10.2 10.2 0 0 1-4.36-3.83C5.9 10.12 5.82 9.1 6.05 8.35c.2-.62.55-.94.78-1.05.23-.1.48 0 .48 0h.89Z" fill="#25D366" />
      </svg>
      Falar pelo WhatsApp
    </a>
  );
}
