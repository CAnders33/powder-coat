import React from 'react';
import { Box, styled } from '@mui/material';

const MasonryContainer = styled(Box)(({ theme }) => ({
  columnCount: 4,
  columnGap: theme.spacing(3),
  
  [theme.breakpoints.down('lg')]: {
    columnCount: 3,
  },
  [theme.breakpoints.down('md')]: {
    columnCount: 2,
  },
  [theme.breakpoints.down('sm')]: {
    columnCount: 1,
  },

  '& > *': {
    breakInside: 'avoid',
    marginBottom: theme.spacing(3),
    display: 'block',
    width: '100%',
  },
}));

interface MasonryLayoutProps {
  children: React.ReactNode;
}

export function MasonryLayout({ children }: MasonryLayoutProps) {
  return <MasonryContainer>{children}</MasonryContainer>;
}
