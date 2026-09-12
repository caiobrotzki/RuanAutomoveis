import { Router } from 'express';
import { vehicleController } from '../controllers/vehicleController.js';

export const vehicleRouter = Router();

vehicleRouter.get('/', vehicleController.getVehicles);
vehicleRouter.get('/:id', vehicleController.getVehicleById);
