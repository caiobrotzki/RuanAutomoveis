import { app } from './app.js';
import { connectToDatabase, disconnectFromDatabase } from './config/database.js';
import { env } from './config/env.js';

async function startServer(): Promise<void> {
  try {
    await connectToDatabase();
    console.log('MongoDB conectado.');

    const server = app.listen(env.port, () => {
      console.log(`API disponível em http://localhost:${env.port}/api`);
    });

    async function shutdown(signal: string): Promise<void> {
      console.log(`${signal} recebido. Encerrando a aplicação...`);

      await new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });

      await disconnectFromDatabase();
      process.exit(0);
    }

    function handleShutdown(signal: string): void {
      void shutdown(signal).catch((error: unknown) => {
        console.error('Erro ao encerrar a aplicação.', error);
        process.exit(1);
      });
    }

    process.once('SIGINT', () => handleShutdown('SIGINT'));
    process.once('SIGTERM', () => handleShutdown('SIGTERM'));
  } catch (error) {
    console.error('Não foi possível iniciar a aplicação.', error);
    process.exitCode = 1;
  }
}

void startServer();
