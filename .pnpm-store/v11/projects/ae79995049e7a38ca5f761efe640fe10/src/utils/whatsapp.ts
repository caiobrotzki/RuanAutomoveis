import type { Vehicle } from '../types/vehicle';

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');

export function createVehicleWhatsAppUrl(vehicle: Vehicle): string {
  const message = `Olá, tenho interesse no veículo ${vehicle.brand} ${vehicle.model} ${vehicle.year}. Gostaria de mais informações.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
