import { CircularProgress, Box, Typography } from '@mui/material';

interface SpinnerProps {
  size?: number;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  centered?: boolean;
  showText?: boolean;
  text?: string;
  minHeight?: string;
}

export default function Spinner({ 
  size = 40, 
  color = 'primary', 
  centered = true,
  showText = false,
  text = 'Loading...',
  minHeight = showText ? '60vh' : '100px'
}: SpinnerProps) {
  const spinner = <CircularProgress size={size} color={color} />;

  if (centered) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: showText ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: minHeight,
          gap: showText ? 2 : 0,
        }}
      >
        {spinner}
        {showText && (
          <Typography variant="body1" color="text.secondary">
            {text}
          </Typography>
        )}
      </Box>
    );
  }

  return showText ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {spinner}
      <Typography variant="body1" color="text.secondary">
        {text}
      </Typography>
    </Box>
  ) : spinner;
}
