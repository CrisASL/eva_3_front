import React, { useState } from 'react';
import { Badge, IconButton, Drawer, Box, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CarritoFlotante = ({ carrito, setCarrito }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  return (
    <>
      {/* Botón flotante en la parte superior derecha, con top más alto en móvil */}
      <Box
        sx={{
          position: 'fixed',
          top: { xs: 80, sm: 16 }, // mueve el botón más abajo en móviles
          right: 16,
          zIndex: 1300,
        }}
      >
        <IconButton color="white" onClick={toggleDrawer}>
          <Badge badgeContent={carrito.length} color="secondary">
            <ShoppingCartIcon sx={{ fontSize: 32 }} />
          </Badge>
        </IconButton>
      </Box>

      {/* Panel lateral del carrito */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Carrito de compras
          </Typography>

          {carrito.length === 0 ? (
            <Typography variant="body1">Tu carrito está vacío.</Typography>
          ) : (
            carrito.map((producto, index) => (
              <Box
                key={index}
                sx={{ mb: 2, p: 1, border: '1px solid #ddd', borderRadius: 2 }}
              >
                <Typography variant="subtitle1">{producto.nombre}</Typography>
                <Typography variant="body2">Precio: ${producto.precio}</Typography>
                <Button
                  size="small"
                  color="error"
                  onClick={() => eliminarProducto(index)}
                >
                  Eliminar
                </Button>
              </Box>
            ))
          )}

          {carrito.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => alert('Compra confirmada')}
            >
              Confirmar compra
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default CarritoFlotante;




