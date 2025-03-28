import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContextProvider'
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles'; // Import theme utilities

// Define base colors
const orangeBase = '#ff8400';
const grayBase = '#f2f2f2';

// Create the global theme
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', Arial, sans-serif", // Set global font family
    // You can customize other typography variants here if needed
    h2: {
      fontWeight: 'bold',
      color: orangeBase, // Keep h2 color consistent if desired globally via theme
    },
    h3: {
      fontWeight: 'bold', // Keep h3 bold consistent if desired globally via theme
    },
  },
  palette: {
    primary: { // Use primary for the main orange color
      main: orangeBase,
      light: alpha(orangeBase, 0.5),
      dark: alpha(orangeBase, 0.7),
      contrastText: '#ffffff',
    },
    secondary: { // Use secondary for the gray color
      main: grayBase,
      light: alpha(grayBase, 0.5),
      dark: alpha(grayBase, 0.7),
      contrastText: orangeBase, // Contrast text for gray buttons
    },
    // Define custom colors if needed elsewhere, but primary/secondary are standard
    // orangemain: {
    //   main: orangeBase,
    //   light: alpha(orangeBase, 0.5),
    //   dark: alpha(orangeBase, 0.7),
    //   contrastText: '#ffffff',
    // },
    // graymain: {
    //   main: grayBase,
    //   light: alpha(grayBase, 0.5),
    //   dark: alpha(grayBase, 0.7),
    //   contrastText: '#ff8400',
    // },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'white',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'inherit',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}> {/* Wrap App with the global theme */}
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
