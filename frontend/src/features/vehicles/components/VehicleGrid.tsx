import type { Vehicle } from '../../../types/vehicle';
import { ScrollReveal } from '../../../components/ui/ScrollReveal';
import { VehicleCard } from './VehicleCard';

interface VehicleGridProps {
  vehicles: Vehicle[];
}

export function VehicleGrid({ vehicles }: VehicleGridProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle, index) => (
        <ScrollReveal delay={(index % 6) * 70} key={vehicle._id}>
          <VehicleCard vehicle={vehicle} />
        </ScrollReveal>
      ))}
    </div>
  );
}
