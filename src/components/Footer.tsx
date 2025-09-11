import React from 'react';
import { Box, Typography, Link as MuiLink, Grid, Stack, IconButton, Container } from '@mui/material';
import logoLeonCompletoNLBlanco from '../assets/logo_leon_completo_nl_blanco.svg';
import iconFacebook2 from '../assets/icon-facebook2.png';
import iconInstagram2 from '../assets/icon-instagram2.png';
import iconTwitter2 from '../assets/icon-twitter2.png';
import iconTelegram2 from '../assets/icon-telegram2.png';
import iconTiktok2 from '../assets/icon-tiktok2.png';
import iconYoutube2 from '../assets/icon-youtube2.png';
import logoNuevoLeon from '../assets/leon_nl_naranja.svg';

const bottomLinksData = [
  { href: "https://nl.gob.mx/es/gobierno", text: "Gobierno" },
  { href: "https://nl.gob.mx/es/codigodeetica", text: "Código de ética" },
  { href: "https://nl.gob.mx/es/nlinea", text: "Trámites y servicios" },
  { href: "https://nl.gob.mx/es/decalogo", text: "Decálogo de principios" },
  { href: "https://nl.gob.mx/transparencia", text: "Transparencia" },
];

const socialIconsFooter = [
  { href: "https://www.facebook.com/gobiernonuevoleon/", src: iconFacebook2, alt: "Facebook" },
  { href: "https://www.instagram.com/nuevoleonmx/", src: iconInstagram2, alt: "Instagram" },
  { href: "https://twitter.com/nuevoleon", src: iconTwitter2, alt: "Twitter" },
  { href: "https://t.me/gobnl", src: iconTelegram2, alt: "Telegram" },
  { href: "https://www.tiktok.com/@nuevonlmx", src: iconTiktok2, alt: "TikTok" },
  { href: "https://www.youtube.com/user/GobiernoNuevoLeon", src: iconYoutube2, alt: "YouTube" },
];

const Footer = () => {
  const containerPadding = { xs: 2, sm: 4, md: 8, lg: 24 };

  return (
    <Box component="footer">
      {/* Bottom Links Section */}
      <Box sx={{ bgcolor: '#f1f1f1', py: '30px' }}>
        <Container maxWidth={false} sx={{ px: containerPadding }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              sx={{ flexGrow: 1, maxWidth: { xs: '100%', md: 'calc(100% - 200px)' } }}
            >
              {bottomLinksData.map((link) => (
                <Grid item xs={12} sm={6} key={link.text}>
                  <MuiLink
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Typography variant="body1">{link.text}</Typography>
                  </MuiLink>
                </Grid>
              ))}
            </Grid>
            <Box
              component="img"
              src={logoNuevoLeon}
              alt="Logo Nuevo León"
              sx={{
                width: { xs: '100px', md: '120px', lg: '150px' },
                height: 'auto',
                ml: { xs: 0, md: '16px' },
                mt: { xs: '20px', md: 0 }
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Main Footer Section */}
      <Box sx={{ bgcolor: '#FF8000', color: 'white', py: { xs: '10px', sm: '15px', md: '20px' } }}>
        <Container maxWidth={false} sx={{ px: containerPadding }}>
          <Box
            component="img"
            src={logoLeonCompletoNLBlanco}
            alt="Gobierno de Nuevo León"
            sx={{ height: '90px', mb: '10px', mt: '2%' }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              flexDirection: { xs: 'column', md: 'row' },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            {/* Links de privacidad y opinión */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={'15px'}
              sx={{
                flex: { md: 1 },
                justifyContent: { xs: 'center', md: 'flex-start' },
                mb: { xs: '15px', md: 0 }
              }}
            >
              <MuiLink
                href="https://nl.gob.mx/es/sobre-tratamiento-datos-personales"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                sx={{ textDecoration: 'none' }}
              >
                <Typography variant="body2" color="inherit" sx={{ fontWeight: 'bold' }}>
                  Sobre el tratamiento de datos personales
                </Typography>
              </MuiLink>
              <Typography component="span" variant="body2" sx={{ fontWeight: 'bold' }}>
                |
              </Typography>
              <MuiLink
                href="https://nl.gob.mx/es/formulario/opinion"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                sx={{ textDecoration: 'none' }}
              >
                <Typography variant="body2" color="inherit" sx={{ fontWeight: 'bold' }}>
                  Danos tu opinión
                </Typography>
              </MuiLink>
            </Stack>

            {/* Redes sociales */}
            <Stack alignItems={{ xs: 'center', md: 'flex-end' }} spacing={1}>
              <Typography component="span" variant="body2" sx={{ fontWeight: 'bold' }}>
                Mantente informado:
              </Typography>
              <Stack direction="row" spacing={{ xs: 0.625, sm: 1, md: 1.75, lg: 2.5 }}>
                {socialIconsFooter.map((icon) => (
                  <MuiLink key={icon.alt} href={icon.href} target="_blank" rel="noopener noreferrer">
                    <IconButton size="small" sx={{ p: 0 }}>
                      <img src={icon.src} alt={icon.alt} style={{ width: '30px', height: '30px' }} />
                    </IconButton>
                  </MuiLink>
                ))}
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
