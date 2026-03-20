import { TextField } from '@mui/material';

interface InputProps {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  multiline?: boolean;
  rows?: number;
}

export default function Input({
  type = 'text',
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  required,
  disabled,
  className,
  multiline = false,
  rows = 4,
}: InputProps) {
  return (
    <TextField
      id={name}
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error}
      required={required}
      disabled={disabled}
      className={className}
      fullWidth
      variant="outlined"
      multiline={multiline}
      rows={multiline ? rows : undefined}
    />
  );
}
