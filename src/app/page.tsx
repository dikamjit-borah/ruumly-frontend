'use client';

import React, { useMemo } from 'react';
import { usePropertyStore } from '@/lib/store';
import { useRooms } from '@/hooks/useRooms';
import { useTenants } from '@/hooks/useTenants';
import { useRent } from '@/hooks/useRent';
import { calculateDashboardStats } from '@/lib/utils';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { QuickViewTable } from '@/components/dashboard/QuickViewTable';
import { AddRoomModal } from '@/components/rooms/AddRoomModal';
import { EditRoomModal } from '@/components/rooms/EditRoomModal';
import { AddTenantModal } from '@/components/tenants/AddTenantModal';
import { VacateTenantModal } from '@/components/tenants/VacateTenantModal';
import { MarkRentPaidModal } from '@/components/rent/MarkRentPaidModal';

export default function Dashboard() {
  const { allRooms: rooms } = useRooms();
  const { allTenants: tenants } = useTenants();
  const { payments } = useRent();

  const stats = useMemo(() => {
    return calculateDashboardStats(rooms, tenants, payments);
  }, [rooms, tenants, payments]);

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

      <QuickViewTable
        rentPayments={payments}
        tenants={tenantMap}
        rooms={roomMap}
      />

      {/* Modals */}
      <AddRoomModal />
      <EditRoomModal />
      <AddTenantModal />
      <VacateTenantModal />
      <MarkRentPaidModal />
    </div>
  );
}
