import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Fuel, Transmission, VehicleFilters } from '../../../types/vehicle';

export type VehicleFilterKey = keyof VehicleFilters;

export function useVehicleFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const fuel = searchParams.get('fuel');
  const transmission = searchParams.get('transmission');
  const featured = searchParams.get('featured');
  const filters: VehicleFilters = useMemo(() => ({
    ...(searchParams.get('search') && { search: searchParams.get('search') as string }),
    ...(searchParams.get('brand') && { brand: searchParams.get('brand') as string }),
    ...(searchParams.get('minPrice') && { minPrice: searchParams.get('minPrice') as string }),
    ...(searchParams.get('maxPrice') && { maxPrice: searchParams.get('maxPrice') as string }),
    ...(searchParams.get('year') && { year: searchParams.get('year') as string }),
    ...(fuel && { fuel: fuel as Fuel }),
    ...(transmission && { transmission: transmission as Transmission }),
    ...(featured && { featured: featured as 'true' | 'false' }),
  }), [featured, fuel, searchParams, transmission]);

  const setFilter = useCallback((key: VehicleFilterKey, value: string) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      const normalized = value.trim();
      if (normalized) next.set(key, normalized); else next.delete(key);
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const clearFilters = useCallback(() => setSearchParams({}, { replace: true }), [setSearchParams]);
  return { filters, setFilter, clearFilters, activeFilterCount: Object.values(filters).filter(Boolean).length };
}
