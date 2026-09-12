import { model, Schema } from 'mongoose';
import { FUELS, TRANSMISSIONS, VEHICLE_STATUSES, type Vehicle } from '../types/vehicle.js';

const maximumVehicleYear = new Date().getFullYear() + 1;

const vehicleSchema = new Schema<Vehicle>(
  {
    brand: {
      type: String,
      required: [true, 'A marca é obrigatória.'],
      trim: true,
      maxlength: [80, 'A marca deve ter no máximo 80 caracteres.'],
    },
    model: {
      type: String,
      required: [true, 'O modelo é obrigatório.'],
      trim: true,
      maxlength: [120, 'O modelo deve ter no máximo 120 caracteres.'],
    },
    version: {
      type: String,
      trim: true,
      maxlength: [120, 'A versão deve ter no máximo 120 caracteres.'],
    },
    year: {
      type: Number,
      required: [true, 'O ano é obrigatório.'],
      min: [1886, 'O ano deve ser igual ou posterior a 1886.'],
      max: [maximumVehicleYear, `O ano deve ser igual ou anterior a ${maximumVehicleYear}.`],
    },
    modelYear: {
      type: Number,
      min: [1886, 'O ano do modelo deve ser igual ou posterior a 1886.'],
      max: [maximumVehicleYear, `O ano do modelo deve ser igual ou anterior a ${maximumVehicleYear}.`],
    },
    price: {
      type: Number,
      required: [true, 'O preço é obrigatório.'],
      min: [0, 'O preço não pode ser negativo.'],
    },
    mileage: {
      type: Number,
      default: 0,
      min: [0, 'A quilometragem não pode ser negativa.'],
    },
    transmission: {
      type: String,
      enum: TRANSMISSIONS,
      default: 'manual',
    },
    fuel: {
      type: String,
      enum: FUELS,
      default: 'flex',
    },
    color: {
      type: String,
      trim: true,
      maxlength: [50, 'A cor deve ter no máximo 50 caracteres.'],
    },
    doors: {
      type: Number,
      min: [1, 'O veículo deve ter pelo menos uma porta.'],
      max: [6, 'O veículo deve ter no máximo seis portas.'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [5_000, 'A descrição deve ter no máximo 5.000 caracteres.'],
    },
    features: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: VEHICLE_STATUSES,
      default: 'available',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

vehicleSchema.index({ status: 1, featured: 1, createdAt: -1 });
vehicleSchema.index({ brand: 1, model: 1 });

export const VehicleModel = model<Vehicle>('Vehicle', vehicleSchema);
