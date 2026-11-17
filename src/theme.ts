import { createTheme } from '@mui/material/styles';

// Centralized color system
const colors = {
  // New dark design system with blue header and pink accents
  pageBackground: '#0E0E10',
  cardSurface: '#1A1A1E',
  headerBackground: '#1976d2', // Blue header
  primaryText: '#F2F2F0',
  mutedText: 'rgba(242, 242, 240, 0.6)',
  primaryAccent: '#1976d2', // Blue primary
  secondaryAccent: '#E91E63', // Pink accent for highlights/underlines
  border: 'rgba(255, 255, 255, 0.06)',
} as const;

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primaryAccent,
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: colors.primaryText,
    },
    secondary: {
      main: colors.secondaryAccent,
      light: '#F06292',
      dark: '#C2185B',
      contrastText: colors.primaryText,
    },
    background: {
      default: colors.pageBackground,
      paper: colors.cardSurface,
    },
    text: {
      primary: colors.primaryText,
      secondary: colors.mutedText,
    },
    divider: colors.border,
    grey: {
      50: colors.cardSurface,
      100: colors.cardSurface,
      200: colors.cardSurface,
      300: colors.border,
      400: colors.mutedText,
      500: colors.mutedText,
      600: colors.mutedText,
      700: colors.cardSurface,
      800: colors.cardSurface,
      900: colors.pageBackground,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: colors.primaryText,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: colors.primaryText,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: colors.primaryText,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: colors.primaryText,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: colors.primaryText,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: colors.primaryText,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: colors.primaryText,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: colors.mutedText,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '10px 24px',
        },
        sizeLarge: {
          padding: '12px 32px',
          fontSize: '1rem',
        },
        contained: {
          backgroundColor: colors.primaryAccent,
          color: colors.primaryText,
          '&:hover': {
            backgroundColor: colors.secondaryAccent,
          },
        },
        outlined: {
          borderColor: colors.border,
          color: colors.primaryText,
          '&:hover': {
            borderColor: colors.primaryAccent,
            backgroundColor: 'rgba(58, 123, 213, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: colors.cardSurface,
            '& fieldset': {
              borderColor: colors.border,
            },
            '&:hover fieldset': {
              borderColor: colors.primaryAccent,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primaryAccent,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.mutedText,
            '&.Mui-focused': {
              color: colors.primaryAccent,
            },
          },
          '& .MuiInputBase-input': {
            color: colors.primaryText,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: colors.cardSurface,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: colors.border,
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.cardSurface,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.cardSurface,
          borderBottom: `1px solid ${colors.border}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.border,
        },
      },
    },
  },
});

export { colors };
