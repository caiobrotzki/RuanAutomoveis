import { unlink } from 'node:fs/promises';
import path from 'node:path';
import { env } from '../../config/env.js';
import type { StorageService } from './storageService.js';

const uploadDirectory = path.resolve('uploads');
const localUploadPrefix = `${env.publicUrl}/uploads/`;

function getPublicUrl(filename: string): string {
  return `${localUploadPrefix}${encodeURIComponent(filename)}`;
}

async function removeByUrl(url: string): Promise<void> {
  if (!url.startsWith(localUploadPrefix)) return;
  const filename = decodeURIComponent(url.slice(localUploadPrefix.length));
  if (!filename || filename !== path.basename(filename)) return;

  try {
    await unlink(path.join(uploadDirectory, filename));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
}

export const localStorageService: StorageService = { getPublicUrl, removeByUrl };
