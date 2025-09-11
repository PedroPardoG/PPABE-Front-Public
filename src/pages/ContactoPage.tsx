import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Link as MuiLink, TextField, Button } from '@mui/material';

const ContactoPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
      <section id="contacto">
        {/* H2 gobernado por theme (sin sx.fontSize) */}
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 3 }}
        >
          Contacto y Retroalimentación
        </Typography>

        {/* Texto normal -> body1 por defecto (theme controla tamaño/line-height) */}
        <Typography paragraph sx={{ mb: 3 }}>
          Tu participación es fundamental para seguir fortaleciendo este portal. Si tienes preguntas, deseas reportar inconsistencias, sugerir mejoras o ejercer tus derechos en materia de datos personales, puedes ponerte en contacto con nosotros a través de los medios oficiales.
        </Typography>

        <Box sx={{ mb: 4 }}>
          {/* Subtítulo como H3 para usar tamaños del theme */}
          <Typography variant="h3" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Unidad de Transparencia del Gobierno del Estado de Nuevo León
          </Typography>

          {/* ListItemText -> por defecto usa body1; si en tu theme definiste defaultProps, obedecerá */}
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <ListItemText primary={<><strong>Teléfono:</strong> (81) 2020 1234</>} />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <ListItemText primary={<><strong>Correo electrónico:</strong> transparencia@nuevoleon.gob.mx</>} />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <ListItemText primary={<><strong>Dirección:</strong> Palacio de Gobierno, Zaragoza y 5 de Mayo, Centro, Monterrey, N.L., C.P. 64000</>} />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Formulario de Retroalimentación
          </Typography>

          {/* El formulario hereda tipografía; los inputs usan sus propios tamaños internos de MUI */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoComplete="name"
              autoFocus
              variant="outlined"
              size="small"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="correo"
              label="Correo electrónico"
              name="correo"
              autoComplete="email"
              variant="outlined"
              size="small"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mensaje"
              name="mensaje"
              label="Mensaje / Comentario"
              multiline
              rows={5}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, color: 'white' }}
            >
              Enviar
            </Button>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            ¿Deseas ejercer tus Derechos ARCO?
          </Typography>
          <Typography paragraph>
            Si eres beneficiario y deseas acceder, rectificar, cancelar u oponerte al uso de tus datos personales, puedes hacerlo mediante el{' '}
            <MuiLink href="https://www.nl.gob.mx/acceso-informacion" target="_blank" rel="noopener noreferrer">
              sistema de solicitudes de información del Estado
            </MuiLink>.
          </Typography>
        </Box>

        <Box sx={{ borderLeft: '4px solid #FF8000', pl: 2, fontStyle: 'italic', mb: 4 }}>
          <Typography paragraph>
            Este portal está en constante mejora. Tus comentarios ayudan a fortalecer la transparencia, mejorar la usabilidad y aumentar el valor social de este esfuerzo institucional.
          </Typography>
        </Box>
      </section>
    </Box>
  );
};

export default ContactoPage;
