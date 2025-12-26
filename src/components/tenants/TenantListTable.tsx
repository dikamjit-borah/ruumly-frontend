'use client';

import React, { useState } from 'react';
import { useTenants } from '@/hooks/useTenants';
import { usePropertyStore } from '@/lib/store';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBadge } from '@/components/layout/Logo';
import { formatDate } from '@/lib/utils';
import { Plus, Edit2, LogOut, Search } from 'lucide-react';

export function TenantListTable() {
  const { tenants, stats, selectTenant } = useTenants();
  const { setSearchTerm, setShowAddTenantModal, setShowEditRoomModal, setShowVacateTenantModal } = usePropertyStore();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleEdit = (tenant: any) => {
    selectTenant(tenant);
    setShowEditRoomModal(true);
  };

  const handleVacate = (tenant: any) => {
    selectTenant(tenant);
    setShowVacateTenantModal(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Tenants</h2>
            <p className="text-sm text-gray-500 mt-1">
              {stats.active} active • {stats.inactive} inactive
            </p>
          </div>
          <Button onClick={() => setShowAddTenantModal(true)} className="flex items-center gap-2">
            <Plus size={20} />
            Add Tenant
          </Button>
        </div>

        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input
            placeholder="Search tenants..."
            value={searchInput}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {tenants.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            <p>No tenants found. Add your first tenant!</p>
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHeader>Name</TableCell>
                <TableCell isHeader>Email</TableCell>
                <TableCell isHeader>Phone</TableCell>
                <TableCell isHeader>Move-In</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.firstName} {tenant.lastName}</TableCell>
                  <TableCell>{tenant.email}</TableCell>
                  <TableCell>{tenant.phone}</TableCell>
                  <TableCell>{formatDate(tenant.moveInDate)}</TableCell>
                  <TableCell>
                    <StatusBadge status={tenant.isActive ? 'active' : 'inactive'} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(tenant)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Edit tenant"
                      >
                        <Edit2 size={18} className="text-blue-600" />
                      </button>
                      {tenant.isActive && (
                        <button
                          onClick={() => handleVacate(tenant)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          aria-label="Vacate tenant"
                        >
                          <LogOut size={18} className="text-orange-600" />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
