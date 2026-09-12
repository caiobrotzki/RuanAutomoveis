export const TRANSMISSIONS = ['manual', 'automatic', 'cvt'] as const;
export const FUELS = ['gasoline', 'ethanol', 'flex', 'diesel', 'electric', 'hybrid'] as const;
export const VEHICLE_STATUSES = ['available', 'reserved', 'sold'] as const;

export type Transmission = (typeof TRANSMISSIONS)[number];
export type Fuel = (typeof FUELS)[number];
export type VehicleStatus = (typeof VEHICLE_STATUSES)[number];

export interface Vehicle {
  brand: string;
  model: string;
  version?: string;
  year: number;
  modelYear?: number;
  price: number;
  mileage: number;
  transmission: Transmission;
  fuel: Fuel;
  color?: string;
  doors?: number;
  description?: string;
  features: string[];
  images: string[];
  status: VehicleStatus;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
