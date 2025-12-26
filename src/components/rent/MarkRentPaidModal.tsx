'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { RentPaymentSchema, RentPaymentFormData } from '@/lib/validations';
import { usePropertyStore } from '@/lib/store';
import { useRent } from '@/hooks/useRent';
import { useTenants } from '@/hooks/useTenants';

export function MarkRentPaidModal() {
  const { showMarkPaidModal, setShowMarkPaidModal } = usePropertyStore();
  const { addPayment } = useRent();
  const { allTenants } = useTenants();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RentPaymentFormData>({
    resolver: zodResolver(RentPaymentSchema),
  });

  const onSubmit = (data: RentPaymentFormData) => {
    const tenant = allTenants.find(t => t.id === data.tenantId);
    if (tenant) {
      addPayment({
        tenantId: data.tenantId,
        roomId: tenant.roomId,
        amount: data.amount,
        dueDate: new Date(),
        paidDate: data.paidDate,
        status: 'paid',
        notes: data.notes,
      });
      reset();
      setShowMarkPaidModal(false);
    }
  };

  return (
    <Modal
      isOpen={showMarkPaidModal}
      onClose={() => {
        setShowMarkPaidModal(false);
        reset();
      }}
      title="Record Rent Payment"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tenant</label>
          <select
            {...register('tenantId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a tenant</option>
            {allTenants.filter(t => t.isActive).map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.firstName} {tenant.lastName}
              </option>
            ))}
          </select>
          {errors.tenantId?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.tenantId.message}</p>
          )}
        </div>

        <Input
          label="Amount ($)"
          type="number"
          placeholder="1000"
          {...register('amount')}
          error={errors.amount?.message}
        />

        <Input
          label="Payment Date"
          type="date"
          {...register('paidDate')}
          error={errors.paidDate?.message}
        />

        <Input
          label="Notes (Optional)"
          placeholder="Add any notes..."
          {...register('notes')}
        />

        <div className="flex gap-2 justify-end pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowMarkPaidModal(false);
              reset();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Record Payment</Button>
        </div>
      </form>
    </Modal>
  );
}
