import { Button as MuiButton, CircularProgress } from '@mui/material';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

export default function Button({
  children,
  variant = 'contained',
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  className,
  color = 'primary',
}: ButtonProps) {
  return (
    <MuiButton
      type={type}
      variant={variant}
      size={size}
      color={color}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
      startIcon={loading ? <CircularProgress size={20} /> : undefined}
    >
      {children}
    </MuiButton>
  );
}
