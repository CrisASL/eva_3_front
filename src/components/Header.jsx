import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link as MuiLink } from '@mui/material';

const navItems = [
  { text: 'Quiénes somos', href: '#quienes-somos' },
  { text: 'Servicios', href: '#servicios' }, // Agregado aquí
  { text: 'Productos', href: '#productos' },
  { text: 'Contacto', href: '#contacto' },
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box sx={{ width: 250, paddingTop: 2, height: '100%' }} role="presentation">
      <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2, fontWeight: 'bold' }}>
        Menú
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component="a"
            href={item.href}
            onClick={toggleDrawer(false)}
            sx={{ textAlign: 'center' }}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: '#A0522D' }}
        elevation={2}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: 68, sm: 76 }
            }}
          >
            {/* Logo */}
            <MuiLink
              href="/"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                paddingY: { xs: 0.75, sm: 1.25 }
              }}
            >
              <Typography
                variant="h6"
                component="div"
                noWrap
                sx={{
                  fontFamily: "'Bevan', serif",
                  fontSize: { xs: '1.5rem', sm: '1.7rem', md: '1.9rem' },
                  fontWeight: 'bold',
                  color: '#FFFDD0',
                  transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
                  lineHeight: 'normal',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    color: '#FFD700',
                  },
                }}
              >
                TEJE-LANAS.VIVI
              </Typography>
            </MuiLink>

            {/* Navegación Escritorio */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
              {navItems.map((item) => (
                <MuiLink
                  key={item.text}
                  href={item.href}
                  underline="none"
                  color="inherit"
                  sx={{
                    my: 2,
                    display: 'block',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    margin: '0 10px',
                    paddingY: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  {item.text}
                </MuiLink>
              ))}
            </Box>

            {/* Botón menú móvil */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 'auto' }}>
              <IconButton
                size="large"
                color="inherit"
                aria-label="abrir menú"
                edge="end"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon sx={{ fontSize: '1.75rem' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer móvil */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { backgroundColor: "background.paper" }
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;