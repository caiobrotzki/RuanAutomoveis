import type { Request, Response } from 'express';
import { vehicleService } from '../services/vehicleService.js';
import { ApiError } from '../utils/ApiError.js';
import { vehicleQuerySchema } from '../validators/vehicleQueryValidator.js';

async function getVehicles(request: Request, response: Response): Promise<void> {
  const validation = vehicleQuerySchema.safeParse(request.query);
  if (!validation.success) throw new ApiError(400, validation.error.issues[0]?.message ?? 'Filtros inválidos.');
  const vehicles = await vehicleService.getPublicVehicles(validation.data);

  response.status(200).json({ data: vehicles });
}

async function getVehicleById(request: Request, response: Response): Promise<void> {
  const vehicle = await vehicleService.getPublicVehicleById(request.params.id as string);

  response.status(200).json({ data: vehicle });
}

export const vehicleController = {
  getVehicles,
  getVehicleById,
};
