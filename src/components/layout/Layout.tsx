import { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NAVIGATION_LINKS, COMPANY_INFO } from '@/utils/constants';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link 
              component={RouterLink} 
              to="/" 
              color="inherit" 
              underline="none"
              sx={{ fontWeight: 'bold' }}
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
                color="inherit"
                underline="hover"
                sx={{ fontWeight: 500 }}
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
          bgcolor: 'grey.100', 
          py: 4, 
          mt: 'auto',
          borderTop: 1,
          borderColor: 'grey.300'
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
            <Typography variant="body2" color="text.secondary">
              © 2026 {COMPANY_INFO.name}. All rights reserved.
            </Typography>
            
            <Box display="flex" gap={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {COMPANY_INFO.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                •
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {COMPANY_INFO.email}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
