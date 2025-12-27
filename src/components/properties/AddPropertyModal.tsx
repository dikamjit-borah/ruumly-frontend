'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PropertySchema, PropertyFormData } from '@/lib/validations';
import { usePropertyStore } from '@/lib/store';
import { useProperties } from '@/hooks/useProperties';

export function AddPropertyModal() {
  const { showAddPropertyModal, setShowAddPropertyModal } = usePropertyStore();
  const { addProperty } = useProperties();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(PropertySchema),
  });

  const onSubmit = (data: PropertyFormData) => {
    addProperty({
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      pinCode: data.pinCode,
      type: data.type,
      totalRooms: data.totalRooms,
      description: data.description,
      phoneNumber: data.phoneNumber,
      email: data.email,
    });
    reset();
    setShowAddPropertyModal(false);
  };

  return (
    <Modal
      isOpen={showAddPropertyModal}
      onClose={() => {
        setShowAddPropertyModal(false);
        reset();
      }}
      title="Add New Property"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Property Name"
          placeholder="e.g., Downtown Apartments"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          label="Street Address"
          placeholder="123 Main St"
          {...register('address')}
          error={errors.address?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            placeholder="Delhi"
            {...register('city')}
            error={errors.city?.message}
          />
          <Input
            label="State"
            placeholder="Delhi"
            {...register('state')}
            error={errors.state?.message}
          />
        </div>

        <Input
          label="Pin Code"
          placeholder="110001"
          {...register('pinCode')}
          error={errors.pinCode?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <select
            {...register('type')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <Input
          label="Total Rooms"
          type="number"
          placeholder="5"
          {...register('totalRooms')}
          error={errors.totalRooms?.message}
        />

        <Input
          label="Phone Number (Optional)"
          placeholder="(555) 123-4567"
          {...register('phoneNumber')}
        />

        <Input
          label="Email (Optional)"
          type="email"
          placeholder="property@example.com"
          {...register('email')}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            placeholder="Add details about the property..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            {...register('description')}
          />
        </div>

        <div className="flex gap-2 justify-end pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowAddPropertyModal(false);
              reset();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Add Property</Button>
        </div>
      </form>
    </Modal>
  );
}
