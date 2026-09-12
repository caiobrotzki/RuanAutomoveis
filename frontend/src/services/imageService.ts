import type { ApiResponse } from '../types/api';
import { apiRequest } from './api';

async function upload(token: string, files: File[]): Promise<string[]> {
  const body = new FormData();
  files.forEach((file) => body.append('images', file));
  const response = await apiRequest<ApiResponse<string[]>>('/admin/uploads/images', {
    method: 'POST', headers: { Authorization: `Bearer ${token}` }, body,
  });
  return response.data;
}

export const imageService = { upload };
