import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Link as MuiLink,
  AppBar,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const containerPadding = {
    xs: '3vw',
    sm: '4vw',
    md: '5vw',
    lg: '6vw'
  };

  const containerHeadersPadding = {
    xs: '4vw',
    sm: '5vw',
    md: '6vw',
    lg: '8vw'
  };

  return (
    <Box component="header">
      {/* Barra Gris */}
      <Box sx={{ bgcolor: '#e0e0e0', py: { xs: '4px', sm: '5px' }, display: { xs: 'none', sm: 'block' } }}>
        <Container maxWidth={false} sx={{ px: containerHeadersPadding }}>
          <Typography
            component="p"
            sx={{
              color: '#595959',
              fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
              fontWeight: 300,
              lineHeight: 1.2,
              fontFamily: "'Poppins', sans-serif",
              whiteSpace: { xs: 'normal', md: 'nowrap' },
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              WebkitTextSizeAdjust: 'none',
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

      {/* Barra Blanca - Oculta en móvil */}
      <Box sx={{ py: '5px', bgcolor: 'white', display: { xs: 'none', sm: 'block' } }}>
        <Container maxWidth={false} sx={{ px: containerHeadersPadding }}>
          <Stack 
            direction="row" 
            justifyContent="flex-end" 
            alignItems="center" 
            spacing={{ xs: '10px', sm: '12px', md: '15px' }}
            flexWrap="wrap"
          >
            <Typography sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }, fontWeight: 'bold' }}>
              Síguenos:
            </Typography>
            {socialIcons.map(icon => (
              <MuiLink key={icon.alt} href={icon.href} target="_blank" rel="noopener noreferrer">
                <IconButton size="small" sx={{ p: 0 }}>
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    style={{ 
                      width: '1.25rem', 
                      height: '1.25rem',
                      maxWidth: '100%'
                    }}
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
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            py: { xs: 1, sm: 1.2, md: 0.2 },
            minHeight: { xs: 56, sm: 60, md: 64 }
          }}>
            {/* Logo */}
            <Box
              component="img"
              src={logoGenlBlanco}
              alt="Gobierno de Nuevo León"
              sx={{
                height: { xs: '32px', sm: '38px', md: '45px' },
                width: 'auto',
                flexShrink: 0
              }}
            />

            {/* Menú Desktop */}
            <Stack 
              component="nav" 
              direction="row" 
              alignItems="center" 
              spacing={{ md: '20px', lg: '25px' }}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
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
                    fontSize: { md: '1rem', lg: '1.1rem' },
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 0.8
                    }
                  }}
                >
                  {link.text}
                </MuiLink>
              ))}
              <IconButton 
                href="#" 
                sx={{ 
                  color: 'white', 
                  p: 0.5,
                  ml: { md: '15px', lg: '20px' }
                }}
              >
                <img
                  src={iconSearch}
                  alt="Buscar"
                  style={{ width: '1.5rem', height: '1.5rem' }}
                />
              </IconButton>
            </Stack>

            {/* Botón Menú Hamburguesa - Solo móvil */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ 
                display: { xs: 'block', md: 'none' },
                p: 1
              }}
            >
              <MenuIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
            </IconButton>
          </Box>
        </Container>
      </AppBar>

      {/* Drawer del Menú Hamburguesa */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '80vw', sm: '60vw', md: '400px' },
            maxWidth: '100vw',
            bgcolor: '#ff8000'
          }
        }}
      >
        <Box
          sx={{ width: '100%', height: '100%', bgcolor: '#ff8000', color: 'white' }}
          role="presentation"
        >
          {/* Header del Drawer */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Menú
            </Typography>
            <IconButton 
              onClick={toggleDrawer(false)}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Links principales */}
          <List sx={{ pt: 2 }}>
            {mainNavLinks.map((link) => (
              <ListItem key={link.text} disablePadding>
                <ListItemButton
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    py: 2,
                    px: 3,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <ListItemText 
                    primary={link.text}
                    primaryTypographyProps={{
                      sx: { 
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        color: 'white'
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 2 }} />

          {/* Redes Sociales en el Drawer */}
          <Box sx={{ px: 3, py: 2 }}>
            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', mb: 2, color: 'white' }}>
              Síguenos:
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
              {socialIcons.map(icon => (
                <MuiLink 
                  key={icon.alt} 
                  href={icon.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={toggleDrawer(false)}
                >
                  <IconButton 
                    size="small" 
                    sx={{ 
                      p: 0.5,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.3)'
                      }
                    }}
                  >
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      style={{ width: '1.5rem', height: '1.5rem' }}
                    />
                  </IconButton>
                </MuiLink>
              ))}
            </Stack>
          </Box>

          {/* Botón de búsqueda */}
          <Box sx={{ px: 3, py: 2 }}>
            <IconButton 
              href="#"
              onClick={toggleDrawer(false)}
              sx={{ 
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.2)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.3)'
                },
                p: 1.5
              }}
            >
              <img
                src={iconSearch}
                alt="Buscar"
                style={{ width: '1.5rem', height: '1.5rem' }}
              />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
