import React from 'react';
import { Box, Stack, Typography, Toolbar, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logoGenlBlanco from '../assets/logo_genl_blanco.svg';
import logoLeonNL from '../assets/leonnl.svg'; // Import the other logo
import '../App.css';

// Define menu items with text and path (updated)
const menuItems = [
  { text: "Consulta el Padrón", path: "/" },
  { text: "Estadísticas", path: "/estadisticas" },
  // { text: "Objetivo", path: "/objetivo" }, // Removed Objetivo
  { text: "Marco Jurídico", path: "/marco-juridico" },
  { text: "¿Qué es el Padrón?", path: "/que-es-el-padron" },
  // { text: "Datos Agregados", path: "/datos-agregados" }, // Removed Datos Agregados
  { text: "Preguntas Frecuentes", path: "/faq" },
  { text: "Protección de Datos", path: "/proteccion-datos" },
  { text: "Documentos", path: "/documentos" },
  { text: "Contacto", path: "/contacto" }
];

const Header = () => {
  return (
    <header>
      {/* Top Bar */}
      <div className="top-bar">
        <p>
          Este es un sitio web oficial del Gobierno del Estado de Nuevo León.
          <a href="#">Aprende a identificarlo</a>
        </p>
      </div>

      {/* Social Links Bar */}
      <div className="header-container">
        <div className="social-section">
          <span>Síguenos:</span>
          {/* Add social icons here if needed */}
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="header-container2">
        <div className="logo">
          <img src={logoGenlBlanco} alt="Gobierno de Nuevo León" />
        </div>
        <nav>
          <ul>
            <li><a href="#">Gobierno</a></li>
            <li><a href="#">Transparencia</a></li>
            <li><a href="#">Trámites y servicios</a></li>
            <li><a href="#">Visita NL</a></li>
          </ul>
          <a href="#" className="search-icon">
            {/* Add search icon image here if needed */}
          </a>
        </nav>
      </div>

      {/* Logo and Title Box (Moved from HomePage) */}
      <Box sx={{ bgcolor: '#FF8400', color: 'white', textAlign: 'center', py: 2, mt: 0 }}> {/* mt changed to 0 */}
        <Stack direction="column" alignItems="center" justifyContent="center">
          <img src={logoLeonNL} alt="Logo" style={{ height: '100px' }} />
          {/* Updated Title */}
          <Typography variant="h6" fontWeight="bold">Padrón Único de Beneficiarios del Gobierno de Nuevo León</Typography>
        </Stack>
      </Box>

      {/* Menu Bar (Moved from HomePage) */}
      <Box sx={{ bgcolor: '#FF8400', color: 'white', py: 1, mt: 0 }}> {/* mt changed to 0 */}
        <Toolbar sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          {menuItems.map((item) => (
            <MuiLink
              key={item.text + item.path} // Ensure key is unique if text might repeat later
              component={Link}
              to={item.path}
              color="inherit"
              underline="hover"
              sx={{
                mx: 1.5,
                my: 0.5,
                whiteSpace: 'nowrap',
                fontWeight: 'bold' // Added bold font weight
              }}
            >
              {item.text}
            </MuiLink>
          ))}
        </Toolbar>
      </Box>
    </header>
  );
};

export default Header;
