/**
 * Zod validation schemas for form validation and data integrity
 */

import { z } from 'zod';

export const RoomSchema = z.object({
  number: z.string().min(1, 'Room number is required').max(50),
  type: z.enum(['single', 'double', 'studio', 'apartment']),
  status: z.enum(['available', 'occupied', 'maintenance']),
  rentAmount: z.coerce.number().positive('Rent amount must be positive'),
  floor: z.coerce.number().optional(),
  amenities: z.string().optional().transform(val => val?.split(',').map(a => a.trim()).filter(Boolean) || []),
});

export const TenantSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
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

export type RoomFormData = z.infer<typeof RoomSchema>;
export type TenantFormData = z.infer<typeof TenantSchema>;
export type RentPaymentFormData = z.infer<typeof RentPaymentSchema>;
