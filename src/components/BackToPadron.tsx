import React from 'react';
import { Box, Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const BackToPadron: React.FC = () => {
  const location = useLocation();

  // Mostrar siempre el botón cuando estamos en una ruta distinta a la home
  const isHome = location.pathname === '/' || location.pathname === '';

  if (isHome) return null;

  return (
    <Box
      sx={{
        // Use fixed to ensure it stays visible regardless of scroll container quirks
        position: 'fixed',
        bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
        left: 0,
        right: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1100, // above typical content
        pointerEvents: 'none', // allow clicks to pass except on the button
      }}
    >
      <Button
        component={RouterLink}
        to="/"
        aria-label="Regresar a consultar el padrón"
        variant="contained"
        sx={{
          bgcolor: '#FF6B35',
          color: 'white',
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: '20px',
          px: 3,
          py: 1,
          boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
          pointerEvents: 'auto',
          '&:hover': {
            bgcolor: '#FF8C5A',
            boxShadow: '0 8px 22px rgba(0,0,0,0.45)'
          }
        }}
      >
        REGRESAR A CONSULTAR EL PADRÓN
      </Button>
    </Box>
  );
};

export default BackToPadron;
