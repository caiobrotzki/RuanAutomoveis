import type { Vehicle } from '../types/vehicle';

const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '554796583403').replace(/\D/g, '');

export function createGeneralWhatsAppUrl(): string {
  const message = 'Olá! Gostaria de mais informações sobre os veículos da Ruan Automóveis.';
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function createVehicleWhatsAppUrl(vehicle: Vehicle): string {
  const message = `Olá, tenho interesse no veículo ${vehicle.brand} ${vehicle.model} ${vehicle.year}. Gostaria de mais informações.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
