import type { Fuel, Transmission } from '../types/vehicle';

const fuelLabels: Record<Fuel, string> = {
  gasoline: 'Gasolina',
  ethanol: 'Etanol',
  flex: 'Flex',
  diesel: 'Diesel',
  electric: 'Elétrico',
  hybrid: 'Híbrido',
};

const transmissionLabels: Record<Transmission, string> = {
  manual: 'Manual',
  automatic: 'Automático',
  cvt: 'CVT',
};

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMileage(value: number): string {
  return `${new Intl.NumberFormat('pt-BR').format(value)} km`;
}

export function formatFuel(value: Fuel): string {
  return fuelLabels[value];
}

export function formatTransmission(value: Transmission): string {
  return transmissionLabels[value];
}
