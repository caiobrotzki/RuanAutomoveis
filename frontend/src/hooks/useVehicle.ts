import { useCallback, useEffect, useState } from 'react';
import { vehicleService } from '../services/vehicleService';
import type { Vehicle } from '../types/vehicle';

export function useVehicle(id: string | undefined) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const reload = useCallback(() => {
    setRequestVersion((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVehicle(): Promise<void> {
      if (!id) {
        setError('Veículo não informado.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await vehicleService.getById(id, controller.signal);
        setVehicle(data);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return;
        }

        setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar o veículo.');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadVehicle();
    return () => controller.abort();
  }, [id, requestVersion]);

  return { vehicle, isLoading, error, reload };
}
