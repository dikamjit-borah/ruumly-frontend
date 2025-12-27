'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TenantSchema, TenantFormData } from '@/lib/validations';
import { usePropertyStore } from '@/lib/store';
import { useTenants } from '@/hooks/useTenants';
import { useRooms } from '@/hooks/useRooms';

export function AddTenantModal() {
  const { showAddTenantModal, setShowAddTenantModal, selectedPropertyId } = usePropertyStore();
  const { addTenant } = useTenants();
  const { allRooms } = useRooms();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TenantFormData>({
    resolver: zodResolver(TenantSchema),
  });

  const onSubmit = (data: TenantFormData) => {
    if (!selectedPropertyId) {
      alert('Please select a property first');
      return;
    }
    addTenant({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      roomId: data.roomId,
      propertyId: selectedPropertyId,
      moveInDate: data.moveInDate,
      moveOutDate: data.moveOutDate,
      isActive: true,
      emergencyContact: data.emergencyContactName ? {
        name: data.emergencyContactName,
        phone: data.emergencyContactPhone || '',
      } : undefined,
    });
    reset();
    setShowAddTenantModal(false);
  };

  return (
    <Modal
      isOpen={showAddTenantModal}
      onClose={() => {
        setShowAddTenantModal(false);
        reset();
      }}
      title="Add New Tenant"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="John"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Phone"
          placeholder="9876543210"
          {...register('phone')}
          error={errors.phone?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
          <select
            {...register('roomId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a room</option>
            {allRooms.map((room) => (
              <option key={room.id} value={room.id}>
                Room {room.number}
              </option>
            ))}
          </select>
          {errors.roomId?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.roomId.message}</p>
          )}
        </div>

        <Input
          label="Move-In Date"
          type="date"
          {...register('moveInDate')}
          error={errors.moveInDate?.message}
        />

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Emergency Contact (Optional)</h3>
          <Input
            label="Contact Name"
            placeholder="Jane Doe"
            {...register('emergencyContactName')}
          />
          <Input
            label="Contact Phone"
            placeholder="9876543210"
            {...register('emergencyContactPhone')}
          />
        </div>

        <div className="flex gap-2 justify-end pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowAddTenantModal(false);
              reset();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Add Tenant</Button>
        </div>
      </form>
    </Modal>
  );
}
