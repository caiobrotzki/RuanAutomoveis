import { Outlet } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory-50">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
