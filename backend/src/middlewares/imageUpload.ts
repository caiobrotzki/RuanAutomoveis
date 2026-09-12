import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import { ApiError } from '../utils/ApiError.js';

const uploadDirectory = path.resolve('uploads');
mkdirSync(uploadDirectory, { recursive: true });

const allowedMimeTypes = new Map([['image/jpeg', '.jpg'], ['image/png', '.png'], ['image/webp', '.webp']]);

export const uploadVehicleImages = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (_request, file, callback) => callback(null, `${randomUUID()}${allowedMimeTypes.get(file.mimetype) ?? ''}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
  fileFilter: (_request, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(new ApiError(400, 'Formato inválido. Envie imagens JPEG, PNG ou WebP.'));
      return;
    }
    callback(null, true);
  },
}).array('images', 10);
