import { useCallback, useEffect, useState } from 'react';
import { ApiRequestError } from '../../../services/api';
import { adminVehicleService } from '../../../services/adminVehicleService';
import type { Vehicle } from '../../../types/vehicle';
import { useAuth } from './useAuth';

export function useAdminVehicles() {
  const { token, logout } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const reload = useCallback(() => setRequestVersion((current) => current + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVehicles(): Promise<void> {
      if (!token) return;

      setIsLoading(true);
      setError(null);

      try {
        setVehicles(await adminVehicleService.getAll(token, controller.signal));
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;

        if (requestError instanceof ApiRequestError && requestError.status === 401) {
          logout();
          return;
        }

        setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os veículos.');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadVehicles();
    return () => controller.abort();
  }, [logout, requestVersion, token]);

  return { vehicles, isLoading, error, reload };
}
