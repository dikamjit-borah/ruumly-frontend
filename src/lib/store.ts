/**
 * Zustand store for global state management
 */

import { create } from 'zustand';
import { Room, Tenant, RentPayment } from './types';
import { generateId, calculateDashboardStats } from './utils';

export interface PropertyStore {
  // Data
  rooms: Room[];
  tenants: Tenant[];
  rentPayments: RentPayment[];

  // UI State
  isLoading: boolean;
  error: string | null;
  selectedRoom: Room | null;
  selectedTenant: Tenant | null;

  // Modal States
  showAddRoomModal: boolean;
  showEditRoomModal: boolean;
  showAddTenantModal: boolean;
  showVacateTenantModal: boolean;
  showMarkPaidModal: boolean;

  // Filter & Search
  searchTerm: string;
  filterStatus: string;

  // Actions - Rooms
  addRoom: (room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  setRooms: (rooms: Room[]) => void;

  // Actions - Tenants
  addTenant: (tenant: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTenant: (id: string, tenant: Partial<Tenant>) => void;
  deleteTenant: (id: string) => void;
  setTenants: (tenants: Tenant[]) => void;
  vacateTenant: (tenantId: string) => void;

  // Actions - Rent Payments
  addRentPayment: (payment: Omit<RentPayment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  markRentPaid: (paymentId: string, paidDate: Date) => void;
  setRentPayments: (payments: RentPayment[]) => void;

  // Modal Actions
  setShowAddRoomModal: (show: boolean) => void;
  setShowEditRoomModal: (show: boolean) => void;
  setShowAddTenantModal: (show: boolean) => void;
  setShowVacateTenantModal: (show: boolean) => void;
  setShowMarkPaidModal: (show: boolean) => void;

  // Selection Actions
  setSelectedRoom: (room: Room | null) => void;
  setSelectedTenant: (tenant: Tenant | null) => void;

  // Search & Filter
  setSearchTerm: (term: string) => void;
  setFilterStatus: (status: string) => void;

  // Utility Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  rooms: [],
  tenants: [],
  rentPayments: [],
  isLoading: false,
  error: null,
  selectedRoom: null,
  selectedTenant: null,
  showAddRoomModal: false,
  showEditRoomModal: false,
  showAddTenantModal: false,
  showVacateTenantModal: false,
  showMarkPaidModal: false,
  searchTerm: '',
  filterStatus: '',
};

export const usePropertyStore = create<PropertyStore>((set) => ({
  ...initialState,

  // Room Actions
  addRoom: (room) =>
    set((state) => ({
      rooms: [
        ...state.rooms,
        {
          ...room,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Room,
      ],
    })),

  updateRoom: (id, updates) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === id ? { ...room, ...updates, updatedAt: new Date() } : room
      ),
    })),

  deleteRoom: (id) =>
    set((state) => ({
      rooms: state.rooms.filter((room) => room.id !== id),
    })),

  setRooms: (rooms) => set({ rooms }),

  // Tenant Actions
  addTenant: (tenant) =>
    set((state) => ({
      tenants: [
        ...state.tenants,
        {
          ...tenant,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Tenant,
      ],
    })),

  updateTenant: (id, updates) =>
    set((state) => ({
      tenants: state.tenants.map((tenant) =>
        tenant.id === id ? { ...tenant, ...updates, updatedAt: new Date() } : tenant
      ),
    })),

  deleteTenant: (id) =>
    set((state) => ({
      tenants: state.tenants.filter((tenant) => tenant.id !== id),
    })),

  setTenants: (tenants) => set({ tenants }),

  vacateTenant: (tenantId) =>
    set((state) => {
      const tenant = state.tenants.find((t) => t.id === tenantId);
      const room = tenant ? state.rooms.find((r) => r.id === tenant.roomId) : null;

      return {
        tenants: state.tenants.map((t) =>
          t.id === tenantId
            ? {
                ...t,
                isActive: false,
                moveOutDate: new Date(),
                updatedAt: new Date(),
              }
            : t
        ),
        rooms: room
          ? state.rooms.map((r) =>
              r.id === room.id ? { ...r, status: 'available' as const } : r
            )
          : state.rooms,
      };
    }),

  // Rent Payment Actions
  addRentPayment: (payment) =>
    set((state) => ({
      rentPayments: [
        ...state.rentPayments,
        {
          ...payment,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        } as RentPayment,
      ],
    })),

  markRentPaid: (paymentId, paidDate) =>
    set((state) => ({
      rentPayments: state.rentPayments.map((payment) =>
        payment.id === paymentId
          ? {
              ...payment,
              status: 'paid' as const,
              paidDate,
              updatedAt: new Date(),
            }
          : payment
      ),
    })),

  setRentPayments: (payments) => set({ rentPayments: payments }),

  // Modal Actions
  setShowAddRoomModal: (show) => set({ showAddRoomModal: show }),
  setShowEditRoomModal: (show) => set({ showEditRoomModal: show }),
  setShowAddTenantModal: (show) => set({ showAddTenantModal: show }),
  setShowVacateTenantModal: (show) => set({ showVacateTenantModal: show }),
  setShowMarkPaidModal: (show) => set({ showMarkPaidModal: show }),

  // Selection Actions
  setSelectedRoom: (room) => set({ selectedRoom: room }),
  setSelectedTenant: (tenant) => set({ selectedTenant: tenant }),

  // Search & Filter
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilterStatus: (status) => set({ filterStatus: status }),

  // Utility Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Reset
  reset: () => set(initialState),
}));
