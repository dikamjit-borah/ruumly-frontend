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
import { Building, DollarSign, Sofa } from 'lucide-react';

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Property Selection Section */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-4">
            <Building size={24} className="text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Property Selection</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property *</label>
            <select
              {...register('propertyId', { required: 'Property is required' })}
              defaultValue={selectedPropertyId || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select a property</option>
              {properties.map(prop => (
                <option key={prop.id} value={prop.id}>
                  {prop.name} ({prop.totalRooms} rooms)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Room Information Section */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100">
          <div className="flex items-center gap-3 mb-4">
            <Sofa size={24} className="text-cyan-600" />
            <h3 className="text-lg font-semibold text-gray-900">Room Information</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="Room Number"
              placeholder="e.g., 101"
              {...register('number')}
              error={errors.number?.message}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  {...register('type')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="studio">Studio</option>
                  <option value="apartment">Apartment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                <input
                  type="number"
                  placeholder="1"
                  {...register('floor')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Status Section */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign size={24} className="text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Pricing & Status</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="Rent Amount (₹)"
              type="number"
              placeholder="5000"
              {...register('rentAmount')}
              error={errors.rentAmount?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 border border-teal-100">
          <div className="flex items-center gap-3 mb-4">
            <Sofa size={24} className="text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900">Additional Details (Optional)</h3>
          </div>
          <Input
            label="Amenities (comma-separated)"
            placeholder="WiFi, AC, Kitchen"
            {...register('amenities')}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowAddRoomModal(false);
              reset();
            }}
            className="px-6"
          >
            Cancel
          </Button>
          <Button type="submit" className="px-6">
            Add Room
          </Button>
        </div>
      </form>
    </Modal>
  );
}
