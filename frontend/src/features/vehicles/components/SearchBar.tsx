import { useEffect, useState } from 'react';

interface SearchBarProps { value: string; onChange: (value: string) => void }

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => setLocalValue(value), [value]);
  useEffect(() => {
    if (localValue === value) return;
    const timeout = window.setTimeout(() => onChange(localValue), 400);
    return () => window.clearTimeout(timeout);
  }, [localValue, onChange, value]);

  return <label className="block"><span className="mb-2 block text-sm font-bold text-brand-950">Buscar veículo</span><div className="relative"><span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span><input className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100" onChange={(event) => setLocalValue(event.target.value)} placeholder="Marca, modelo ou versão" type="search" value={localValue} /></div></label>;
}
