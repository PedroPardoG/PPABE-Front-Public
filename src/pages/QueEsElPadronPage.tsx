import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const QueEsElPadronPage: React.FC = () => {
  return (
    <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}> {/* Responsive padding */}
      <section id="que-es">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 3 }} // Styles inherited from global CSS
        >
          ¿Qué es el Padrón de Beneficiarios?
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          El Padrón de Beneficiarios del Estado de Nuevo León es el registro oficial, sistematizado y actualizado que contiene la relación de personas físicas y actores sociales que reciben apoyos a través de programas sociales implementados por el Gobierno Estatal. Este instrumento permite identificar, clasificar y dar seguimiento a los beneficiarios de manera clara, transparente y verificable.
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          No se trata únicamente de una base de datos. El padrón es un componente esencial para la gestión eficiente de la política social, ya que permite conocer quién recibe qué tipo de apoyo, bajo qué criterios de elegibilidad, en qué momento y por parte de qué dependencia o programa.
        </Typography>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Funciones del Padrón
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Registro nominal: Identifica a las personas físicas o morales que han sido beneficiadas por los programas sociales." /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Transparencia: Permite que la ciudadanía supervise y consulte los apoyos otorgados con recursos públicos." /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Evaluación: Facilita el monitoreo del alcance, cobertura e impacto de los programas sociales." /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Planeación: Sirve de insumo para ajustar políticas públicas y focalizar mejor los recursos del Estado." /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Prevención de duplicidades: Ayuda a evitar que una misma persona o entidad reciba múltiples apoyos injustificados." /></ListItem>
          </List>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            ¿Qué tipo de información contiene?
          </Typography>
          <Typography paragraph>
            El padrón incluye información mínima establecida por la ley como:
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Nombre del beneficiario (cuando sea legalmente permitido)" /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Edad y sexo" /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Ubicación geográfica (municipio o región)" /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Nombre del programa social" /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Tipo de apoyo recibido (monetario, en especie o en servicios)" /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Monto del beneficio" /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Dependencia ejecutora del programa" /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Fecha de entrega del apoyo" /></ListItem>
          </List>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            ¿Por qué es importante?
          </Typography>
          <Typography paragraph>
            Contar con un padrón actualizado y público garantiza que los recursos lleguen a quienes verdaderamente lo necesitan. Además, fortalece la confianza ciudadana en las instituciones, promueve el control social y previene el uso indebido de los apoyos con fines electorales o particulares.
          </Typography>
          <Typography paragraph>
            El padrón también es clave para cumplir con los compromisos de transparencia nacional e internacional, y forma parte de los esfuerzos de gobierno abierto en beneficio de una gestión pública más honesta, equitativa y basada en evidencia.
          </Typography>
        </Box>
      </section>
    </Box>
  );
};

export default QueEsElPadronPage;
