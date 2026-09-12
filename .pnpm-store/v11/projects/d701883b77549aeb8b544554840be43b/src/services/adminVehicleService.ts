import { isValidObjectId } from 'mongoose';
import { VehicleModel } from '../models/Vehicle.js';
import { localStorageService } from './storage/localStorageService.js';
import { ApiError } from '../utils/ApiError.js';
import type { VehicleInput, VehiclePatchInput } from '../validators/vehicleValidators.js';

async function getAllVehicles() {
  return VehicleModel.find().sort({ createdAt: -1 }).lean().exec();
}

async function createVehicle(data: VehicleInput) {
  return (await VehicleModel.create(data)).toObject();
}

async function updateVehicle(id: string, data: VehicleInput | VehiclePatchInput) {
  if (!isValidObjectId(id)) throw new ApiError(400, 'ID de veículo inválido.');

  const previousVehicle = await VehicleModel.findById(id).select('images').lean().exec();
  if (!previousVehicle) throw new ApiError(404, 'Veículo não encontrado.');

  const vehicle = await VehicleModel.findByIdAndUpdate(id, { $set: data }, { returnDocument: 'after', runValidators: true })
    .lean()
    .exec();

  if (!vehicle) throw new ApiError(404, 'Veículo não encontrado.');

  if (data.images) {
    const retainedImages = new Set(data.images);
    await Promise.all(previousVehicle.images.filter((url) => !retainedImages.has(url)).map((url) => localStorageService.removeByUrl(url)));
  }
  return vehicle;
}

async function deleteVehicle(id: string): Promise<void> {
  if (!isValidObjectId(id)) throw new ApiError(400, 'ID de veículo inválido.');

  const vehicle = await VehicleModel.findByIdAndDelete(id).lean().exec();
  if (!vehicle) throw new ApiError(404, 'Veículo não encontrado.');
  await Promise.all(vehicle.images.map((url) => localStorageService.removeByUrl(url)));
}

export const adminVehicleService = { getAllVehicles, createVehicle, updateVehicle, deleteVehicle };
