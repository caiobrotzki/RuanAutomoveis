import { connectToDatabase, disconnectFromDatabase } from '../config/database.js';
import { AdminModel } from '../models/Admin.js';

function readRequiredVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Defina a variável ${name} antes de executar o script.`);
  }

  return value;
}

async function createAdmin(): Promise<void> {
  try {
    const name = readRequiredVariable('ADMIN_NAME');
    const email = readRequiredVariable('ADMIN_EMAIL').toLowerCase();
    const password = readRequiredVariable('ADMIN_PASSWORD');

    if (password.length < 8) {
      throw new Error('ADMIN_PASSWORD deve ter pelo menos 8 caracteres.');
    }

    await connectToDatabase();

    const existingAdmin = await AdminModel.exists({ email });
    if (existingAdmin) {
      throw new Error('Já existe um administrador com este e-mail.');
    }

    await AdminModel.create({ name, email, password });
    console.log('Administrador criado com sucesso.');
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Não foi possível criar o administrador.');
    process.exitCode = 1;
  } finally {
    await disconnectFromDatabase();
  }
}

void createAdmin();
