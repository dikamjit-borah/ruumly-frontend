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
      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to vacate <strong>{selectedTenant.firstName} {selectedTenant.lastName}</strong>?
        </p>
        <p className="text-sm text-gray-600">
          This will mark the tenant as inactive and set their room as available.
        </p>

        <div className="flex gap-2 justify-end pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowVacateTenantModal(false)}
          >
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={handleVacate}>
            Vacate Tenant
          </Button>
        </div>
      </div>
    </Modal>
  );
}
