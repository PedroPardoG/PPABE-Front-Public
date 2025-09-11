import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import MarcoJuridicoPage from './pages/MarcoJuridicoPage';
import QueEsElPadronPage from './pages/QueEsElPadronPage';
import FAQPage from './pages/FAQPage';
import ProteccionDatosPage from './pages/ProteccionDatosPage';
import EnlacesInteresPage from './pages/EnlacesInteresPage';
import EstadisticasPage from './pages/EstadisticasPage';
import ContactoPage from './pages/ContactoPage';

const App = () => {
  const containerPadding = {
    xs: '3vw',
    sm: '4vw',
    md: '5vw',
    lg: '6vw'
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Container disableGutters maxWidth={false} sx={{ flexGrow: 1, width: '100%', px: containerPadding }}>
        <Box component="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marco-juridico" element={<MarcoJuridicoPage />} />
            <Route path="/que-es-el-padron" element={<QueEsElPadronPage />} />
            <Route path="/preguntas-frecuentes" element={<FAQPage />} />
            <Route path="/proteccion-datos" element={<ProteccionDatosPage />} />
            <Route path="/enlaces-interes" element={<EnlacesInteresPage />} />
          </Routes>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default App;
