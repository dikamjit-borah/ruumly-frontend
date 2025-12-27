'use client';

import React, { useMemo } from 'react';
import { usePropertyStore } from '@/lib/store';
import { useRooms } from '@/hooks/useRooms';
import { useTenants } from '@/hooks/useTenants';
import { useRent } from '@/hooks/useRent';
import { calculateDashboardStats } from '@/lib/utils';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { PropertiesGrid } from '@/components/dashboard/PropertiesGrid';
import { QuickViewTable } from '@/components/dashboard/QuickViewTable';
import { AddRoomModal } from '@/components/rooms/AddRoomModal';
import { EditRoomModal } from '@/components/rooms/EditRoomModal';
import { AddTenantModal } from '@/components/tenants/AddTenantModal';
import { VacateTenantModal } from '@/components/tenants/VacateTenantModal';
import { MarkRentPaidModal } from '@/components/rent/MarkRentPaidModal';
import { AddPropertyModal } from '@/components/properties/AddPropertyModal';
import { EditPropertyModal } from '@/components/properties/EditPropertyModal';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const { properties, setShowAddPropertyModal } = usePropertyStore();
  const { allRooms: rooms } = useRooms();
  const { allTenants: tenants } = useTenants();
  const { payments } = useRent();

  const stats = useMemo(() => {
    return calculateDashboardStats(properties || [], rooms || [], tenants || [], payments || []);
  }, [properties, rooms, tenants, payments]);

  const tenantMap = useMemo(() => {
    return new Map(tenants.map(t => [t.id, t]));
  }, [tenants]);

  const roomMap = useMemo(() => {
    return new Map(rooms.map(r => [r.id, r]));
  }, [rooms]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your property management system</p>
      </div>

      <SummaryCards
        totalRooms={stats.totalRooms}
        occupiedRooms={stats.occupiedRooms}
        totalTenants={stats.totalTenants}
        totalMonthlyRevenue={stats.totalMonthlyRevenue}
        overduePayments={stats.overduePayments}
      />

      <div className="mt-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
          <Button onClick={() => setShowAddPropertyModal(true)}>
            <Plus size={20} /> Add Property
          </Button>
        </div>
        <PropertiesGrid properties={properties || []} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pending Payments</h2>
        <QuickViewTable
          rentPayments={payments}
          tenants={tenantMap}
          rooms={roomMap}
        />
      </div>

      {/* Modals */}
      <AddPropertyModal />
      <EditPropertyModal />
      <AddRoomModal />
      <EditRoomModal />
      <AddTenantModal />
      <VacateTenantModal />
      <MarkRentPaidModal />
    </div>
  );
}
