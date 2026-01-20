'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { usePropertyStore } from '@/lib/store';
import { useTenants } from '@/hooks/useTenants';

export function VacateTenantModal() {
  const { showVacateTenantModal, setShowVacateTenantModal, selectedTenant } = usePropertyStore();
  const { vacateTenant } = useTenants();

  const handleVacate = () => {
    if (selectedTenant) {
      vacateTenant(selectedTenant.id);
      setShowVacateTenantModal(false);
    }
  };

  if (!selectedTenant) return null;

  return (
    <Modal
      isOpen={showVacateTenantModal}
      onClose={() => setShowVacateTenantModal(false)}
      title="Vacate Tenant"
    >
      <div className="space-y-6 max-w-2xl">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-semibold text-amber-900 mb-2">Confirm Tenant Vacation</h3>
          <p className="text-amber-800">
            You are about to vacate <strong>{selectedTenant.firstName} {selectedTenant.lastName}</strong>.
          </p>
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          <p className="font-medium text-gray-900">This action will:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span>Mark the tenant as inactive</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span>Set their room as available</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span>Close any pending rent records</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-3 justify-end pt-6 border-t border-gray-200 sticky bottom-0 bg-white pb-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowVacateTenantModal(false)}
            className="px-6"
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="danger" 
            onClick={handleVacate}
            className="px-6"
          >
            Confirm Vacation
          </Button>
        </div>
      </div>
    </Modal>
  );
}
