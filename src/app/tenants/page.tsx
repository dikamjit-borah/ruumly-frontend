'use client';

import React from 'react';
import { TenantListTable } from '@/components/tenants/TenantListTable';
import { AddTenantModal } from '@/components/tenants/AddTenantModal';
import { VacateTenantModal } from '@/components/tenants/VacateTenantModal';

export default function TenantsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tenants</h1>
        <p className="text-gray-600 mt-2">Manage your tenants and their information</p>
      </div>

      <TenantListTable />

      {/* Modals */}
      <AddTenantModal />
      <VacateTenantModal />
    </div>
  );
}
