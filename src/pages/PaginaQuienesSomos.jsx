// src/pages/PaginaQuienesSomos.jsx

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

function PaginaQuienesSomos() {
  const [informacion, setInformacion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/about-us/', {
          headers: {
            'Authorization': `Bearer ipss.get`
          }
        });
        setInformacion(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 'bold' }}>
          Quiénes Somos
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" paragraph>
            {informacion}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default PaginaQuienesSomos;