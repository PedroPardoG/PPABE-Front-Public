import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EstadisticasPage from './pages/EstadisticasPage'
import MarcoJuridicoPage from './pages/MarcoJuridicoPage'
import QueEsElPadronPage from './pages/QueEsElPadronPage'
import FAQPage from './pages/FAQPage'
import ProteccionDatosPage from './pages/ProteccionDatosPage'
import DocumentosPage from './pages/DocumentosPage'
import ContactoPage from './pages/ContactoPage' // Import the new page
import { Container } from '@mui/material'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Container maxWidth="false">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/estadisticas" element={<EstadisticasPage />} />
        <Route path="/marco-juridico" element={<MarcoJuridicoPage />} />
        <Route path="/que-es-el-padron" element={<QueEsElPadronPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/proteccion-datos" element={<ProteccionDatosPage />} />
        <Route path="/documentos" element={<DocumentosPage />} />
        <Route path="/contacto" element={<ContactoPage />} /> {/* Add the new route */}
      </Routes>
      <Footer />
    </Container>
  )
}

export default App
