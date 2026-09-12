import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ApiRequestError } from '../../../services/api';
import { adminVehicleService } from '../../../services/adminVehicleService';
import type { VehiclePayload } from '../../../types/vehicle';
import { useVehicle } from '../../../hooks/useVehicle';
import { VehicleForm } from '../components/VehicleForm';
import { useAuth } from '../hooks/useAuth';

export function AdminVehicleEditPage() {
  const { id } = useParams();
  const { token, logout } = useAuth();
  const { vehicle, isLoading, error: loadError, reload } = useVehicle(id);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(data: VehiclePayload): Promise<void> {
    if (!token || !id) return;
    setIsSubmitting(true); setSubmitError(null);
    try {
      await adminVehicleService.update(token, id, data);
      navigate('/admin/veiculos', { replace: true, state: { successMessage: 'Veículo atualizado com sucesso.' } });
    } catch (requestError) {
      if (requestError instanceof ApiRequestError && requestError.status === 401) { logout(); return; }
      setSubmitError(requestError instanceof Error ? requestError.message : 'Não foi possível atualizar o veículo.');
    } finally { setIsSubmitting(false); }
  }

  return <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10"><div className="mx-auto max-w-5xl"><Link className="text-sm font-bold text-brand-700 hover:text-brand-950" to="/admin/veiculos">← Voltar para veículos</Link><p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Edição</p><h1 className="mt-2 text-3xl font-black tracking-tight text-brand-950">Editar veículo</h1>{isLoading ? <div className="mt-8 h-96 animate-pulse rounded-2xl bg-white" role="status" aria-label="Carregando veículo" /> : loadError || !vehicle ? <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6" role="alert"><p className="font-bold text-red-900">Não foi possível carregar o veículo.</p><p className="mt-1 text-sm text-red-700">{loadError}</p><button className="mt-4 rounded-xl bg-red-900 px-4 py-2 text-sm font-bold text-white" onClick={reload} type="button">Tentar novamente</button></div> : <>{submitError && <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{submitError}</p>}<div className="mt-8"><VehicleForm initialVehicle={vehicle} isSubmitting={isSubmitting} onSubmit={handleSubmit} submitLabel="Salvar alterações" /></div></>}</div></main>;
}
