'use client';

import React from 'react';
import { RentTable } from '@/components/rent/RentTable';
import { MarkRentPaidModal } from '@/components/rent/MarkRentPaidModal';

export default function RentPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Rent Payments</h1>
        <p className="text-gray-600 mt-2">Track and manage rent payments from tenants</p>
      </div>

      <RentTable />

      {/* Modals */}
      <MarkRentPaidModal />
    </div>
  );
}
