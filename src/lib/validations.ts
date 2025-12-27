/**
 * Zod validation schemas for form validation and data integrity
 */

import { z } from 'zod';

export const PropertySchema = z.object({
  name: z.string().min(1, 'Property name is required').max(200),
  address: z.string().min(1, 'Address is required').max(300),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required').max(100),
  pinCode: z.string().min(1, 'Pin code is required').max(20),
  type: z.enum(['apartment', 'house', 'condo', 'commercial']),
  totalRooms: z.coerce.number().min(1, 'Total rooms must be at least 1'),
  description: z.string().max(1000).optional(),
  phoneNumber: z.string().max(20).optional(),
  email: z.union([z.string().email(), z.literal('')]).optional(),
});

export const RoomSchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  number: z.string().min(1, 'Room number is required').max(50),
  type: z.enum(['single', 'double', 'studio', 'apartment']),
  status: z.enum(['available', 'occupied', 'maintenance']),
  rentAmount: z.coerce.number().positive('Rent amount must be positive'),
  floor: z.coerce.number().optional(),
  amenities: z.string().transform(val => val?.split(',').map(a => a.trim()).filter(Boolean) || []).optional(),
});

export const TenantSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be 10 digits').max(10, 'Phone number must be 10 digits').regex(/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number'),
  roomId: z.string().min(1, 'Room selection is required'),
  moveInDate: z.coerce.date(),
  moveOutDate: z.coerce.date().optional().nullable(),
  emergencyContactName: z.string().max(100).optional(),
  emergencyContactPhone: z.string().optional(),
});

export const RentPaymentSchema = z.object({
  tenantId: z.string().min(1, 'Tenant is required'),
  amount: z.coerce.number().positive('Amount must be positive'),
  paidDate: z.coerce.date().optional().nullable(),
  notes: z.string().max(500).optional(),
});

export type PropertyFormData = z.infer<typeof PropertySchema>;
export type RoomFormData = z.infer<typeof RoomSchema>;
export type TenantFormData = z.infer<typeof TenantSchema>;
export type RentPaymentFormData = z.infer<typeof RentPaymentSchema>;
