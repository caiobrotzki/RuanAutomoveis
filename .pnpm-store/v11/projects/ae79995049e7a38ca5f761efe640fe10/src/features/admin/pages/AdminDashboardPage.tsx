import { Link } from 'react-router-dom';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import type { Vehicle, VehicleStatus } from '../../../types/vehicle';
import { formatPrice } from '../../../utils/formatters';
import { useAdminVehicles } from '../hooks/useAdminVehicles';

interface SummaryCardProps {
  label: string;
  value: number;
  accent: string;
}

function SummaryCard({ label, value, accent }: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
      <div className={`mb-5 h-1.5 w-12 rounded-full ${accent}`} />
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-4xl font-black tracking-tight text-brand-950">{value}</p>
    </article>
  );
}

function countByStatus(vehicles: Vehicle[], status: VehicleStatus): number {
  return vehicles.filter((vehicle) => vehicle.status === status).length;
}

export function AdminDashboardPage() {
  const { vehicles, isLoading, error, reload } = useAdminVehicles();
  const recentVehicles = vehicles.slice(0, 5);

  return (
    <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Visão geral</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-brand-950">Dashboard</h1>
            <p className="mt-2 text-slate-500">Acompanhe a situação atual do seu estoque.</p>
          </div>
          <Link className="text-sm font-bold text-brand-700 hover:text-brand-950" to="/admin/veiculos">Ver todos os veículos →</Link>
        </div>

        {isLoading ? (
          <div aria-label="Carregando dashboard" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" role="status">
            {Array.from({ length: 4 }, (_, index) => <div className="h-36 animate-pulse rounded-2xl bg-white" key={index} />)}
          </div>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6" role="alert">
            <p className="font-bold text-red-900">Não foi possível carregar o dashboard.</p>
            <p className="mt-1 text-sm text-red-700">{error}</p>
            <button className="mt-4 rounded-xl bg-red-900 px-4 py-2 text-sm font-bold text-white" onClick={reload} type="button">Tentar novamente</button>
          </div>
        ) : (
          <>
            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Resumo do estoque">
              <SummaryCard accent="bg-brand-600" label="Total de veículos" value={vehicles.length} />
              <SummaryCard accent="bg-emerald-500" label="Disponíveis" value={countByStatus(vehicles, 'available')} />
              <SummaryCard accent="bg-amber-500" label="Reservados" value={countByStatus(vehicles, 'reserved')} />
              <SummaryCard accent="bg-slate-500" label="Vendidos" value={countByStatus(vehicles, 'sold')} />
            </section>

            <section className="mt-8 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-brand-100 px-5 py-5 sm:px-6">
                <div>
                  <h2 className="text-lg font-black text-brand-950">Últimos veículos cadastrados</h2>
                  <p className="mt-1 text-sm text-slate-500">Os cinco registros mais recentes.</p>
                </div>
              </div>

              {recentVehicles.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="font-bold text-brand-950">Nenhum veículo cadastrado.</p>
                  <Link className="mt-4 inline-flex rounded-xl bg-brand-800 px-4 py-2 text-sm font-bold text-white" to="/admin/veiculos/novo">Cadastrar veículo</Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] text-left text-sm">
                    <thead className="bg-brand-50 text-xs uppercase tracking-wider text-brand-600">
                      <tr>
                        <th className="px-6 py-3 font-bold">Veículo</th>
                        <th className="px-6 py-3 font-bold">Ano</th>
                        <th className="px-6 py-3 font-bold">Preço</th>
                        <th className="px-6 py-3 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-50">
                      {recentVehicles.map((vehicle) => (
                        <tr key={vehicle._id}>
                          <td className="px-6 py-4">
                            <p className="font-bold text-brand-950">{vehicle.brand} {vehicle.model}</p>
                            <p className="mt-0.5 text-xs text-slate-500">{vehicle.version || 'Sem versão informada'}</p>
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-700">{vehicle.modelYear ?? vehicle.year}</td>
                          <td className="px-6 py-4 font-bold text-brand-900">{formatPrice(vehicle.price)}</td>
                          <td className="px-6 py-4"><StatusBadge status={vehicle.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
