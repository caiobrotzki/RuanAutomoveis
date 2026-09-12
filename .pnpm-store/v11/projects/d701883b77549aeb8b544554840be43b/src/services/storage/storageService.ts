export interface StorageService {
  getPublicUrl(filename: string): string;
  removeByUrl(url: string): Promise<void>;
}
