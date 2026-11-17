import { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NAVIGATION_LINKS, COMPANY_INFO } from '@/utils/constants';
import { colors } from '@/theme';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: colors.pageBackground,
      }}
    >
      {/* Header */}
      <AppBar 
        position="static" 
        sx={{
          backgroundColor: colors.headerBackground,
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link 
              component={RouterLink} 
              to="/" 
              sx={{ 
                color: colors.primaryText,
                textDecoration: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  color: colors.secondaryAccent,
                },
              }}
            >
              {COMPANY_INFO.name}
            </Link>
          </Typography>
          
          {/* Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                component={RouterLink}
                to={link.href}
                sx={{
                  color: colors.primaryText,
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    color: colors.primaryAccent,
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          backgroundColor: colors.cardSurface,
          py: 4, 
          mt: 'auto',
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <Container maxWidth="lg">
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Typography variant="body2" sx={{ color: colors.mutedText }}>
              © 2026 {COMPANY_INFO.name}. All rights reserved.
            </Typography>
            
            <Box display="flex" gap={1} alignItems="center">
              <Typography variant="body2" sx={{ color: colors.mutedText }}>
                {COMPANY_INFO.phone}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.mutedText }}>
                •
              </Typography>
              <Typography variant="body2" sx={{ color: colors.mutedText }}>
                {COMPANY_INFO.email}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
