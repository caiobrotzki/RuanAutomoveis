export type Transmission = 'manual' | 'automatic' | 'cvt';
export type Fuel = 'gasoline' | 'ethanol' | 'flex' | 'diesel' | 'electric' | 'hybrid';
export type VehicleStatus = 'available' | 'reserved' | 'sold';

export interface VehicleFilters {
  search?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  year?: string;
  fuel?: Fuel;
  transmission?: Transmission;
  featured?: 'true' | 'false';
}

export interface Vehicle {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface VehiclePayload {
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
  status: VehicleStatus;
  featured: boolean;
  images: string[];
}
