import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePickerComponent({
  label,
  value,
  onChange,
  error,
  required,
  disabled,
  minDate,
  maxDate,
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        slots={{
          textField: TextField,
        }}
        slotProps={{
          textField: {
            required,
            error: !!error,
            helperText: error,
            fullWidth: true,
            variant: 'outlined',
          },
        }}
      />
    </LocalizationProvider>
  );
}
