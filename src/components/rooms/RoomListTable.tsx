'use client';

import React, { useState } from 'react';
import { useRooms } from '@/hooks/useRooms';
import { usePropertyStore } from '@/lib/store';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBadge } from '@/components/layout/Logo';
import { formatCurrency } from '@/lib/utils';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

export function RoomListTable() {
  const { rooms, stats, selectRoom, deleteRoom } = useRooms();
  const { setSearchTerm, setFilterStatus, setShowAddRoomModal, setShowEditRoomModal, selectedRoom } = usePropertyStore();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleEdit = (roomId: string) => {
    const room = usePropertyStore.getState().rooms.find(r => r.id === roomId);
    if (room) {
      selectRoom(room);
      setShowEditRoomModal(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Rooms</h2>
            <p className="text-sm text-gray-500 mt-1">
              {stats.available} available • {stats.occupied} occupied • {stats.maintenance} maintenance
            </p>
          </div>
          <Button onClick={() => setShowAddRoomModal(true)} className="flex items-center gap-2">
            <Plus size={20} />
            Add Room
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              placeholder="Search rooms..."
              value={searchInput}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <select
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {rooms.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            <p>No rooms found. Create your first room!</p>
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHeader>Room</TableCell>
                <TableCell isHeader>Type</TableCell>
                <TableCell isHeader>Rent</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.number}</TableCell>
                  <TableCell className="capitalize">{room.type}</TableCell>
                  <TableCell>{formatCurrency(room.rentAmount)}</TableCell>
                  <TableCell>
                    <StatusBadge status={room.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(room.id)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Edit room"
                      >
                        <Edit2 size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteRoom(room.id)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Delete room"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
