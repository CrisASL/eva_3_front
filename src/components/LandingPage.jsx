import React from 'react';
import PaginaProductos from '../pages/PaginaProductos';
import PaginaContacto from '../pages/PaginaContacto';
import PaginaQuienesSomos from '../pages/PaginaQuienesSomos';
import PaginaServicios from '../pages/PaginaServicios'; 
import logo from '../assets/images/Logo1.png';

const LandingPage = ({ carrito, setCarrito }) => {
  return (
    <div>
      {/* QUIÉNES SOMOS */}
      <section
        id="quienes-somos"
        style={{
          minHeight: '30vh',
          padding: '40px 20px',
          boxSizing: 'border-box'
        }}
      >
        <PaginaQuienesSomos />
      </section>

      {/* LOGO EMPRESA */}
      <section
        style={{
          minHeight: '60vh',
          padding: '10px 20px',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img 
          src={logo} 
          alt="Logo de la empresa" 
          style={{ 
            maxWidth: '80%', 
            width: '450px', 
            height: '450px', 
            borderRadius: '20px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease'
          }} 
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      </section>

      {/* SERVICIOS */}
      <section
        id="servicios"
        style={{
          minHeight: '60vh',
          padding: '40px 20px',
          boxSizing: 'border-box'
        }}
      >
        <PaginaServicios />
      </section>

      {/* PRODUCTOS */}
      <section
        id="productos"
        style={{
          minHeight: '60vh',
          padding: '40px 20px',
          boxSizing: 'border-box'
        }}
      >
        <PaginaProductos carrito={carrito} setCarrito={setCarrito} /> {/* ✅ Props agregados */}
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        style={{
          minHeight: '60vh',
          padding: '40px 20px',
          boxSizing: 'border-box'
        }}
      >
        <PaginaContacto />
      </section>
    </div>
  );
};

export default LandingPage;
