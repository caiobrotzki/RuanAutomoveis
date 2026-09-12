import type { ApiResponse } from '../types/api';
import type { Vehicle, VehiclePayload } from '../types/vehicle';
import { apiRequest } from './api';

async function getAll(token: string, signal?: AbortSignal): Promise<Vehicle[]> {
  const response = await apiRequest<ApiResponse<Vehicle[]>>('/admin/vehicles', {
    signal,
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

async function create(token: string, data: VehiclePayload): Promise<Vehicle> {
  const response = await apiRequest<ApiResponse<Vehicle>>('/admin/vehicles', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return response.data;
}

async function update(token: string, id: string, data: VehiclePayload): Promise<Vehicle> {
  const response = await apiRequest<ApiResponse<Vehicle>>(`/admin/vehicles/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return response.data;
}

async function patch(token: string, id: string, data: Partial<VehiclePayload>): Promise<Vehicle> {
  const response = await apiRequest<ApiResponse<Vehicle>>(`/admin/vehicles/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return response.data;
}

async function remove(token: string, id: string): Promise<void> {
  await apiRequest<void>(`/admin/vehicles/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const adminVehicleService = { getAll, create, update, patch, remove };
