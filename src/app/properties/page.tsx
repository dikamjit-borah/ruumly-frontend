'use client';

import { PropertyListTable } from '@/components/properties/PropertyListTable';
import { AddPropertyModal } from '@/components/properties/AddPropertyModal';
import { EditPropertyModal } from '@/components/properties/EditPropertyModal';

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Properties</h1>
          <p className="mt-2 text-gray-600">Manage your rental properties</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <PropertyListTable />
        </div>
      </div>

      <AddPropertyModal />
      <EditPropertyModal />
    </div>
  );
}
