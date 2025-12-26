/**
 * Custom hook for managing rooms
 */

import { useCallback, useMemo } from 'react';
import { usePropertyStore } from '@/lib/store';
import { Room } from '@/lib/types';
import { searchFilter } from '@/lib/utils';

export function useRooms() {
  const {
    rooms,
    searchTerm,
    filterStatus,
    addRoom,
    updateRoom,
    deleteRoom,
    setSelectedRoom,
  } = usePropertyStore();

  const filteredRooms = useMemo(() => {
    let result = searchFilter(rooms, searchTerm, ['number', 'type']);

    if (filterStatus) {
      result = result.filter((room) => room.status === filterStatus);
    }

    return result;
  }, [rooms, searchTerm, filterStatus]);

  const stats = useMemo(() => {
    return {
      total: rooms.length,
      available: rooms.filter((r) => r.status === 'available').length,
      occupied: rooms.filter((r) => r.status === 'occupied').length,
      maintenance: rooms.filter((r) => r.status === 'maintenance').length,
    };
  }, [rooms]);

  const handleAddRoom = useCallback(
    (room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => {
      addRoom(room);
    },
    [addRoom]
  );

  const handleUpdateRoom = useCallback(
    (id: string, updates: Partial<Room>) => {
      updateRoom(id, updates);
    },
    [updateRoom]
  );

  const handleDeleteRoom = useCallback(
    (id: string) => {
      deleteRoom(id);
      setSelectedRoom(null);
    },
    [deleteRoom, setSelectedRoom]
  );

  const handleSelectRoom = useCallback(
    (room: Room) => {
      setSelectedRoom(room);
    },
    [setSelectedRoom]
  );

  return {
    rooms: filteredRooms,
    allRooms: rooms,
    stats,
    addRoom: handleAddRoom,
    updateRoom: handleUpdateRoom,
    deleteRoom: handleDeleteRoom,
    selectRoom: handleSelectRoom,
  };
}
