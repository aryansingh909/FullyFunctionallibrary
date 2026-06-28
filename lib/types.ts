export type InquiryType = 'library' | 'enrollment' | 'general';
export type InquiryStatus = 'new' | 'contacted' | 'resolved';

export interface Inquiry {
  id: string;
  type: InquiryType;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  programme?: string;
  plan?: string;
  preferred_timing?: string;
  highest_qualification?: string;
  preferred_callback?: string;
  specialization?: string;
  message?: string;
  status: InquiryStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  last_login_at?: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: unknown;
  updated_at: string;
}

export interface LibraryTiming {
  weekdays: { open: string; close: string; label: string };
  sunday: { open: string; close: string; label: string };
  note: string;
}

export interface LibraryPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface AdminJwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface InquiryFilters {
  type?: InquiryType | 'all';
  status?: InquiryStatus | 'all';
  search?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
}
