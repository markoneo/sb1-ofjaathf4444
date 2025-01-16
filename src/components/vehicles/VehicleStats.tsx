import React from 'react';
import { Users, Briefcase, UserCheck, Star, Droplets } from 'lucide-react';

interface VehicleStatsProps {
  passengers: number;
  luggage: number;
  type?: string;
}

export default function VehicleStats({ passengers, luggage, type }: VehicleStatsProps) {
  return (
    <div className="space-y-3 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <Users size={18} className="text-blue-800" />
        <span>{passengers} Passengers</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Briefcase size={18} className="text-blue-800" />
        <span>{luggage} Luggage</span>
      </div>

      <div className="flex items-center gap-2">
        <UserCheck size={18} className="text-blue-800" />
        <span>Meet & Greet Service</span>
      </div>

      <div className="flex items-center gap-2">
        <Star size={18} className="text-yellow-400" />
        <span>Minimum 4.8★ Rated Drivers</span>
      </div>

      {type === 'executive' && (
        <div className="flex items-center gap-2">
          <Droplets size={18} className="text-blue-800" />
          <span>Complimentary Water</span>
        </div>
      )}
    </div>
  );
}