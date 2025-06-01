import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import {
  Container, Typography, Paper, Card, CardContent, CardMedia,
  Button, CardActions, Box, Modal, Fade, Backdrop
} from '@mui/material';
import axios from 'axios';

const settings = {
  dots: true,
  infinite: false, // Cambiado a false porque solo hay 2 servicios
  speed: 500,
  slidesToShow: 1, // Mostrar 1 servicio a la vez
  slidesToScroll: 1,
};

function PaginaServicios() {
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/products-services/', {
          headers: {
            'Authorization': `Bearer ipss.get`
          }
        });
        setServicios(response.data.data.servicios);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (servicio) => {
    setServicioSeleccionado(servicio);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setServicioSeleccionado(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: 'relative', padding: 0 }}> {/* Ajuste aquí */}
      <Paper elevation={3} sx={{ padding: { xs: 2, sm: 3 }, border: 'none' }}> {/* Asegúrate de que no haya borde */}
        <Typography variant="h3" component="h1" gutterBottom sx={{
          textAlign: 'center', color: 'primary.main', fontWeight: 'bold', mb: 3
        }}>
          Nuestros Servicios
        </Typography>

        <Slider {...settings}>
          {servicios.map((servicio) => (
            <Box key={servicio.id} sx={{ px: 2, py: 2 }}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', mx: 1 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={servicio.imgs[0]} // Usar la primera imagen
                  alt={servicio.nombre}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {servicio.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Ubicación: {servicio.ubicacion}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Fecha: {servicio.fecha}
                  </Typography>
                  <Typography variant="h6" color="primary.dark">
                    Cupos disponibles: {servicio.cupos}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button size="small" variant="contained" onClick={() => handleOpen(servicio)}>
                    Ver Más
                  </Button>
                  <Button size="small" variant="outlined" sx={{ ml: 1 }}>Inscribirse</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Slider>

        {/* Modal para Ver Más */}
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={open}>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 500 },
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              outline: 'none',
            }}>
              {servicioSeleccionado && (
                <>
                  <Typography variant="h5" mb={2}>
                    {servicioSeleccionado.nombre}
                  </Typography>

                  <Box
                    component="img"
                    src={servicioSeleccionado.imgs[0]}
                    alt={servicioSeleccionado.nombre}
                    sx={{
                      display: 'block',
                      maxWidth: '100%',
                      maxHeight: 400,
                      width: 'auto',
                      height: 'auto',
                      margin: '0 auto',
                      mb: 2,
                      borderRadius: 1,
                      objectFit: 'contain',
                    }}
                  />

                  <Typography variant="body1" paragraph>
                    Ubicación: {servicioSeleccionado.ubicacion}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Fecha: {servicioSeleccionado.fecha}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Cupos disponibles: {servicioSeleccionado.cupos}
                  </Typography>
                </>
              )}
            </Box>
          </Fade>
        </Modal>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1">
            ¡Únete a nosotros y descubre más sobre nuestros talleres y servicios!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default PaginaServicios;