'use client';

import React from 'react';
import { RoomListTable } from '@/components/rooms/RoomListTable';
import { AddRoomModal } from '@/components/rooms/AddRoomModal';
import { EditRoomModal } from '@/components/rooms/EditRoomModal';

export default function RoomsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Rooms</h1>
        <p className="text-gray-600 mt-2">Manage your rental properties and rooms</p>
      </div>

      <RoomListTable />

      {/* Modals */}
      <AddRoomModal />
      <EditRoomModal />
    </div>
  );
}
