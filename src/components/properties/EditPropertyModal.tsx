'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PropertySchema, PropertyFormData } from '@/lib/validations';
import { usePropertyStore } from '@/lib/store';
import { useProperties } from '@/hooks/useProperties';

export function EditPropertyModal() {
  const { showEditPropertyModal, setShowEditPropertyModal, selectedProperty } = usePropertyStore();
  const { updateProperty } = useProperties();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(PropertySchema),
  });

  useEffect(() => {
    if (selectedProperty) {
      reset({
        name: selectedProperty.name,
        address: selectedProperty.address,
        city: selectedProperty.city,
        state: selectedProperty.state,
        zipCode: selectedProperty.zipCode,
        type: selectedProperty.type,
        totalRooms: selectedProperty.totalRooms,
        description: selectedProperty.description,
        phoneNumber: selectedProperty.phoneNumber,
        email: selectedProperty.email,
      });
    }
  }, [selectedProperty, reset]);

  const onSubmit = (data: PropertyFormData) => {
    if (selectedProperty) {
      updateProperty(selectedProperty.id, {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        type: data.type,
        totalRooms: data.totalRooms,
        description: data.description,
        phoneNumber: data.phoneNumber,
        email: data.email,
      });
      reset();
      setShowEditPropertyModal(false);
    }
  };

  return (
    <Modal
      isOpen={showEditPropertyModal}
      onClose={() => {
        setShowEditPropertyModal(false);
        reset();
      }}
      title="Edit Property"
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
            placeholder="New York"
            {...register('city')}
            error={errors.city?.message}
          />
          <Input
            label="State"
            placeholder="NY"
            {...register('state')}
            error={errors.state?.message}
          />
        </div>

        <Input
          label="Zip Code"
          placeholder="10001"
          {...register('zipCode')}
          error={errors.zipCode?.message}
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
              setShowEditPropertyModal(false);
              reset();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Update Property</Button>
        </div>
      </form>
    </Modal>
  );
}
