// Re-export all types for easy importing
export * from './booking';
export * from './gallery';
export * from './services';
export * from './content';

import { ReactNode } from 'react';

// Common utility types
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
  hasNext: boolean;
  hasPrev: boolean;
}

// Common UI component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}
