'use client';

import React, { useState } from 'react';
import { useRent } from '@/hooks/useRent';
import { usePropertyStore } from '@/lib/store';
import { useTenants } from '@/hooks/useTenants';
import { useRooms } from '@/hooks/useRooms';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBadge } from '@/components/layout/Logo';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Plus, CheckCircle, Search } from 'lucide-react';

export function RentTable() {
  const { payments, stats } = useRent();
  const { allTenants } = useTenants();
  const { allRooms } = useRooms();
  const { setShowMarkPaidModal, setSearchTerm } = usePropertyStore();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  const tenantMap = new Map(allTenants.map(t => [t.id, t]));
  const roomMap = new Map(allRooms.map(r => [r.id, r]));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Rent Payments</h2>
            <p className="text-sm text-gray-500 mt-1">
              {stats.pending} pending • {stats.overdue} overdue
            </p>
          </div>
          <Button onClick={() => setShowMarkPaidModal(true)} className="flex items-center gap-2">
            <Plus size={20} />
            Record Payment
          </Button>
        </div>

        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input
            placeholder="Search payments..."
            value={searchInput}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {payments.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            <p>No rent payments found.</p>
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHeader>Tenant</TableCell>
                <TableCell isHeader>Room</TableCell>
                <TableCell isHeader>Amount</TableCell>
                <TableCell isHeader>Due Date</TableCell>
                <TableCell isHeader>Paid Date</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => {
                const tenant = tenantMap.get(payment.tenantId);
                const room = roomMap.get(payment.roomId);
                return (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown'}
                    </TableCell>
                    <TableCell>{room?.number || 'N/A'}</TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>{formatDate(payment.dueDate)}</TableCell>
                    <TableCell>
                      {payment.paidDate ? formatDate(payment.paidDate) : '-'}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={payment.status} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
