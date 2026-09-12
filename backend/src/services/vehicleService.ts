import { isValidObjectId, type QueryFilter } from 'mongoose';
import { VehicleModel } from '../models/Vehicle.js';
import type { Vehicle } from '../types/vehicle.js';
import { ApiError } from '../utils/ApiError.js';
import type { VehicleQuery } from '../validators/vehicleQueryValidator.js';

function escapeRegularExpression(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function getPublicVehicles(query: VehicleQuery = {}) {
  const filter: QueryFilter<Vehicle> = { status: { $in: ['available', 'reserved'] } };

  if (query.brand) filter.brand = { $regex: `^${escapeRegularExpression(query.brand)}$`, $options: 'i' };
  if (query.year !== undefined) filter.year = query.year;
  if (query.fuel) filter.fuel = query.fuel;
  if (query.transmission) filter.transmission = query.transmission;
  if (query.featured !== undefined) filter.featured = query.featured;
  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    filter.price = {
      ...(query.minPrice !== undefined && { $gte: query.minPrice }),
      ...(query.maxPrice !== undefined && { $lte: query.maxPrice }),
    };
  }
  if (query.search) {
    const expression = new RegExp(escapeRegularExpression(query.search), 'i');
    filter.$or = [{ brand: expression }, { model: expression }, { version: expression }];
  }

  return VehicleModel.find(filter)
    .sort({ featured: -1, createdAt: -1 })
    .lean()
    .exec();
}

async function getPublicVehicleById(id: string) {
  if (!isValidObjectId(id)) {
    throw new ApiError(400, 'ID de veículo inválido.');
  }

  const vehicle = await VehicleModel.findById(id).lean().exec();

  if (!vehicle) {
    throw new ApiError(404, 'Veículo não encontrado.');
  }

  return vehicle;
}

export const vehicleService = {
  getPublicVehicles,
  getPublicVehicleById,
};
