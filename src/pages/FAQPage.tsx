import React from 'react';
import { Box, Typography } from '@mui/material';

const FAQPage: React.FC = () => {
  return (
    <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}> {/* Responsive padding */}
      <section id="faq">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 3 }} // Styles inherited from global CSS
        >
          Preguntas Frecuentes (FAQ)
        </Typography>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            ¿Qué información puedo consultar en este portal?
          </Typography>
          <Typography paragraph>
            En este portal puedes consultar datos sobre las personas físicas y actores sociales que han recibido apoyos por parte de programas sociales del Gobierno del Estado de Nuevo León. La información incluye el tipo de beneficio, el monto entregado, el municipio, la dependencia que lo otorgó y otros datos relevantes establecidos por ley.
          </Typography>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            ¿Puedo ver nombres de beneficiarios?
          </Typography>
          <Typography paragraph>
            Sí, siempre que la ley lo permita y se cumpla con las disposiciones de protección de datos personales. En algunos casos, los nombres pueden mostrarse de manera parcial o anonimizados, especialmente si se trata de personas en situación vulnerable.
          </Typography>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            ¿Cada cuánto tiempo se actualiza el padrón?
          </Typography>
          <Typography paragraph>
            La información del padrón se actualiza de manera periódica conforme a los reportes emitidos por las dependencias responsables de ejecutar los programas sociales. La periodicidad puede ser mensual, trimestral o anual, dependiendo del programa.
          </Typography>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            ¿Puedo descargar los datos?
          </Typography>
          <Typography paragraph>
            Sí. El portal permite descargar los datos públicos en formatos como Excel, CSV o JSON, filtrando por año, programa, municipio o tipo de beneficiario. Esto promueve la reutilización de la información con fines académicos, periodísticos o de auditoría social.
          </Typography>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            ¿Puedo reportar errores o inconsistencias?
          </Typography>
          <Typography paragraph>
            Sí. Si detectas errores o información incorrecta, puedes contactar al área responsable del portal mediante el formulario de contacto disponible en la sección “Contacto”. También puedes enviar sugerencias o comentarios para mejorar la plataforma.
          </Typography>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            ¿Qué protección tienen los datos personales?
          </Typography>
          <Typography paragraph>
            El portal está diseñado bajo un estricto apego a la Ley de Protección de Datos Personales del Estado de Nuevo León. Solo se publica la información que por ley debe ser pública, y se resguardan todos los datos sensibles de acuerdo con los estándares establecidos por la normatividad aplicable.
          </Typography>
        </Box>
      </section>
    </Box>
  );
};

export default FAQPage;
