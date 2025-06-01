import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import {
  Container, Typography, Paper, Card, CardContent, CardMedia,
  Button, CardActions, Box, Modal, Fade, Backdrop, FormControl,
  InputLabel, Select, MenuItem, Snackbar, Alert
} from '@mui/material';
import axios from 'axios';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

function PaginaProductos({ carrito, setCarrito }) {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [open, setOpen] = useState(false);
  const [tallaSeleccionada, setTallaSeleccionada] = useState('');
  const [colorSeleccionado, setColorSeleccionado] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/products-services/', {
          headers: {
            'Authorization': `Bearer ipss.get`
          }
        });
        setProductos(response.data.data.productos);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (producto) => {
    setProductoSeleccionado(producto);
    setTallaSeleccionada('');
    setColorSeleccionado('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProductoSeleccionado(null);
  };

  const agregarAlCarrito = () => {
    if (!productoSeleccionado) return;

    const item = {
      id: productoSeleccionado.id,
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      talla: tallaSeleccionada || null,
      color: colorSeleccionado || null,
      cantidad: 1
    };

    const existente = carrito.find(p =>
      p.id === item.id &&
      p.talla === item.talla &&
      p.color === item.color
    );

    if (existente) {
      const carritoActualizado = carrito.map(p =>
        p.id === item.id &&
        p.talla === item.talla &&
        p.color === item.color
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      );
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, item]);
    }

    setShowSnackbar(true);
    handleClose();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: 'relative' }}>
      <Paper elevation={3} sx={{ padding: { xs: 2, sm: 3 } }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{
          textAlign: 'center', color: 'primary.main', fontWeight: 'bold', mb: 3
        }}>
          Nuestros Productos
        </Typography>

        <Slider {...settings}>
          {productos.map((producto) => (
            <Box key={producto.id} sx={{ px: 2, py: 2 }}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', mx: 1 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={producto.imgs[0]}
                  alt={producto.nombre}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {producto.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {producto.descripcion}
                  </Typography>
                  <Typography variant="h6" color="primary.dark">
                    ${producto.precio}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button size="small" variant="contained" onClick={() => handleOpen(producto)}>
                    Ver Más
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Slider>

        {/* Modal de selección */}
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
              outline: 'none'
            }}>
              {productoSeleccionado && (
                <>
                  <Typography variant="h5" mb={2}>{productoSeleccionado.nombre}</Typography>

                  <Box
                    component="img"
                    src={productoSeleccionado.imgs[0]}
                    alt={productoSeleccionado.nombre}
                    sx={{
                      display: 'block',
                      maxWidth: '100%',
                      maxHeight: 400,
                      margin: '0 auto',
                      mb: 2,
                      borderRadius: 1,
                      objectFit: 'contain'
                    }}
                  />

                  <Typography variant="body1" paragraph>{productoSeleccionado.descripcion}</Typography>

                  {productoSeleccionado.tallas.length > 0 && (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Talla</InputLabel>
                      <Select
                        value={tallaSeleccionada}
                        onChange={(e) => setTallaSeleccionada(e.target.value)}
                        label="Talla"
                      >
                        {productoSeleccionado.tallas.map((talla) => (
                          <MenuItem key={talla} value={talla}>{talla}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {productoSeleccionado.colores.length > 0 && (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Color</InputLabel>
                      <Select
                        value={colorSeleccionado}
                        onChange={(e) => setColorSeleccionado(e.target.value)}
                        label="Color"
                      >
                        {productoSeleccionado.colores.map((color) => (
                          <MenuItem key={color} value={color}>{color}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={agregarAlCarrito}
                    disabled={
                      (productoSeleccionado.tallas.length > 0 && !tallaSeleccionada) ||
                      (productoSeleccionado.colores.length > 0 && !colorSeleccionado)
                    }
                  >
                    Agregar al Carrito
                  </Button>
                </>
              )}
            </Box>
          </Fade>
        </Modal>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setShowSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            Producto agregado al carrito.
          </Alert>
        </Snackbar>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1">
            Y mucho más... ¡Visítanos o contáctanos para conocer todo nuestro catálogo!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default PaginaProductos;

