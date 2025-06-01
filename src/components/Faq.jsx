import React, { useState, useEffect } from 'react';
import { Box, Typography, Collapse, Button } from '@mui/material';

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '600px', width: '100%', mx: 'auto' }}>
      <Button
        onClick={handleToggle}
        sx={{ width: '100%', textAlign: 'left', padding: '10px', backgroundColor: '#f5f5f5' }}
      >
        <Typography variant="h6">{question}</Typography>
      </Button>
      <Collapse in={open}>
        <Box sx={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
          <Typography variant="body1" sx={{ color: 'black' }}>{answer}</Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/faq/', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ipss.get' // Reemplaza con tu token
          }
        });
        const data = await response.json();
        setFaqs(data.data.filter(faq => faq.activo)); // Filtrar solo FAQs activas
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFAQs();
  }, []); // Se ejecuta una vez al montar el componente

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#F5F5DC' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#A0522D' }}>
        Preguntas Frecuentes
      </Typography>
      {faqs.map((faq) => (
        <FAQItem key={faq.id} question={faq.titulo} answer={faq.respuesta} />
      ))}
    </Box>
  );
};

export default FAQ;