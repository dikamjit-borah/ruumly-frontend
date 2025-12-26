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

export function EditRoomModal() {
  const { showEditRoomModal, setShowEditRoomModal, selectedRoom } = usePropertyStore();
  const { updateRoom } = useRooms();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RoomFormData>({
    resolver: zodResolver(RoomSchema),
  });

  React.useEffect(() => {
    if (selectedRoom) {
      setValue('number', selectedRoom.number);
      setValue('type', selectedRoom.type);
      setValue('status', selectedRoom.status);
      setValue('rentAmount', selectedRoom.rentAmount);
      setValue('floor', selectedRoom.floor);
      setValue('amenities', selectedRoom.amenities?.join(', '));
    }
  }, [selectedRoom, setValue]);

  const onSubmit = (data: RoomFormData) => {
    if (selectedRoom) {
      updateRoom(selectedRoom.id, {
        number: data.number,
        type: data.type,
        status: data.status,
        rentAmount: data.rentAmount,
        floor: data.floor,
        amenities: data.amenities,
      });
      reset();
      setShowEditRoomModal(false);
    }
  };

  return (
    <Modal
      isOpen={showEditRoomModal}
      onClose={() => {
        setShowEditRoomModal(false);
        reset();
      }}
      title="Edit Room"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          label="Rent Amount ($)"
          type="number"
          placeholder="1000"
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
              setShowEditRoomModal(false);
              reset();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Update Room</Button>
        </div>
      </form>
    </Modal>
  );
}
