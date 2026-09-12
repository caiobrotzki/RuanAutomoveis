import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../features/admin/components/AdminHeader';
import { AdminSidebar } from '../features/admin/components/AdminSidebar';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-brand-50 lg:grid lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="min-w-0">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}
