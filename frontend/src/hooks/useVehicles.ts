import { useCallback, useEffect, useState } from 'react';
import { vehicleService } from '../services/vehicleService';
import type { Vehicle, VehicleFilters } from '../types/vehicle';

export function useVehicles(filters: VehicleFilters = {}) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const reload = useCallback(() => {
    setRequestVersion((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVehicles(): Promise<void> {
      setIsLoading(true);
      setError(null);

      try {
        const data = await vehicleService.getAll(filters, controller.signal);
        setVehicles(data);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return;
        }

        setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os veículos.');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadVehicles();

    return () => controller.abort();
  }, [filters, requestVersion]);

  return { vehicles, isLoading, error, reload };
}
