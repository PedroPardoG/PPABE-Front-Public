import React from 'react';
import { Box, Typography, List, ListItem, Link as MuiLink } from '@mui/material'; // Removed ListItemText as it wasn't used

const DocumentosPage: React.FC = () => {
  // Define the blue color for links, similar to standard web links
  const linkColor = '#0000EE'; // Standard web link blue

  return (
    <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}> {/* Responsive padding */}
      <section id="documentos">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 3 }} // Styles inherited from global CSS
        >
          Documentos y Recursos Oficiales
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          En esta sección podrás consultar y descargar los documentos normativos, técnicos y de referencia que sustentan la operación, legalidad y estructura del Padrón de Beneficiarios del Estado de Nuevo León. Todos los archivos son de acceso público y están disponibles en formatos abiertos.
        </Typography>

        {/* --- Normatividad Estatal --- */}
        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Normatividad Estatal
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <MuiLink
                href="https://www.hcnl.gob.mx/trabajo_legislativo/leyes/leyes/ley_de_desarrollo_social_para_el_estado_de_nuevo_leon/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: linkColor }} // Apply blue color
              >
                Ley de Desarrollo Social para el Estado de Nuevo León
              </MuiLink>
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <MuiLink
                href="https://www.hcnl.gob.mx/trabajo_legislativo/leyes/leyes/ley_de_transparencia_y_acceso_a_la_informacion_publica_del_estado_de_nuevo_leon/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: linkColor }} // Apply blue color
              >
                Ley de Transparencia y Acceso a la Información Pública del Estado de Nuevo León
              </MuiLink>
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <MuiLink
                href="https://smpu.nl.gob.mx/Archivos/MIR/Normatividad/Documentos/CRITERIOS%20PADRON%20DE%20BENEFICIARIOS.pdf-20190620%20142819..pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: linkColor }} // Apply blue color
              >
                Manual de Operaciones del SIIPB-NL
              </MuiLink>
            </ListItem>
          </List>
        </Box>

        {/* --- Normatividad Federal Relevante --- */}
        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Normatividad Federal Relevante
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <MuiLink
                href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LGDS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: linkColor }} // Apply blue color
              >
                Ley General de Desarrollo Social
              </MuiLink>
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <MuiLink
                href="https://www.scjn.gob.mx/sites/default/files/normativa/electronico/documentos/115455.pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: linkColor }} // Apply blue color
              >
                Ley General de Transparencia y Acceso a la Información Pública
              </MuiLink>
            </ListItem>
          </List>
        </Box>

        {/* --- Formatos y Catálogos de Datos --- */}
        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Formatos y Catálogos de Datos
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <MuiLink
                href="#" // Placeholder link
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: linkColor }} // Apply blue color
              >
                Formato de Padrón Único (FPU) – Versión PDF
              </MuiLink>
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <MuiLink
                href="#" // Placeholder link
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: linkColor }} // Apply blue color
              >
                Catálogo de Variables del FPU
              </MuiLink>
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <MuiLink
                href="#" // Placeholder link
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: linkColor }} // Apply blue color
              >
                Catálogo de Valores Permitidos
              </MuiLink>
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <MuiLink
                href="#" // Placeholder link
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: linkColor }} // Apply blue color
              >
                Lineamientos para Integración y Actualización de Padrones
              </MuiLink>
            </ListItem>
          </List>
          <Typography paragraph sx={{ mt: 2 }}>
            Estos formatos permiten conocer cómo se recaba la información y garantizan la estandarización entre las diferentes dependencias del Gobierno Estatal.
          </Typography>
        </Box>

        {/* --- Otros Recursos --- */}
        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Otros Recursos
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <MuiLink
                href="#" // Placeholder link
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: linkColor }} // Apply blue color
              >
                Política de Uso y Reutilización de Datos Abiertos
              </MuiLink>
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <MuiLink
                href="#" // Placeholder link
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: linkColor }} // Apply blue color
              >
                Criterios para Publicación del Padrón
              </MuiLink>
            </ListItem>
          </List>
        </Box>

        {/* --- Nota Final --- */}
        <Box className="subsection note" sx={{ borderLeft: '4px solid #FF8000', pl: 2, fontStyle: 'italic', mb: 4 }}>
          <Typography paragraph>
            Todos los documentos aquí disponibles tienen como objetivo fortalecer la transparencia, el acceso a la información y la comprensión técnica del padrón de beneficiarios.
          </Typography>
        </Box>
      </section>
    </Box>
  );
};

export default DocumentosPage;