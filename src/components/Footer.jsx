// src/components/Footer.jsx

import React from "react";
import { Box, Typography } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram'; // Importar ícono de Instagram
import FacebookIcon from '@mui/icons-material/Facebook'; // Importar ícono de Facebook

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#A0522D', color: '#fff', py: 4, px: 2, textAlign: 'center', position: 'relative' }}>
      {/* Información de contacto */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 4,
          mb: 2,
        }}
      >
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5 }}>
          <PhoneIcon />
          <Typography variant="body2">+56 9 7632 2314</Typography>
        </Box>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5 }}>
          <EmailIcon />
          <Typography variant="body2">cvivimendez49@gmail.com</Typography>
        </Box>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5 }}>
          <LocationOnIcon />
          <Typography variant="body2">Santiago, Chile</Typography>
        </Box>
      </Box>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Despacho:
        <br />
        En Santiago.
        <br />
        Regiones Via Starke o Chile express.
        <br />
      </Typography>

      {/* Texto del pie de página */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        © 2025 Teje-Lana.Vivi. Todos los derechos reservados.
      </Typography>

      {/* Íconos de redes sociales en la parte inferior derecha */}
      <Box sx={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', gap: 2 }}>
        <a href="https://www.instagram.com/teje_lanas.vivi/" target="_blank" style={{ color: '#fff' }}>
          <InstagramIcon sx={{ fontSize: 40 }} />
        </a>
        <a href="https://www.facebook.com/people/teje_lanasvivi/100063564043123/?sk=about_profile_transparency" target="_blank" style={{ color: '#fff' }}>
          <FacebookIcon sx={{ fontSize: 40 }} />
        </a>
      </Box>
    </Box>
  );
};

export default Footer;