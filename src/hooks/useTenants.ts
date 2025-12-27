/**
 * Custom hook for managing tenants
 */

import { useCallback, useMemo } from 'react';
import { usePropertyStore } from '@/lib/store';
import { Tenant } from '@/lib/types';
import { searchFilter } from '@/lib/utils';

export function useTenants() {
  const {
    tenants,
    searchTerm,
    addTenant,
    updateTenant,
    deleteTenant,
    vacateTenant,
    setSelectedTenant,
  } = usePropertyStore();

  const filteredTenants = useMemo(() => {
    return searchFilter<Tenant>(tenants, searchTerm, ['firstName', 'lastName', 'email', 'phone']);
  }, [tenants, searchTerm]);

  const activeTenants = useMemo(() => {
    return tenants.filter((t) => t.isActive);
  }, [tenants]);

  const stats = useMemo(() => {
    return {
      total: tenants.length,
      active: activeTenants.length,
      inactive: tenants.filter((t) => !t.isActive).length,
    };
  }, [tenants, activeTenants]);

  const getTenantById = useCallback(
    (id: string) => {
      return tenants.find((t) => t.id === id);
    },
    [tenants]
  );

  const handleAddTenant = useCallback(
    (tenant: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>) => {
      addTenant(tenant);
    },
    [addTenant]
  );

  const handleUpdateTenant = useCallback(
    (id: string, updates: Partial<Tenant>) => {
      updateTenant(id, updates);
    },
    [updateTenant]
  );

  const handleDeleteTenant = useCallback(
    (id: string) => {
      deleteTenant(id);
      setSelectedTenant(null);
    },
    [deleteTenant, setSelectedTenant]
  );

  const handleVacateTenant = useCallback(
    (tenantId: string) => {
      vacateTenant(tenantId);
      setSelectedTenant(null);
    },
    [vacateTenant, setSelectedTenant]
  );

  const handleSelectTenant = useCallback(
    (tenant: Tenant) => {
      setSelectedTenant(tenant);
    },
    [setSelectedTenant]
  );

  return {
    tenants: filteredTenants,
    allTenants: tenants,
    activeTenants,
    stats,
    getTenantById,
    addTenant: handleAddTenant,
    updateTenant: handleUpdateTenant,
    deleteTenant: handleDeleteTenant,
    vacateTenant: handleVacateTenant,
    selectTenant: handleSelectTenant,
  };
}
