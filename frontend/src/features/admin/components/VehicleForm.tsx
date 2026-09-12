import { useState, type FormEvent } from 'react';
import type { Fuel, Transmission, Vehicle, VehiclePayload, VehicleStatus } from '../../../types/vehicle';
import { fieldClassName, FormField } from './FormField';
import { ImageUploader } from './ImageUploader';

interface VehicleFormProps {
  initialVehicle?: Vehicle;
  isSubmitting: boolean;
  submitLabel: string;
  onSubmit: (data: VehiclePayload) => Promise<void>;
}

interface FormValues {
  brand: string;
  model: string;
  version: string;
  year: string;
  modelYear: string;
  price: string;
  mileage: string;
  transmission: Transmission;
  fuel: Fuel;
  color: string;
  doors: string;
  description: string;
  features: string;
  status: VehicleStatus;
  featured: boolean;
}

function createInitialValues(vehicle?: Vehicle): FormValues {
  return {
    brand: vehicle?.brand ?? '',
    model: vehicle?.model ?? '',
    version: vehicle?.version ?? '',
    year: vehicle ? String(vehicle.year) : '',
    modelYear: vehicle?.modelYear ? String(vehicle.modelYear) : '',
    price: vehicle ? String(vehicle.price) : '',
    mileage: vehicle ? String(vehicle.mileage) : '0',
    transmission: vehicle?.transmission ?? 'manual',
    fuel: vehicle?.fuel ?? 'flex',
    color: vehicle?.color ?? '',
    doors: vehicle?.doors ? String(vehicle.doors) : '',
    description: vehicle?.description ?? '',
    features: vehicle?.features.join('\n') ?? '',
    status: vehicle?.status ?? 'available',
    featured: vehicle?.featured ?? false,
  };
}

export function VehicleForm({ initialVehicle, isSubmitting, submitLabel, onSubmit }: VehicleFormProps) {
  const [values, setValues] = useState<FormValues>(() => createInitialValues(initialVehicle));
  const [images, setImages] = useState<string[]>(initialVehicle?.images ?? []);

  function updateValue<Key extends keyof FormValues>(key: Key, value: FormValues[Key]): void {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const payload: VehiclePayload = {
      brand: values.brand,
      model: values.model,
      year: Number(values.year),
      price: Number(values.price),
      mileage: Number(values.mileage),
      transmission: values.transmission,
      fuel: values.fuel,
      features: values.features.split(/[\n,]/).map((item) => item.trim()).filter(Boolean),
      status: values.status,
      featured: values.featured,
      images,
      ...(values.version.trim() && { version: values.version }),
      ...(values.modelYear && { modelYear: Number(values.modelYear) }),
      ...(values.color.trim() && { color: values.color }),
      ...(values.doors && { doors: Number(values.doors) }),
      ...(values.description.trim() && { description: values.description }),
    };

    await onSubmit(payload);
  }

  return (
    <form className="space-y-8" onSubmit={(event) => void handleSubmit(event)}>
      <section className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-black text-brand-950">Identificação</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FormField htmlFor="brand" label="Marca" required>
            <input className={fieldClassName} id="brand" maxLength={80} onChange={(e) => updateValue('brand', e.target.value)} required value={values.brand} />
          </FormField>
          <FormField htmlFor="model" label="Modelo" required>
            <input className={fieldClassName} id="model" maxLength={120} onChange={(e) => updateValue('model', e.target.value)} required value={values.model} />
          </FormField>
          <FormField htmlFor="version" label="Versão">
            <input className={fieldClassName} id="version" maxLength={120} onChange={(e) => updateValue('version', e.target.value)} value={values.version} />
          </FormField>
          <FormField htmlFor="year" label="Ano" required>
            <input className={fieldClassName} id="year" min="1886" onChange={(e) => updateValue('year', e.target.value)} required type="number" value={values.year} />
          </FormField>
          <FormField htmlFor="modelYear" label="Ano modelo">
            <input className={fieldClassName} id="modelYear" min="1886" onChange={(e) => updateValue('modelYear', e.target.value)} type="number" value={values.modelYear} />
          </FormField>
          <FormField htmlFor="color" label="Cor">
            <input className={fieldClassName} id="color" maxLength={50} onChange={(e) => updateValue('color', e.target.value)} value={values.color} />
          </FormField>
        </div>
      </section>

      <section className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-black text-brand-950">Dados do veículo</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FormField htmlFor="price" label="Preço" required>
            <input className={fieldClassName} id="price" min="0" onChange={(e) => updateValue('price', e.target.value)} required step="0.01" type="number" value={values.price} />
          </FormField>
          <FormField htmlFor="mileage" label="Quilometragem" required>
            <input className={fieldClassName} id="mileage" min="0" onChange={(e) => updateValue('mileage', e.target.value)} required type="number" value={values.mileage} />
          </FormField>
          <FormField htmlFor="doors" label="Portas">
            <input className={fieldClassName} id="doors" max="6" min="1" onChange={(e) => updateValue('doors', e.target.value)} type="number" value={values.doors} />
          </FormField>
          <FormField htmlFor="transmission" label="Câmbio" required>
            <select className={fieldClassName} id="transmission" onChange={(e) => updateValue('transmission', e.target.value as Transmission)} value={values.transmission}>
              <option value="manual">Manual</option><option value="automatic">Automático</option><option value="cvt">CVT</option>
            </select>
          </FormField>
          <FormField htmlFor="fuel" label="Combustível" required>
            <select className={fieldClassName} id="fuel" onChange={(e) => updateValue('fuel', e.target.value as Fuel)} value={values.fuel}>
              <option value="gasoline">Gasolina</option><option value="ethanol">Etanol</option><option value="flex">Flex</option><option value="diesel">Diesel</option><option value="electric">Elétrico</option><option value="hybrid">Híbrido</option>
            </select>
          </FormField>
          <FormField htmlFor="status" label="Status" required>
            <select className={fieldClassName} id="status" onChange={(e) => updateValue('status', e.target.value as VehicleStatus)} value={values.status}>
              <option value="available">Disponível</option><option value="reserved">Reservado</option><option value="sold">Vendido</option>
            </select>
          </FormField>
        </div>
      </section>

      <section className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-black text-brand-950">Apresentação</h2>
        <div className="mt-6 space-y-5">
          <FormField htmlFor="description" label="Descrição">
            <textarea className={fieldClassName} id="description" maxLength={5000} onChange={(e) => updateValue('description', e.target.value)} rows={5} value={values.description} />
          </FormField>
          <FormField htmlFor="features" label="Opcionais — um por linha">
            <textarea className={fieldClassName} id="features" onChange={(e) => updateValue('features', e.target.value)} placeholder={'Ar-condicionado\nDireção elétrica\nCentral multimídia'} rows={7} value={values.features} />
          </FormField>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-brand-50 px-4 py-3 text-sm font-bold text-brand-900">
            <input checked={values.featured} className="size-5 accent-brand-700" onChange={(e) => updateValue('featured', e.target.checked)} type="checkbox" />
            Marcar veículo como destaque
          </label>
          <ImageUploader images={images} onChange={setImages} />
        </div>
      </section>

      <div className="flex justify-end">
        <button className="rounded-xl bg-brand-800 px-7 py-3.5 font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Salvando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
