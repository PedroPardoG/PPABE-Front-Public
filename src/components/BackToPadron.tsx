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
        position: 'sticky',
        bottom: 20,
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        zIndex: 1000,
        mt: 3
      }}
    >
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        sx={{
          bgcolor: '#FF6B35',
          color: 'white',
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: '20px',
          px: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          '&:hover': { 
            bgcolor: '#FF8C5A',
            boxShadow: '0 6px 16px rgba(0,0,0,0.4)'
          }
        }}
      >
        REGRESAR A CONSULTAR EL PADRÓN
      </Button>
    </Box>
  );
};

export default BackToPadron;
