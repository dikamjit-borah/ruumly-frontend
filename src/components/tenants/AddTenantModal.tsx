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
import { Users, HomeIcon, AlertCircle } from 'lucide-react';

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
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center gap-3 mb-4">
            <Users size={24} className="text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div className="space-y-4">
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
            </div>
          </div>

        {/* Accommodation Details Section */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <HomeIcon size={24} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Accommodation Details</h3>
          </div>
          <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                <select
                  {...register('roomId')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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

              <Input
                label="Move-Out Date (Optional)"
                type="date"
                {...register('moveOutDate')}
              />
            </div>
          </div>

        {/* Emergency Contact Section */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={24} className="text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Emergency Contact (Optional)</h3>
          </div>
          <div className="space-y-4">
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
          </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowAddTenantModal(false);
              reset();
            }}
            className="px-6"
          >
            Cancel
          </Button>
          <Button type="submit" className="px-6">
            Add Tenant
          </Button>
        </div>
      </form>
    </Modal>
  );
}
