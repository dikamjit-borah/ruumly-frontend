/**
 * Core TypeScript types and interfaces for the rental property management system
 */

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'apartment' | 'house' | 'condo' | 'commercial';
  totalRooms: number;
  description?: string;
  phoneNumber?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  propertyId: string;
  number: string;
  type: 'single' | 'double' | 'studio' | 'apartment';
  status: 'available' | 'occupied' | 'maintenance';
  rentAmount: number;
  floor?: number;
  amenities?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomId: string;
  propertyId: string;
  moveInDate: Date;
  moveOutDate?: Date | null;
  isActive: boolean;
  emergencyContact?: {
    name: string;
    phone: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface RentPayment {
  id: string;
  tenantId: string;
  roomId: string;
  propertyId: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date | null;
  status: 'pending' | 'paid' | 'overdue';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalProperties: number;
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  maintenanceRooms: number;
  totalTenants: number;
  activeTenants: number;
  totalMonthlyRevenue: number;
  pendingPayments: number;
  overduePayments: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
