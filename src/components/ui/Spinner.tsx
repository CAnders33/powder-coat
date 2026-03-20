import { CircularProgress, Box } from '@mui/material';

interface SpinnerProps {
  size?: number;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  centered?: boolean;
}

export default function Spinner({ 
  size = 40, 
  color = 'primary', 
  centered = true 
}: SpinnerProps) {
  const spinner = <CircularProgress size={size} color={color} />;

  if (centered) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100px"
      >
        {spinner}
      </Box>
    );
  }

  return spinner;
}
