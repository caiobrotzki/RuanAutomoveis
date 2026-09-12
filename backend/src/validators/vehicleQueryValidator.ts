import { z } from 'zod';
import { FUELS, TRANSMISSIONS } from '../types/vehicle.js';

const optionalNumber = z.string().trim().min(1).transform(Number).pipe(z.number().finite().nonnegative()).optional();
const optionalYear = z.string().trim().regex(/^\d{4}$/, 'O ano deve possuir quatro dígitos.').transform(Number).pipe(z.number().int().min(1886).max(new Date().getFullYear() + 1)).optional();

export const vehicleQuerySchema = z.object({
  search: z.string().trim().max(120).optional(),
  brand: z.string().trim().max(80).optional(),
  minPrice: optionalNumber,
  maxPrice: optionalNumber,
  year: optionalYear,
  fuel: z.enum(FUELS, { error: 'Combustível inválido.' }).optional(),
  transmission: z.enum(TRANSMISSIONS, { error: 'Câmbio inválido.' }).optional(),
  featured: z.enum(['true', 'false'], { error: 'Destaque deve ser true ou false.' }).transform((value) => value === 'true').optional(),
}).refine((query) => query.minPrice === undefined || query.maxPrice === undefined || query.minPrice <= query.maxPrice, {
  message: 'O preço mínimo não pode ser maior que o preço máximo.',
});

export type VehicleQuery = z.infer<typeof vehicleQuerySchema>;
