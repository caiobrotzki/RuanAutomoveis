import { Route, Routes } from 'react-router-dom';
import { AdminDashboardPage } from '../features/admin/pages/AdminDashboardPage';
import { AdminLoginPage } from '../features/admin/pages/AdminLoginPage';
import { AdminVehicleEditPage } from '../features/admin/pages/AdminVehicleEditPage';
import { AdminVehicleListPage } from '../features/admin/pages/AdminVehicleListPage';
import { AdminVehicleNewPage } from '../features/admin/pages/AdminVehicleNewPage';
import { VehicleDetailsPage } from '../features/vehicles/pages/VehicleDetailsPage';
import { VehicleStockPage } from '../features/vehicles/pages/VehicleStockPage';
import { AdminLayout } from '../layouts/AdminLayout';
import { PublicLayout } from '../layouts/PublicLayout';
import { HomePage } from '../pages/HomePage';
import { PlaceholderPage } from '../pages/PlaceholderPage';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="estoque" element={<VehicleStockPage />} />
        <Route path="veiculos/:id" element={<VehicleDetailsPage />} />
        <Route path="contato" element={<PlaceholderPage title="Fale conosco" />} />
        <Route path="*" element={<PlaceholderPage title="Página não encontrada" />} />
      </Route>
      <Route path="admin" element={<AdminLoginPage />} />
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="admin/veiculos" element={<AdminVehicleListPage />} />
        <Route path="admin/veiculos/novo" element={<AdminVehicleNewPage />} />
        <Route path="admin/veiculos/:id/editar" element={<AdminVehicleEditPage />} />
      </Route>
    </Routes>
  );
}
