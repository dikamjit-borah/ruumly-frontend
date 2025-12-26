'use client';

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/Table';
import { StatusBadge } from '@/components/layout/Logo';
import { formatDate, formatCurrency } from '@/lib/utils';
import { RentPayment, Tenant, Room } from '@/lib/types';

interface QuickViewTableProps {
  rentPayments: RentPayment[];
  tenants: Map<string, Tenant>;
  rooms: Map<string, Room>;
  onPaymentClick?: (payment: RentPayment) => void;
}

export function QuickViewTable({
  rentPayments,
  tenants,
  rooms,
  onPaymentClick,
}: QuickViewTableProps) {
  const pendingPayments = rentPayments
    .filter((p) => p.status === 'pending' || p.status === 'overdue')
    .slice(0, 5);

  if (pendingPayments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">All payments are up to date!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900">Pending Payments</h2>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHeader>Tenant</TableCell>
              <TableCell isHeader>Room</TableCell>
              <TableCell isHeader>Amount</TableCell>
              <TableCell isHeader>Due Date</TableCell>
              <TableCell isHeader>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingPayments.map((payment) => {
              const tenant = tenants.get(payment.tenantId);
              const room = rooms.get(payment.roomId);
              return (
                <TableRow
                  key={payment.id}
                  onClick={() => onPaymentClick?.(payment)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    {tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown'}
                  </TableCell>
                  <TableCell>{room?.number || 'N/A'}</TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>{formatDate(payment.dueDate)}</TableCell>
                  <TableCell>
                    <StatusBadge status={payment.status} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
