import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { ApiRequestError } from '../../../services/api';
import { adminVehicleService } from '../../../services/adminVehicleService';
import type { Vehicle, VehicleStatus } from '../../../types/vehicle';
import { formatPrice } from '../../../utils/formatters';
import { ConfirmModal } from '../components/ConfirmModal';
import { useAdminVehicles } from '../hooks/useAdminVehicles';
import { useAuth } from '../hooks/useAuth';

interface LocationState { successMessage?: string }

export function AdminVehicleListPage() {
  const { token, logout } = useAuth();
  const { vehicles, isLoading, error, reload } = useAdminVehicles();
  const location = useLocation();
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const successMessage = (location.state as LocationState | null)?.successMessage;

  async function runAction(vehicleId: string, action: () => Promise<unknown>): Promise<void> {
    setPendingId(vehicleId);
    setActionError(null);
    try {
      await action();
      reload();
    } catch (requestError) {
      if (requestError instanceof ApiRequestError && requestError.status === 401) {
        logout();
        return;
      }
      setActionError(requestError instanceof Error ? requestError.message : 'Não foi possível concluir a ação.');
    } finally {
      setPendingId(null);
    }
  }

  async function handleStatusChange(vehicle: Vehicle, status: VehicleStatus): Promise<void> {
    if (!token || status === vehicle.status) return;
    await runAction(vehicle._id, () => adminVehicleService.patch(token, vehicle._id, { status }));
  }

  async function handleFeaturedChange(vehicle: Vehicle): Promise<void> {
    if (!token) return;
    await runAction(vehicle._id, () => adminVehicleService.patch(token, vehicle._id, { featured: !vehicle.featured }));
  }

  async function handleDelete(): Promise<void> {
    if (!token || !vehicleToDelete) return;
    const vehicleId = vehicleToDelete._id;
    await runAction(vehicleId, () => adminVehicleService.remove(token, vehicleId));
    setVehicleToDelete(null);
  }

  return (
    <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Gerenciamento</p><h1 className="mt-2 text-3xl font-black tracking-tight text-brand-950">Veículos</h1><p className="mt-2 text-slate-500">Cadastre e mantenha o estoque da loja.</p></div>
          <Link className="inline-flex justify-center rounded-xl bg-brand-800 px-5 py-3 text-sm font-bold text-white hover:bg-brand-700" to="/admin/veiculos/novo">+ Novo veículo</Link>
        </div>

        {successMessage && <p className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800" role="status">{successMessage}</p>}
        {actionError && <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">{actionError}</p>}

        {isLoading ? <div className="mt-8 h-72 animate-pulse rounded-2xl bg-white" aria-label="Carregando veículos" role="status" /> : error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6" role="alert"><p className="font-bold text-red-900">Não foi possível carregar os veículos.</p><p className="mt-1 text-sm text-red-700">{error}</p><button className="mt-4 rounded-xl bg-red-900 px-4 py-2 text-sm font-bold text-white" onClick={reload} type="button">Tentar novamente</button></div>
        ) : vehicles.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-brand-300 bg-white px-6 py-14 text-center"><p className="font-bold text-brand-950">Nenhum veículo cadastrado.</p><p className="mt-2 text-sm text-slate-500">Cadastre o primeiro veículo para começar a montar o estoque.</p></div>
        ) : (
          <section className="mt-8 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-brand-50 text-xs uppercase tracking-wider text-brand-600"><tr><th className="px-5 py-4">Veículo</th><th className="px-5 py-4">Preço</th><th className="px-5 py-4">Ano</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Destaque</th><th className="px-5 py-4 text-right">Ações</th></tr></thead>
                <tbody className="divide-y divide-brand-50">
                  {vehicles.map((vehicle) => {
                    const isPending = pendingId === vehicle._id;
                    return <tr className={isPending ? 'opacity-60' : ''} key={vehicle._id}>
                      <td className="px-5 py-4"><p className="font-bold text-brand-950">{vehicle.brand} {vehicle.model}</p><p className="mt-0.5 text-xs text-slate-500">{vehicle.version || 'Sem versão informada'}</p></td>
                      <td className="px-5 py-4 font-bold text-brand-900">{formatPrice(vehicle.price)}</td>
                      <td className="px-5 py-4 text-slate-700">{vehicle.year}/{vehicle.modelYear ?? vehicle.year}</td>
                      <td className="px-5 py-4"><div className="mb-2"><StatusBadge status={vehicle.status} /></div><select aria-label={`Status de ${vehicle.brand} ${vehicle.model}`} className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs" disabled={isPending} onChange={(event) => void handleStatusChange(vehicle, event.target.value as VehicleStatus)} value={vehicle.status}><option value="available">Disponível</option><option value="reserved">Reservado</option><option value="sold">Vendido</option></select></td>
                      <td className="px-5 py-4"><button aria-pressed={vehicle.featured} className={`rounded-full px-3 py-1.5 text-xs font-bold ${vehicle.featured ? 'bg-brand-800 text-white' : 'bg-slate-100 text-slate-600'}`} disabled={isPending} onClick={() => void handleFeaturedChange(vehicle)} type="button">{vehicle.featured ? 'Sim' : 'Não'}</button></td>
                      <td className="px-5 py-4"><div className="flex justify-end gap-2"><Link className="rounded-lg border border-brand-200 px-3 py-2 text-xs font-bold text-brand-800 hover:bg-brand-50" to={`/admin/veiculos/${vehicle._id}/editar`}>Editar</Link><button className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50" disabled={isPending} onClick={() => setVehicleToDelete(vehicle)} type="button">Excluir</button></div></td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      <ConfirmModal isConfirming={Boolean(vehicleToDelete && pendingId === vehicleToDelete._id)} isOpen={Boolean(vehicleToDelete)} message="Tem certeza que deseja excluir este veículo? Esta ação não poderá ser desfeita." onCancel={() => setVehicleToDelete(null)} onConfirm={() => void handleDelete()} title={vehicleToDelete ? `Excluir ${vehicleToDelete.brand} ${vehicleToDelete.model}` : 'Excluir veículo'} />
    </main>
  );
}
