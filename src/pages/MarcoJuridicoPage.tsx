import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const MarcoJuridicoPage: React.FC = () => {
  return (
    <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}> {/* Responsive padding */}
      <section id="marco">
        {/* Use Typography with component="h2". Styles are now global from index.css */}
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 3 }} // Removed color and font-weight, now global
        >
          Marco Jurídico – Padrón de Beneficiarios de Nuevo León
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}> {/* Add bottom margin */}
          El Padrón de Beneficiarios del Estado de Nuevo León está sustentado por un conjunto de normas legales y principios constitucionales que garantizan su existencia, funcionamiento y publicación como instrumento de transparencia, eficiencia administrativa y equidad social. Este marco normativo asegura que la gestión de los programas sociales se realice con base en el interés público, la no discriminación y el uso responsable de los recursos públicos.
        </Typography>

        <Box className="subsection" sx={{ mb: 4 }}> {/* Add bottom margin */}
          {/* Use Typography with component="h3". Styles are now global from index.css */}
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}> {/* Keep bold here or rely on global */}
            1. Constitución Política de los Estados Unidos Mexicanos
          </Typography>
          <Typography paragraph>
            <strong>Artículo 6°:</strong> Establece el derecho de acceso a la información como un derecho humano de todas las personas. Obliga a todas las autoridades, incluyendo a los gobiernos estatales, a garantizar este derecho bajo el principio de máxima publicidad, con excepciones limitadas y justificadas.
          </Typography>
          <Typography paragraph>
            Este artículo sienta las bases del sistema nacional de transparencia y fundamenta la obligación de publicar los padrones de beneficiarios de programas sociales como parte de la información de interés público.
          </Typography>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}> {/* Add bottom margin */}
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}> {/* Keep bold here or rely on global */}
            2. Ley de Desarrollo Social para el Estado de Nuevo León
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}> {/* Use List for proper semantics */}
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <ListItemText primary={
                <>
                  <strong>Artículo 30:</strong> Dispone la integración obligatoria del Padrón de Beneficiarios de los Programas Sociales como instrumento para garantizar la transparencia, equidad y eficacia en la asignación de apoyos públicos. También establece que este padrón debe estar disponible al público conforme a la legislación de transparencia.
                </>
              } />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <ListItemText primary={
                <>
                  <strong>Artículo 31:</strong> Asigna a la Secretaría de Desarrollo Social la responsabilidad directa de la actualización, verificación y resguardo de los datos contenidos en el padrón. Esto asegura una cadena de responsabilidad institucional.
                </>
              } />
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <ListItemText primary={
                <>
                  <strong>Artículo 31 Bis y subsecuentes (Reforma 2023):</strong> Introducen la creación de un padrón único estatal, evitan la duplicidad de beneficiarios, sistematizan la información y fortalecen la interoperabilidad entre dependencias.
                </>
              } />
            </ListItem>
          </List>
          <Typography paragraph sx={{ mt: 2 }}> {/* Add top margin */}
            Esta ley es el pilar jurídico principal del Padrón de Beneficiarios en Nuevo León, y legitima su publicación como mecanismo de gobernanza social.
          </Typography>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}> {/* Add bottom margin */}
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}> {/* Keep bold here or rely on global */}
            3. Ley de Transparencia y Acceso a la Información Pública del Estado de Nuevo León
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <ListItemText primary={
                <>
                  <strong>Artículo 95, Fracción XVI, Inciso p):</strong> Obliga a los sujetos obligados (dependencias estatales) a publicar información detallada sobre los beneficiarios de subsidios, apoyos o estímulos. Esto incluye:
                </>
              } />
              <List sx={{ listStyleType: 'circle', pl: 4, mt: 1 }}> {/* Nested list */}
                <ListItem sx={{ display: 'list-item', p: 0 }}><ListItemText primary="Nombre de la persona física o moral beneficiaria." /></ListItem>
                <ListItem sx={{ display: 'list-item', p: 0 }}><ListItemText primary="Tipo y monto del apoyo recibido." /></ListItem>
                <ListItem sx={{ display: 'list-item', p: 0 }}><ListItemText primary="Unidad territorial (ubicación)." /></ListItem>
                <ListItem sx={{ display: 'list-item', p: 0 }}><ListItemText primary="Edad y sexo (cuando aplique)." /></ListItem>
              </List>
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <ListItemText primary={
                <>
                  <strong>Artículo 103:</strong> Establece que los fideicomisos, fondos y similares también deben publicar información de beneficiarios cuando apliquen.
                </>
              } />
            </ListItem>
          </List>
          <Typography paragraph sx={{ mt: 2 }}> {/* Add top margin */}
            Esta ley garantiza que el padrón sea accesible a cualquier persona, sin necesidad de justificar su interés, promoviendo la participación y la fiscalización ciudadana.
          </Typography>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}> {/* Add bottom margin */}
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}> {/* Keep bold here or rely on global */}
            4. Decreto de Creación del SIIPB-NL y Manual de Operaciones
          </Typography>
          <Typography paragraph>
            El <strong>Sistema Integral de Información de Padrones de Beneficiarios de Programas del Estado de Nuevo León (SIIPB-NL)</strong> fue creado por decreto en 2015 y operativo a través de su Manual de 2016. Este sistema fue un antecedente clave para la centralización de la información de beneficiarios y permitió establecer criterios técnicos y administrativos para la construcción del padrón único.
          </Typography>
          <Typography paragraph>
            El SIIPB-NL permite identificar tres tipos de programas: aquellos con beneficiarios nominales, programas con subsidios sin identificación directa y programas que apoyan actividades específicas. Esta categorización ayuda a determinar el tipo de información publicada en el portal.
          </Typography>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}> {/* Add bottom margin */}
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}> {/* Keep bold here or rely on global */}
            5. Ley General de Desarrollo Social (Federal)
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Artículo 7:</strong> Reconoce el derecho de todas las personas a participar y beneficiarse de los programas sociales.</>} /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Artículo 8:</strong> Establece la obligación del Estado de priorizar la atención a grupos en situación de vulnerabilidad.</>} /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Artículo 10:</strong> Reconoce el derecho de los beneficiarios a la privacidad de sus datos personales, reforzando el equilibrio entre transparencia y protección de datos.</>} /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Artículo 27:</strong> Define el Padrón de Beneficiarios como una herramienta fundamental para garantizar la eficacia y control de los programas sociales.</>} /></ListItem>
          </List>
          <Typography paragraph sx={{ mt: 2 }}> {/* Add top margin */}
            Esta ley ofrece el contexto normativo a nivel nacional y complementa las obligaciones estatales de transparencia y focalización del gasto social.
          </Typography>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}> {/* Add bottom margin */}
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}> {/* Keep bold here or rely on global */}
            6. Principios Normativos y Éticos Vinculados
          </Typography>
          <Typography paragraph>
            Además del marco legal explícito, el funcionamiento del Padrón de Beneficiarios está alineado con principios internacionales y nacionales como:
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Máxima Publicidad:</strong> Toda información en posesión de entes públicos debe ser accesible por defecto, salvo por razones excepcionales justificadas.</>} /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Progresividad de los Derechos Sociales:</strong> Obliga al Estado a avanzar, no retroceder, en el acceso y disfrute efectivo de derechos como la alimentación, salud, vivienda y seguridad social.</>} /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary={<><strong>Uso Ético de la Información:</strong> Los datos de los beneficiarios deben ser utilizados únicamente para fines administrativos, estadísticos, de evaluación y mejora de programas, sin usos partidistas, comerciales ni discriminatorios.</>} /></ListItem>
          </List>
        </Box>

        <Box className="subsection note" sx={{ borderLeft: '4px solid #FF8000', pl: 2, fontStyle: 'italic', mb: 4 }}> {/* Add note styling and bottom margin */}
          <Typography paragraph>
            <strong>En conjunto:</strong> este marco jurídico robustece la legitimidad del portal, define claramente los datos que deben ser públicos, y establece obligaciones precisas para garantizar el derecho ciudadano a conocer cómo se ejerce el gasto social del estado.
          </Typography>
        </Box>
      </section>

      {/* --- NEW SECTION --- */}
      <Box component="section" id="objetivo" sx={{ mt: 6 }}> {/* Add top margin to separate sections */}
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 3 }} // Styles inherited from global CSS
        >
          Objetivo y Justificación del Portal
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          El Portal de Beneficiarios del Estado de Nuevo León es una iniciativa de gobierno abierto que tiene como finalidad principal proporcionar a la ciudadanía un acceso transparente, confiable y sistemático a la información relativa a los apoyos económicos, en especie y en servicios entregados por el Gobierno Estatal a través de sus programas sociales.
        </Typography>

        <Typography paragraph sx={{ mb: 3 }}>
          Este portal no solo cumple una función informativa, sino que actúa como una herramienta esencial de rendición de cuentas, control público, evaluación de impacto y diseño de política pública. Contribuye a que las y los ciudadanos conozcan en qué se están utilizando los recursos públicos, quiénes los están recibiendo, en qué cantidades y bajo qué programas, permitiendo así una supervisión ciudadana activa y fundamentada.
        </Typography>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Objetivos Específicos del Portal
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Transparencia y acceso a la información pública: Garantizar el cumplimiento del derecho constitucional de las personas a conocer cómo se ejercen los recursos del erario en materia de desarrollo social." /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Prevención de duplicidades y uso indebido: Facilitar la identificación de apoyos duplicados o mal gestionados, y contribuir al combate del uso clientelar, electoral o comercial de los programas sociales." /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Planeación estratégica y evaluación: Proveer a instituciones públicas, académicos y organismos de datos organizados que les permitan analizar la cobertura, eficiencia, equidad e impacto de los programas sociales." /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Participación ciudadana y vigilancia social: Incentivar a la ciudadanía, medios de comunicación y organizaciones civiles a supervisar de manera activa y propositiva la distribución del gasto público social." /></ListItem>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}><ListItemText primary="Fortalecimiento institucional: Apoyar a las dependencias responsables en la depuración, mejora y sistematización de los padrones de beneficiarios." /></ListItem>
          </List>
        </Box>

        <Box className="subsection" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Justificación Legal y Ética
          </Typography>
          <Typography paragraph>
            El portal está respaldado por un marco jurídico sólido. La <strong>Ley de Desarrollo Social para el Estado de Nuevo León</strong>, en su Artículo 30, establece la integración del Padrón de Beneficiarios como instrumento obligatorio de transparencia, equidad y eficacia. Esta disposición legal obliga al Estado no solo a gestionar esta información, sino también a publicarla en términos de la <strong>Ley de Transparencia y Acceso a la Información Pública del Estado</strong>.
          </Typography>

          <Typography paragraph>
            La transparencia del padrón se vincula también con los principios del <strong>Artículo 6° de la Constitución Política de los Estados Unidos Mexicanos</strong>, que consagra el derecho humano de acceso a la información como una obligación para todas las autoridades.
          </Typography>

          <Typography paragraph>
            Desde una perspectiva ética, el Gobierno del Estado de Nuevo León reconoce que el acceso a la información pública no es un privilegio, sino un derecho y una herramienta fundamental para construir confianza, participación, integridad institucional y eficacia administrativa. En ese sentido, el portal no es un fin en sí mismo, sino parte de una política de Estado orientada a fortalecer la relación entre gobierno y sociedad.
          </Typography>
        </Box>

        <Box className="subsection note" sx={{ borderLeft: '4px solid #FF8000', pl: 2, fontStyle: 'italic', mb: 4 }}>
          <Typography paragraph>
            <strong>En resumen:</strong> este portal representa un esfuerzo conjunto por modernizar la gestión social, promover el uso legítimo y eficiente de los recursos públicos y empoderar a la ciudadanía con información clara, actualizada y útil para el ejercicio de sus derechos y responsabilidades.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MarcoJuridicoPage;
