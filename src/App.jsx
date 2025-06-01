// App.jsx
import React, { useState } from 'react';
import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Header from './components/Header.jsx';
import LandingPage from './components/LandingPage.jsx';
import Footer from './components/Footer.jsx';
import Faq from './components/Faq.jsx';

import { Box } from '@mui/material';
import CarritoFlotante from './components/CarritoFlotante.jsx'; // ✅ Nuevo import

function App() {
  const [carrito, setCarrito] = useState([]); // ✅ Estado global del carrito

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <LandingPage carrito={carrito} setCarrito={setCarrito} /> {/* ✅ Props pasados */}
      </Box>

      <Faq />
      <Footer />

      <CarritoFlotante carrito={carrito} setCarrito={setCarrito} /> {/* ✅ Botón flotante */}
    </Box>
  );
}

export default App;


