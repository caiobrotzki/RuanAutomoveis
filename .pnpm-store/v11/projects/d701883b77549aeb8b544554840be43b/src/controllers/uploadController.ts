import type { Request, Response } from 'express';
import { localStorageService } from '../services/storage/localStorageService.js';
import { ApiError } from '../utils/ApiError.js';

async function uploadImages(request: Request, response: Response): Promise<void> {
  const files = request.files as Express.Multer.File[] | undefined;
  if (!files?.length) throw new ApiError(400, 'Selecione pelo menos uma imagem.');
  response.status(201).json({ data: files.map((file) => localStorageService.getPublicUrl(file.filename)) });
}

export const uploadController = { uploadImages };
