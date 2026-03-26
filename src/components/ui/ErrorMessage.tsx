import { Box, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        p: 4,
        gap: 2,
      }}
    >
      <ErrorOutline sx={{ fontSize: 48, color: 'error.main' }} />
      <Typography variant="h5" color="error.main" sx={{ fontWeight: 'bold' }}>
        Oops! Something went wrong
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '500px' }}>
        {error || 'Unable to load the page content. Please try again later.'}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
