/**
 * Custom hook for managing rent payments
 */

import { useCallback, useMemo } from 'react';
import { usePropertyStore } from '@/lib/store';
import { RentPayment } from '@/lib/types';

export function useRent() {
  const { rentPayments, addRentPayment, markRentPaid, setRentPayments } = usePropertyStore();

  const pendingPayments = useMemo(() => {
    return rentPayments.filter((p) => p.status === 'pending' || p.status === 'overdue');
  }, [rentPayments]);

  const paidPayments = useMemo(() => {
    return rentPayments.filter((p) => p.status === 'paid');
  }, [rentPayments]);

  const stats = useMemo(() => {
    const pending = pendingPayments.filter((p) => p.status === 'pending').length;
    const overdue = pendingPayments.filter((p) => p.status === 'overdue').length;
    const totalDue = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

    return {
      total: rentPayments.length,
      pending,
      overdue,
      paid: paidPayments.length,
      totalDue,
    };
  }, [rentPayments, pendingPayments, paidPayments]);

  const getPaymentsByTenant = useCallback(
    (tenantId: string) => {
      return rentPayments.filter((p) => p.tenantId === tenantId);
    },
    [rentPayments]
  );

  const getPaymentsByRoom = useCallback(
    (roomId: string) => {
      return rentPayments.filter((p) => p.roomId === roomId);
    },
    [rentPayments]
  );

  const handleAddPayment = useCallback(
    (payment: Omit<RentPayment, 'id' | 'createdAt' | 'updatedAt'>) => {
      addRentPayment(payment);
    },
    [addRentPayment]
  );

  const handleMarkPaid = useCallback(
    (paymentId: string, paidDate: Date) => {
      markRentPaid(paymentId, paidDate);
    },
    [markRentPaid]
  );

  return {
    payments: rentPayments,
    pendingPayments,
    paidPayments,
    stats,
    getPaymentsByTenant,
    getPaymentsByRoom,
    addPayment: handleAddPayment,
    markPaid: handleMarkPaid,
    setPayments: setRentPayments,
  };
}
