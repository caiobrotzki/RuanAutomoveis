import type { ApiResponse } from '../types/api';
import type { Vehicle, VehicleFilters } from '../types/vehicle';
import { apiRequest } from './api';

async function getAll(filters: VehicleFilters = {}, signal?: AbortSignal): Promise<Vehicle[]> {
  const parameters = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => { if (value) parameters.set(key, value); });
  const query = parameters.size ? `?${parameters.toString()}` : '';
  const response = await apiRequest<ApiResponse<Vehicle[]>>(`/vehicles${query}`, { signal });
  return response.data;
}

async function getById(id: string, signal?: AbortSignal): Promise<Vehicle> {
  const response = await apiRequest<ApiResponse<Vehicle>>(`/vehicles/${id}`, { signal });
  return response.data;
}

export const vehicleService = {
  getAll,
  getById,
};
