import { useState } from 'react';
import type { VehicleFilters as VehicleFilterValues } from '../../../types/vehicle';
import type { VehicleFilterKey } from '../hooks/useVehicleFilters';
import { SearchBar } from './SearchBar';

interface VehicleFiltersProps {
  filters: VehicleFilterValues;
  activeFilterCount: number;
  onChange: (key: VehicleFilterKey, value: string) => void;
  onClear: () => void;
}

const inputClassName =
  'w-full border border-brand-200 bg-ivory-50 px-3 py-3 text-sm outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100';

export function VehicleFilters({ filters, activeFilterCount, onChange, onClear }: VehicleFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="border-y border-brand-200 bg-white p-4 sm:p-5 lg:sticky lg:top-24 lg:border">
      <div className="flex items-center justify-between gap-3">
        <button
          aria-controls="vehicle-filter-options"
          aria-expanded={isOpen}
          className="flex min-h-12 flex-1 items-center gap-3 text-left lg:pointer-events-none"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span className="grid size-11 shrink-0 place-items-center bg-brand-50 text-brand-800 lg:hidden">
            <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
              <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M10 14v6" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </span>
          <span className="text-xl font-black text-brand-950">Filtros</span>
          {activeFilterCount > 0 && (
            <span className="bg-brand-800 px-2.5 py-1 text-xs font-bold text-white lg:hidden">
              {activeFilterCount}
            </span>
          )}
          <svg
            aria-hidden="true"
            className={`ml-auto size-5 text-brand-800 transition-transform lg:hidden ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>

        {activeFilterCount > 0 && (
          <button
            className="shrink-0 text-sm font-bold text-brand-700 transition hover:text-brand-950"
            onClick={onClear}
            type="button"
          >
            Limpar ({activeFilterCount})
          </button>
        )}
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} mt-5 space-y-5 border-t border-brand-100 pt-5 lg:block lg:border-0 lg:pt-0`} id="vehicle-filter-options">
        <SearchBar onChange={(value) => onChange('search', value)} value={filters.search ?? ''} />

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-brand-950">Marca</span>
          <input
            className={inputClassName}
            defaultValue={filters.brand ?? ''}
            key={filters.brand ?? 'brand-empty'}
            onBlur={(event) => onChange('brand', event.target.value)}
            placeholder="Ex.: Toyota"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className="mb-2 block text-sm font-bold text-brand-950">Preço mínimo</span>
            <input
              className={inputClassName}
              defaultValue={filters.minPrice ?? ''}
              key={filters.minPrice ?? 'min-empty'}
              min="0"
              onBlur={(event) => onChange('minPrice', event.target.value)}
              placeholder="R$"
              type="number"
            />
          </label>
          <label>
            <span className="mb-2 block text-sm font-bold text-brand-950">Preço máximo</span>
            <input
              className={inputClassName}
              defaultValue={filters.maxPrice ?? ''}
              key={filters.maxPrice ?? 'max-empty'}
              min="0"
              onBlur={(event) => onChange('maxPrice', event.target.value)}
              placeholder="R$"
              type="number"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-brand-950">Ano</span>
          <input
            className={inputClassName}
            max={new Date().getFullYear() + 1}
            min="1886"
            onChange={(event) => onChange('year', event.target.value)}
            value={filters.year ?? ''}
            type="number"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-brand-950">Combustível</span>
          <select className={inputClassName} onChange={(event) => onChange('fuel', event.target.value)} value={filters.fuel ?? ''}>
            <option value="">Todos</option>
            <option value="gasoline">Gasolina</option>
            <option value="ethanol">Etanol</option>
            <option value="flex">Flex</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Elétrico</option>
            <option value="hybrid">Híbrido</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-brand-950">Câmbio</span>
          <select className={inputClassName} onChange={(event) => onChange('transmission', event.target.value)} value={filters.transmission ?? ''}>
            <option value="">Todos</option>
            <option value="manual">Manual</option>
            <option value="automatic">Automático</option>
            <option value="cvt">CVT</option>
          </select>
        </label>

        <label className="flex cursor-pointer items-center gap-3 bg-brand-50 px-4 py-3 text-sm font-bold text-brand-900">
          <input
            checked={filters.featured === 'true'}
            className="size-5 accent-brand-700"
            onChange={(event) => onChange('featured', event.target.checked ? 'true' : '')}
            type="checkbox"
          />
          Somente veículos em destaque
        </label>
      </div>
    </aside>
  );
}
