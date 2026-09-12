import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiRequestError } from '../../../services/api';
import { adminVehicleService } from '../../../services/adminVehicleService';
import type { VehiclePayload } from '../../../types/vehicle';
import { VehicleForm } from '../components/VehicleForm';
import { useAuth } from '../hooks/useAuth';

export function AdminVehicleNewPage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: VehiclePayload): Promise<void> {
    if (!token) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await adminVehicleService.create(token, data);
      navigate('/admin/veiculos', { replace: true, state: { successMessage: 'Veículo cadastrado com sucesso.' } });
    } catch (requestError) {
      if (requestError instanceof ApiRequestError && requestError.status === 401) { logout(); return; }
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível cadastrar o veículo.');
    } finally { setIsSubmitting(false); }
  }

  return <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10"><div className="mx-auto max-w-5xl"><Link className="text-sm font-bold text-brand-700 hover:text-brand-950" to="/admin/veiculos">← Voltar para veículos</Link><p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Cadastro</p><h1 className="mt-2 text-3xl font-black tracking-tight text-brand-950">Novo veículo</h1><p className="mt-2 text-slate-500">Preencha os dados que serão exibidos no estoque.</p>{error && <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{error}</p>}<div className="mt-8"><VehicleForm isSubmitting={isSubmitting} onSubmit={handleSubmit} submitLabel="Cadastrar veículo" /></div></div></main>;
}
