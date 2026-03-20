import { Modal as MuiModal, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  outline: 'none',
  maxHeight: '90vh',
  overflow: 'auto',
};

export default function Modal({
  open,
  onClose,
  children,
  title,
  maxWidth = 'md',
}: ModalProps) {
  const getMaxWidth = () => {
    switch (maxWidth) {
      case 'xs': return 400;
      case 'sm': return 600;
      case 'md': return 900;
      case 'lg': return 1200;
      case 'xl': return 1536;
      default: return 900;
    }
  };

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby="modal-description"
    >
      <Box sx={{ ...modalStyle, maxWidth: getMaxWidth() }}>
        {title && (
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <h2 id="modal-title" style={{ margin: 0, fontSize: '1.5rem' }}>
              {title}
            </h2>
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        {!title && (
          <Box display="flex" justifyContent="flex-end" mb={1}>
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <div id="modal-description">
          {children}
        </div>
      </Box>
    </MuiModal>
  );
}
