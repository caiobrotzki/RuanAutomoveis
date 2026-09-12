import { z } from 'zod';
import { FUELS, TRANSMISSIONS, VEHICLE_STATUSES } from '../types/vehicle.js';

const maximumVehicleYear = new Date().getFullYear() + 1;

const optionalText = (maximum: number) =>
  z.string().trim().max(maximum).optional().transform((value) => value || undefined);

export const vehicleSchema = z.object({
  brand: z.string().trim().min(1, 'A marca é obrigatória.').max(80),
  model: z.string().trim().min(1, 'O modelo é obrigatório.').max(120),
  version: optionalText(120),
  year: z.number().int().min(1886).max(maximumVehicleYear),
  modelYear: z.number().int().min(1886).max(maximumVehicleYear).optional(),
  price: z.number().min(0, 'O preço não pode ser negativo.'),
  mileage: z.number().min(0, 'A quilometragem não pode ser negativa.').default(0),
  transmission: z.enum(TRANSMISSIONS).default('manual'),
  fuel: z.enum(FUELS).default('flex'),
  color: optionalText(50),
  doors: z.number().int().min(1).max(6).optional(),
  description: optionalText(5_000),
  features: z.array(z.string().trim().min(1).max(120)).max(100).default([]),
  images: z.array(z.string().trim().min(1).max(2_000)).max(30).optional(),
  status: z.enum(VEHICLE_STATUSES).default('available'),
  featured: z.boolean().default(false),
});

export const vehiclePatchSchema = vehicleSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  'Informe pelo menos um campo para atualização.',
);

export type VehicleInput = z.infer<typeof vehicleSchema>;
export type VehiclePatchInput = z.infer<typeof vehiclePatchSchema>;
