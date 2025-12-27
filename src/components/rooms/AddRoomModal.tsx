'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { RoomSchema, RoomFormData } from '@/lib/validations';
import { usePropertyStore } from '@/lib/store';
import { useRooms } from '@/hooks/useRooms';
import { useProperties } from '@/hooks/useProperties';

export function AddRoomModal() {
  const { showAddRoomModal, setShowAddRoomModal, selectedPropertyId } = usePropertyStore();
  const { addRoom } = useRooms();
  const { properties } = useProperties();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomFormData>({
    resolver: zodResolver(RoomSchema),
  });

  const onSubmit = (data: RoomFormData) => {
    addRoom({
      number: data.number,
      type: data.type,
      status: data.status,
      rentAmount: data.rentAmount,
      floor: data.floor,
      amenities: data.amenities,
      propertyId: selectedPropertyId || properties[0]?.id || '',
    });
    reset();
    setShowAddRoomModal(false);
  };

  return (
    <Modal
      isOpen={showAddRoomModal}
      onClose={() => {
        setShowAddRoomModal(false);
        reset();
      }}
      title="Add New Room"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property *</label>
          <select
            {...register('propertyId', { required: 'Property is required' })}
            defaultValue={selectedPropertyId || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a property</option>
            {properties.map(prop => (
              <option key={prop.id} value={prop.id}>
                {prop.name} ({prop.totalRooms} rooms)
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Room Number"
          placeholder="e.g., 101"
          {...register('number')}
          error={errors.number?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            {...register('type')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="studio">Studio</option>
            <option value="apartment">Apartment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            {...register('status')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <Input
          label="Rent Amount (₹)"
          type="number"
          placeholder="5000"
          {...register('rentAmount')}
          error={errors.rentAmount?.message}
        />

        <Input
          label="Floor (Optional)"
          type="number"
          placeholder="1"
          {...register('floor')}
        />

        <Input
          label="Amenities (comma-separated)"
          placeholder="WiFi, AC, Kitchen"
          {...register('amenities')}
        />

        <div className="flex gap-2 justify-end pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowAddRoomModal(false);
              reset();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Add Room</Button>
        </div>
      </form>
    </Modal>
  );
}
