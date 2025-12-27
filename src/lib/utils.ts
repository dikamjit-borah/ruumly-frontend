/**
 * Utility functions for common operations
 */

import { Property, Room, Tenant, RentPayment, DashboardStats } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency to INR
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

/**
 * Format date to readable format
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

/**
 * Format date to ISO string (YYYY-MM-DD)
 */
export function formatDateToInput(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

/**
 * Calculate dashboard statistics from data
 */
export function calculateDashboardStats(
  properties: Property[],
  rooms: Room[],
  tenants: Tenant[],
  rentPayments: RentPayment[]
): DashboardStats {
  const safeRentPayments = rentPayments || [];
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;
  const activeTenants = tenants.filter(t => t.isActive).length;
  const totalMonthlyRevenue = rooms
    .filter(r => r.status === 'occupied')
    .reduce((sum, room) => sum + room.rentAmount, 0);

  const now = new Date();
  const pendingPayments = safeRentPayments.filter(p => p.status === 'pending').length;
  const overduePayments = safeRentPayments.filter(
    p => p.status === 'overdue' && new Date(p.dueDate) < now
  ).length;

  return {
    totalProperties: properties.length,
    totalRooms: rooms.length,
    occupiedRooms,
    availableRooms,
    maintenanceRooms,
    totalTenants: tenants.length,
    activeTenants,
    totalMonthlyRevenue,
    pendingPayments,
    overduePayments,
  };
}

/**
 * Get property by ID
 */
export function getPropertyById(properties: Property[], id: string): Property | undefined {
  return properties.find(property => property.id === id);
}

/**
 * Get room by ID
 */
export function getRoomById(rooms: Room[], id: string): Room | undefined {
  return rooms.find(room => room.id === id);
}

/**
 * Get tenant by ID
 */
export function getTenantById(tenants: Tenant[], id: string): Tenant | undefined {
  return tenants.find(tenant => tenant.id === id);
}

/**
 * Get rooms by property ID
 */
export function getRoomsByProperty(rooms: Room[], propertyId: string): Room[] {
  return rooms.filter(room => room.propertyId === propertyId);
}

/**
 * Get tenants by property ID
 */
export function getTenantsByProperty(tenants: Tenant[], propertyId: string): Tenant[] {
  return tenants.filter(tenant => tenant.propertyId === propertyId);
}

/**
 * Get tenant's room information
 */
export function getTenantRoom(rooms: Room[], tenantRoomId: string): Room | undefined {
  return rooms.find(room => room.id === tenantRoomId);
}

/**
 * Calculate days until payment due
 */
export function daysUntilDue(dueDate: Date | string): number {
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  const today = new Date();
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if payment is overdue
 */
export function isPaymentOverdue(dueDate: Date | string, paidDate?: Date | string | null): boolean {
  if (paidDate) return false;
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  return due < new Date();
}

/**
 * Get status badge color classes
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    available: 'bg-green-50 text-green-700 border-green-200',
    occupied: 'bg-blue-50 text-blue-700 border-blue-200',
    maintenance: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    paid: 'bg-green-50 text-green-700 border-green-200',
    overdue: 'bg-red-50 text-red-700 border-red-200',
    active: 'bg-green-50 text-green-700 border-green-200',
    inactive: 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Filter array by search term
 */
export function searchFilter<T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  keys: (keyof T)[]
): T[] {
  if (!searchTerm) return items;
  const lowerSearch = searchTerm.toLowerCase();
  return items.filter((item: T) =>
    keys.some(key => {
      const value = item[key];
      return String(value).toLowerCase().includes(lowerSearch);
    })
  );
}

/**
 * Debounce function for optimizing frequent operations
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
