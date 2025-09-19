import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const ApiConfigTest: React.FC = () => {
  const envVars = {
    VITE_APPLICATION_ENDPOINT: import.meta.env.VITE_APPLICATION_ENDPOINT,
    VITE_APPLICATION_FILES: import.meta.env.VITE_APPLICATION_FILES,
    VITE_DOC_ROUTE: import.meta.env.VITE_DOC_ROUTE,
    PORT: import.meta.env.PORT,
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Configuración de API - Test
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Variables de Entorno:
        </Typography>
        <List>
          {Object.entries(envVars).map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText 
                primary={key}
                secondary={value || 'No definida'}
                sx={{ 
                  '& .MuiListItemText-secondary': { 
                    color: value ? 'green' : 'red' 
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Estado de la Configuración:
        </Typography>
        <Typography 
          color={envVars.VITE_APPLICATION_ENDPOINT ? 'success.main' : 'error.main'}
        >
          {envVars.VITE_APPLICATION_ENDPOINT ? 
            '✅ Configuración correcta - Backend conectado' : 
            '❌ Error - Falta configurar VITE_APPLICATION_ENDPOINT'
          }
        </Typography>
      </Paper>
    </Box>
  );
};

export default ApiConfigTest;
