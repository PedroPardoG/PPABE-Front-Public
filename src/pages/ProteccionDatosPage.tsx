import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const ProteccionDatosPage: React.FC = () => {
  return (
    <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}> {/* Responsive padding */}
      <section id="proteccion">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 3 }} // Styles inherited from global CSS
        >
          Protección de Datos Personales
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          El Gobierno del Estado de Nuevo León, a través de este portal, garantiza que la información personal de los beneficiarios es tratada con apego estricto a la normatividad vigente en materia de protección de datos personales. El portal ha sido diseñado para equilibrar la transparencia con la privacidad, asegurando el derecho al acceso a la información sin poner en riesgo la seguridad o dignidad de los beneficiarios.
        </Typography>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Marco Legal Aplicable
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Ley de Protección de Datos Personales en Posesión de Sujetos Obligados del Estado de Nuevo León." /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Artículo 10 de la Ley General de Desarrollo Social:</strong> Derecho de los beneficiarios a la privacidad de su información.</>} /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Artículo 6° de la Constitución Política de los Estados Unidos Mexicanos:</strong> Principio de máxima publicidad y protección de datos.</>} /></ListItem>
          </List>
          <Typography paragraph sx={{ mt: 2 }}>
            Estas normas definen los límites de la publicación de datos personales y establecen los mecanismos para su protección.
          </Typography>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Principios de Protección de Datos Aplicados
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Licitud y finalidad:</strong> Los datos son recabados con fines específicos de política social, no se utilizan con fines comerciales o electorales.</>} /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Proporcionalidad:</strong> Solo se publica la información mínima necesaria para cumplir con los objetivos de transparencia.</>} /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Responsabilidad:</strong> Las dependencias son responsables del correcto uso, actualización y resguardo de los datos.</>} /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Seguridad:</strong> El portal emplea medidas técnicas y administrativas para proteger la integridad de los datos.</>} /></ListItem>
          </List>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Datos que No se Publican
          </Typography>
          <Typography paragraph>
            Conforme a las regulaciones, los siguientes datos personales no son públicos:
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="CURP" /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Domicilio completo" /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Teléfonos o correos personales" /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Información médica, escolar o de familiares" /></ListItem>
          </List>
          <Typography paragraph sx={{ mt: 2 }}>
            En algunos casos, se aplican técnicas de anonimización para proteger a grupos especialmente vulnerables.
          </Typography>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ejercicio de Derechos ARCO
          </Typography>
          <Typography paragraph>
            Las personas beneficiarias tienen derecho a <strong>Acceder, Rectificar, Cancelar u Oponerse</strong> al tratamiento de sus datos personales (Derechos ARCO). Para ejercer estos derechos, pueden comunicarse con la Unidad de Transparencia correspondiente al programa social.
          </Typography>
        </Box>

        <Box className="subsection note" sx={{ borderLeft: '4px solid #FF8000', pl: 2, fontStyle: 'italic', mb: 4 }}>
          <Typography paragraph>
            <strong>Compromiso institucional:</strong> Este portal se rige por los más altos estándares de protección de datos personales y busca fomentar la confianza ciudadana mediante el uso responsable, legal y ético de la información pública.
          </Typography>
        </Box>
      </section>
    </Box>
  );
};

export default ProteccionDatosPage;
