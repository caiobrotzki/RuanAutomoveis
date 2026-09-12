import mongoose from 'mongoose';
import { env } from './env.js';

mongoose.set('bufferCommands', false);

export async function connectToDatabase(): Promise<void> {
  await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 5_000,
  });
}

export async function disconnectFromDatabase(): Promise<void> {
  await mongoose.disconnect();
}
