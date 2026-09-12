import type { VehicleFilters as VehicleFilterValues } from '../../../types/vehicle';
import type { VehicleFilterKey } from '../hooks/useVehicleFilters';
import { SearchBar } from './SearchBar';

interface VehicleFiltersProps {
  filters: VehicleFilterValues;
  activeFilterCount: number;
  onChange: (key: VehicleFilterKey, value: string) => void;
  onClear: () => void;
}

const inputClassName = 'w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100';

export function VehicleFilters({ filters, activeFilterCount, onChange, onClear }: VehicleFiltersProps) {
  return <aside className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
    <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Refine sua busca</p><h2 className="mt-1 text-xl font-black text-brand-950">Filtros</h2></div>{activeFilterCount > 0 && <button className="text-sm font-bold text-brand-700 hover:text-brand-950" onClick={onClear} type="button">Limpar ({activeFilterCount})</button>}</div>
    <div className="mt-6 space-y-5">
      <SearchBar onChange={(value) => onChange('search', value)} value={filters.search ?? ''} />
      <label className="block"><span className="mb-2 block text-sm font-bold text-brand-950">Marca</span><input className={inputClassName} defaultValue={filters.brand ?? ''} key={filters.brand ?? 'brand-empty'} onBlur={(event) => onChange('brand', event.target.value)} placeholder="Ex.: Toyota" /></label>
      <div className="grid grid-cols-2 gap-3"><label><span className="mb-2 block text-sm font-bold text-brand-950">Preço mínimo</span><input className={inputClassName} defaultValue={filters.minPrice ?? ''} key={filters.minPrice ?? 'min-empty'} min="0" onBlur={(event) => onChange('minPrice', event.target.value)} placeholder="R$" type="number" /></label><label><span className="mb-2 block text-sm font-bold text-brand-950">Preço máximo</span><input className={inputClassName} defaultValue={filters.maxPrice ?? ''} key={filters.maxPrice ?? 'max-empty'} min="0" onBlur={(event) => onChange('maxPrice', event.target.value)} placeholder="R$" type="number" /></label></div>
      <label className="block"><span className="mb-2 block text-sm font-bold text-brand-950">Ano</span><input className={inputClassName} max={new Date().getFullYear() + 1} min="1886" onChange={(event) => onChange('year', event.target.value)} value={filters.year ?? ''} type="number" /></label>
      <label className="block"><span className="mb-2 block text-sm font-bold text-brand-950">Combustível</span><select className={inputClassName} onChange={(event) => onChange('fuel', event.target.value)} value={filters.fuel ?? ''}><option value="">Todos</option><option value="gasoline">Gasolina</option><option value="ethanol">Etanol</option><option value="flex">Flex</option><option value="diesel">Diesel</option><option value="electric">Elétrico</option><option value="hybrid">Híbrido</option></select></label>
      <label className="block"><span className="mb-2 block text-sm font-bold text-brand-950">Câmbio</span><select className={inputClassName} onChange={(event) => onChange('transmission', event.target.value)} value={filters.transmission ?? ''}><option value="">Todos</option><option value="manual">Manual</option><option value="automatic">Automático</option><option value="cvt">CVT</option></select></label>
      <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-brand-50 px-4 py-3 text-sm font-bold text-brand-900"><input checked={filters.featured === 'true'} className="size-5 accent-brand-700" onChange={(event) => onChange('featured', event.target.checked ? 'true' : '')} type="checkbox" />Somente veículos em destaque</label>
    </div>
  </aside>;
}
