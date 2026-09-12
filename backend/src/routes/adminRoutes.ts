import { Router } from 'express';
import { adminVehicleController } from '../controllers/adminVehicleController.js';
import { uploadController } from '../controllers/uploadController.js';
import { uploadVehicleImages } from '../middlewares/imageUpload.js';

export const adminRouter = Router();

adminRouter.get('/vehicles', adminVehicleController.getVehicles);
adminRouter.post('/vehicles', adminVehicleController.createVehicle);
adminRouter.put('/vehicles/:id', adminVehicleController.updateVehicle);
adminRouter.patch('/vehicles/:id', adminVehicleController.patchVehicle);
adminRouter.delete('/vehicles/:id', adminVehicleController.deleteVehicle);
adminRouter.post('/uploads/images', uploadVehicleImages, uploadController.uploadImages);
