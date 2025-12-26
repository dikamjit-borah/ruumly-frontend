/**
 * Zustand store for global state management
 */

import { create } from 'zustand';
import { Property, Room, Tenant, RentPayment } from './types';
import { generateId, calculateDashboardStats } from './utils';

export interface PropertyStore {
  // Data
  properties: Property[];
  rooms: Room[];
  tenants: Tenant[];
  rentPayments: RentPayment[];

  // UI State
  isLoading: boolean;
  error: string | null;
  selectedProperty: Property | null;
  selectedRoom: Room | null;
  selectedTenant: Tenant | null;

  // Modal States
  showAddPropertyModal: boolean;
  showEditPropertyModal: boolean;
  showAddRoomModal: boolean;
  showEditRoomModal: boolean;
  showAddTenantModal: boolean;
  showVacateTenantModal: boolean;
  showMarkPaidModal: boolean;

  // Filter & Search
  searchTerm: string;
  filterStatus: string;
  selectedPropertyId: string | null;

  // Actions - Properties
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  setProperties: (properties: Property[]) => void;

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
  setShowAddPropertyModal: (show: boolean) => void;
  setShowEditPropertyModal: (show: boolean) => void;
  setShowAddRoomModal: (show: boolean) => void;
  setShowEditRoomModal: (show: boolean) => void;
  setShowAddTenantModal: (show: boolean) => void;
  setShowVacateTenantModal: (show: boolean) => void;
  setShowMarkPaidModal: (show: boolean) => void;

  // Selection Actions
  setSelectedProperty: (property: Property | null) => void;
  setSelectedRoom: (room: Room | null) => void;
  setSelectedTenant: (tenant: Tenant | null) => void;
  setSelectedPropertyId: (id: string | null) => void;

  // Search & Filter
  setSearchTerm: (term: string) => void;
  setFilterStatus: (status: string) => void;

  // Utility Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  properties: [],
  rooms: [],
  tenants: [],
  rentPayments: [],
  isLoading: false,
  error: null,
  selectedProperty: null,
  selectedRoom: null,
  selectedTenant: null,
  showAddPropertyModal: false,
  showEditPropertyModal: false,
  showAddRoomModal: false,
  showEditRoomModal: false,
  showAddTenantModal: false,
  showVacateTenantModal: false,
  showMarkPaidModal: false,
  searchTerm: '',
  filterStatus: '',
  selectedPropertyId: null,
};

export const usePropertyStore = create<PropertyStore>((set) => ({
  ...initialState,

  // Property Actions
  addProperty: (property) =>
    set((state) => ({
      properties: [
        ...state.properties,
        {
          ...property,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Property,
      ],
    })),

  updateProperty: (id, updates) =>
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === id ? { ...property, ...updates, updatedAt: new Date() } : property
      ),
    })),

  deleteProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((property) => property.id !== id),
      rooms: state.rooms.filter((room) => room.propertyId !== id),
      tenants: state.tenants.filter((tenant) => tenant.propertyId !== id),
      rentPayments: state.rentPayments.filter((payment) => payment.propertyId !== id),
    })),

  setProperties: (properties) => set({ properties }),

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
  setShowAddPropertyModal: (show) => set({ showAddPropertyModal: show }),
  setShowEditPropertyModal: (show) => set({ showEditPropertyModal: show }),
  setShowAddRoomModal: (show) => set({ showAddRoomModal: show }),
  setShowEditRoomModal: (show) => set({ showEditRoomModal: show }),
  setShowAddTenantModal: (show) => set({ showAddTenantModal: show }),
  setShowVacateTenantModal: (show) => set({ showVacateTenantModal: show }),
  setShowMarkPaidModal: (show) => set({ showMarkPaidModal: show }),

  // Selection Actions
  setSelectedProperty: (property) => set({ selectedProperty: property }),
  setSelectedRoom: (room) => set({ selectedRoom: room }),
  setSelectedTenant: (tenant) => set({ selectedTenant: tenant }),
  setSelectedPropertyId: (id) => set({ selectedPropertyId: id }),

  // Search & Filter
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilterStatus: (status) => set({ filterStatus: status }),

  // Utility Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Reset
  reset: () => set(initialState),
}));
