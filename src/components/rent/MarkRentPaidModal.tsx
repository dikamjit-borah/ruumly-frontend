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
import { CreditCard, Calendar } from 'lucide-react';

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
          propertyId: ''
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tenant & Amount Section */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard size={24} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Tenant & Amount</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tenant</label>
              <select
                {...register('tenantId')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
              label="Amount (₹)"
              type="number"
              placeholder="1000"
              {...register('amount')}
              error={errors.amount?.message}
            />
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center gap-3 mb-4">
            <Calendar size={24} className="text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
          </div>
          <div className="space-y-4">
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
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowMarkPaidModal(false);
              reset();
            }}
            className="px-6"
          >
            Cancel
          </Button>
          <Button type="submit" className="px-6">
            Record Payment
          </Button>
        </div>
      </form>
    </Modal>
  );
}
