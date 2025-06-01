import {Box,Typography, Button} from "@mui/material";
const Banner = () => {

    return (
        <Box sx={{
                height: '60vh',
                position: 'relative',
                backgroundImage: 'url(/src/assets/12316.jpg)', // Reemplaza con la ruta correcta de tu imagen
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: '#fff',
            }}>
            <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajusta la opacidad según sea necesario
                    zIndex: 1,
                    }}
                        />
            <Box sx={{
                position: 'relative',
                zIndex: 2,
                padding: 2,
                }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Bienvenido a nuestra tienda de antigüedades
                </Typography>
                <Typography variant="h6" sx={{ mb: 4 }}>
                    Trabajamos para ti y tu comunidad.
                </Typography>
                <Button variant="contained" color="primary" size="large">
                    Conoce más
                </Button>
            </Box>
        </Box>
    )
}
export default Banner;