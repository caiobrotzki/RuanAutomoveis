import type { Request, Response } from 'express';
import { adminVehicleService } from '../services/adminVehicleService.js';
import { ApiError } from '../utils/ApiError.js';
import { vehiclePatchSchema, vehicleSchema } from '../validators/vehicleValidators.js';

async function getVehicles(_request: Request, response: Response): Promise<void> {
  const vehicles = await adminVehicleService.getAllVehicles();
  response.status(200).json({ data: vehicles });
}

async function createVehicle(request: Request, response: Response): Promise<void> {
  const validation = vehicleSchema.safeParse(request.body);
  if (!validation.success) throw new ApiError(400, validation.error.issues[0]?.message ?? 'Dados inválidos.');

  const vehicle = await adminVehicleService.createVehicle(validation.data);
  response.status(201).json({ data: vehicle });
}

async function updateVehicle(request: Request, response: Response): Promise<void> {
  const validation = vehicleSchema.safeParse(request.body);
  if (!validation.success) throw new ApiError(400, validation.error.issues[0]?.message ?? 'Dados inválidos.');

  const vehicle = await adminVehicleService.updateVehicle(request.params.id as string, validation.data);
  response.status(200).json({ data: vehicle });
}

async function patchVehicle(request: Request, response: Response): Promise<void> {
  const validation = vehiclePatchSchema.safeParse(request.body);
  if (!validation.success) throw new ApiError(400, validation.error.issues[0]?.message ?? 'Dados inválidos.');

  const vehicle = await adminVehicleService.updateVehicle(request.params.id as string, validation.data);
  response.status(200).json({ data: vehicle });
}

async function deleteVehicle(request: Request, response: Response): Promise<void> {
  await adminVehicleService.deleteVehicle(request.params.id as string);
  response.status(204).send();
}

export const adminVehicleController = { getVehicles, createVehicle, updateVehicle, patchVehicle, deleteVehicle };
