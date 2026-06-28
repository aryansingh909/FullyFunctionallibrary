import { z } from 'zod';

const indianPhone = z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number');

export const libraryInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: indianPhone,
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  address: z.string().max(300).optional(),
  plan: z.string().optional(),
  preferred_timing: z.string().optional(),
  message: z.string().max(1000).optional(),
  // honeypot — must be empty
  website: z.string().max(0, 'Bot detected').optional(),
});

export const enrollmentInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: indianPhone,
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  highest_qualification: z.string().optional(),
  programme: z.string().optional(),
  specialization: z.string().max(200).optional(),
  address: z.string().max(300).optional(),
  preferred_callback: z.string().optional(),
  message: z.string().max(1000).optional(),
  website: z.string().max(0, 'Bot detected').optional(),
});

export const generalContactSchema = z.object({
  name: z.string().min(2).max(100),
  phone: indianPhone,
  message: z.string().min(5, 'Please enter a message').max(1000),
  website: z.string().max(0, 'Bot detected').optional(),
});

export const adminLoginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/\d/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine(d => d.newPassword === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type LibraryInquiryInput = z.infer<typeof libraryInquirySchema>;
export type EnrollmentInquiryInput = z.infer<typeof enrollmentInquirySchema>;
export type GeneralContactInput = z.infer<typeof generalContactSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
