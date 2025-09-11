// /src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    /* Base */
    fontFamily: "'Poppins', sans-serif",
    htmlFontSize: 16,        // 1rem = 16px
    fontSize: 16,            // base MUI (no tocar rem de html)

    /* Body */
    body1: {
      fontSize: '1.165rem',   // 18px para contenido principal
      lineHeight: 1.65,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.9375rem',    // 15px aprox. para textos auxiliares (ej. “Síguenos”)
      lineHeight: 1.55,
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.8125rem',   // 13px (barra gris superior)
      lineHeight: 1.4,
      fontWeight: 400,
    },

    /* Headings */
    h1: {
      fontSize: '2.25rem',   // 36px
      lineHeight: 1.2,
      fontWeight: 700,
      color: '#ff8000'
    },
    h2: {
      fontSize: '2.5rem',    // 28.8px
      lineHeight: 1.25,
      fontWeight: 700,
      color: '#ff8000'
    },
    h3: {
      fontSize: '1.4rem',    // 24px
      lineHeight: 1.3,
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.25rem',   // 20px
      lineHeight: 1.35,
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  palette: {
    primary: { main: '#ff8000' },
    text: { primary: '#15212f' },
    background: { default: '#ffffff' },
  },

  components: {
    MuiListItemText: {
      defaultProps: {
        primaryTypographyProps: { variant: 'body1' },
        secondaryTypographyProps: { variant: 'body2' },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          /* Antialiasing consistente */
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
  },
});

export default theme;
