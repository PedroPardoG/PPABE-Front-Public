import React from 'react';
import {
  Box,
  Stack,
  Typography,
  Link as MuiLink,
  AppBar,
  IconButton,
  Container
} from '@mui/material';
import { Link } from 'react-router-dom';
import logoGenlBlanco from '../assets/logo_genl_blanco.svg';
import logoLeonNL from '../assets/leon_nl_blanco.svg';
import iconFacebook from '../assets/icon-facebook.png';
import iconInstagram from '../assets/icon-instagram.png';
import iconTwitter from '../assets/icon-twitter.png';
import iconTelegram from '../assets/icon-telegram.png';
import iconTiktok from '../assets/icon-tiktok.png';
import iconYoutube from '../assets/icon-youtube.png';
import iconSearch from '../assets/icon-search.png';

// Exportar menuItems para usar en otras páginas
export const menuItems = [
  { text: "Consulta el Padrón", path: "/" },
  { text: "Marco Jurídico", path: "/marco-juridico" },
  { text: "¿Qué es el Padrón?", path: "/que-es-el-padron" },
  { text: "Preguntas Frecuentes", path: "/preguntas-frecuentes" },
  { text: "Protección de Datos", path: "/proteccion-datos" },
  { text: "Enlaces de Interés", path: "/enlaces-interes" }
];

const socialIcons = [
  { href: "https://www.facebook.com/gobiernonuevoleon/", src: iconFacebook, alt: "Facebook" },
  { href: "https://www.instagram.com/nuevoleonmx/", src: iconInstagram, alt: "Instagram" },
  { href: "https://twitter.com/nuevoleon", src: iconTwitter, alt: "Twitter" },
  { href: "https://t.me/gobnl", src: iconTelegram, alt: "Telegram" },
  { href: "https://www.tiktok.com/@nuevonlmx", src: iconTiktok, alt: "TikTok" },
  { href: "https://www.youtube.com/user/GobiernoNuevoLeon", src: iconYoutube, alt: "YouTube" }
];

const mainNavLinks = [
  { href: "https://nl.gob.mx/es/gobierno", text: "Gobierno" },
  { href: "https://nl.gob.mx/transparencia", text: "Transparencia" },
  { href: "https://nl.gob.mx/es/nlinea", text: "Trámites y servicios" },
  { href: "https://www.nuevoleon.travel/", text: "Visita NL" }
];

const Header = () => {
  const containerPadding = {
    xs: '3vw',
    sm: '4vw',
    md: '5vw',
    lg: '6vw'
  };

  const containerHeadersPadding = {
    xs: '3vw',
    sm: '4vw',
    md: '6vw',
    lg: '8vw'
  };

  return (
    <Box component="header">
      {/* Barra Gris */}
      <Box sx={{ bgcolor: '#e0e0e0', py: '5px' }}>
        <Container maxWidth={false} sx={{ px: containerHeadersPadding }}>
          <Typography
            component="p"
            sx={{
              color: '#595959',
              fontSize: '0.8rem',
              fontWeight: 300,
              lineHeight: 1.0,
              fontFamily: "'Poppins', sans-serif",
              whiteSpace: 'nowrap',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              WebkitTextSizeAdjust: 'none', // evita que Safari escale
              textSizeAdjust: 'none'
            }}
          >
            Este es un sitio web oficial del Gobierno del Estado de Nuevo León.&nbsp;
            <MuiLink
              href="#"
              sx={{
                color: '#000000',
                textDecoration: 'underline',
                fontWeight: 500,
                fontSize: 'inherit',
                fontFamily: 'inherit'
              }}
            >
              Aprende a identificarlo
            </MuiLink>
          </Typography>
        </Container>
      </Box>

      {/* Barra Blanca */}
      <Box sx={{ py: '5px', bgcolor: 'white' }}>
        <Container maxWidth={false} sx={{ px: containerHeadersPadding }}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={'15px'}>
            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
              Síguenos:
            </Typography>
            {socialIcons.map(icon => (
              <MuiLink key={icon.alt} href={icon.href} target="_blank" rel="noopener noreferrer">
                <IconButton size="small" sx={{ p: 0 }}>
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    style={{ width: '1.35rem', height: '1.35rem' }}
                  />
                </IconButton>
              </MuiLink>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Barra Naranja Principal */}
      <AppBar position="static" sx={{ bgcolor: '#ff8000', color: 'white' }}>
        <Container maxWidth={false} sx={{ px: containerHeadersPadding }}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            width: '100%',
            py: { xs: 0.2, md: 0.2 }
          }}>
            <Box
              component="img"
              src={logoGenlBlanco}
              alt="Gobierno de Nuevo León"
              sx={{
                height: { xs: '40px', sm: '45px' },
                width: 'auto',
                mb: { xs: 0, md: 0 }
              }}
            />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} />
            <Stack component="nav" direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={{ xs: 1, md: '25px' }}>
              {mainNavLinks.map(link => (
                <MuiLink
                  key={link.text}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    fontSize: '1.1rem',
                    width: { xs: '100%', md: 'auto' },
                    textAlign: 'center'
                  }}
                >
                  {link.text}
                </MuiLink>
              ))}
              <IconButton href="#" sx={{ color: 'white', p: 0, mt: { xs: 2, md: 0 }, ml: { md: '20px' } }}>
                <img
                  src={iconSearch}
                  alt="Buscar"
                  style={{ width: '1.5rem', height: '1.5rem' }}
                />
              </IconButton>
            </Stack>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
