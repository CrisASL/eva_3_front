import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, Paper, TextField, Button, Box, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Componente CAPTCHA matemático
const Captcha = ({ onChange }) => {
  const canvasRef = useRef(null);
  const [question, setQuestion] = useState('');

  const generateMathCaptcha = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const op = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    let result;

    switch (op) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
    }

    setQuestion(`${a} ${op} ${b}`);
    onChange(String(result)); // Enviar resultado correcto
    drawCaptcha(`${a} ${op} ${b}`);
  };

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 150, 50);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 150, 50);
    ctx.font = '24px Arial';
    ctx.fillStyle = '#222';
    ctx.fillText(text, 30, 35);
  };

  useEffect(() => {
    generateMathCaptcha();
  }, []);

  return (
    <Box sx={{ mb: 1, cursor: 'pointer' }} onClick={generateMathCaptcha} title="Haz click para cambiar el CAPTCHA">
      <canvas
        ref={canvasRef}
        width={150}
        height={50}
        style={{ border: '1px solid #ccc', display: 'block', marginBottom: 4 }}
      />
      <Typography variant="caption" display="block" sx={{ textAlign: 'center' }}>
        Haz click para cambiar el CAPTCHA
      </Typography>
    </Box>
  );
};

// Página principal
function PaginaContacto() {
  const captchaRef = useRef('');

  const validationSchema = yup.object().shape({
    nombre: yup.string().required('El nombre es obligatorio'),
    email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
    asunto: yup.string(),
    mensaje: yup.string().required('El mensaje es obligatorio'),
    captchaInput: yup
      .string()
      .required('Por favor resuelve la operación')
      .test('captcha-match', 'La respuesta es incorrecta', function (value) {
        return value?.trim() === captchaRef.current;
      }),
  });

  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      asunto: '',
      mensaje: '',
      captchaInput: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm, setFieldValue }) => {
      alert('Formulario enviado correctamente!');
      resetForm();
      captchaRef.current = '';
      setFieldValue('captchaInput', '');
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 'bold', mb: 3 }}
        >
          Envíanos un Mensaje
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="nombre"
              name="nombre"
              label="Nombre Completo"
              variant="outlined"
              required
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
            />

            <TextField
              fullWidth
              id="email"
              name="email"
              label="Correo Electrónico"
              variant="outlined"
              type="email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              id="asunto"
              name="asunto"
              label="Asunto"
              variant="outlined"
              value={formik.values.asunto}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.asunto && Boolean(formik.errors.asunto)}
              helperText={formik.touched.asunto && formik.errors.asunto}
            />

            <TextField
              fullWidth
              id="mensaje"
              name="mensaje"
              label="Tu Mensaje"
              variant="outlined"
              required
              multiline
              rows={4}
              value={formik.values.mensaje}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mensaje && Boolean(formik.errors.mensaje)}
              helperText={formik.touched.mensaje && formik.errors.mensaje}
            />

            {/* CAPTCHA matemático */}
            <Box>
              <Captcha onChange={(text) => (captchaRef.current = text)} />
              <TextField
                fullWidth
                id="captchaInput"
                name="captchaInput"
                label="Resultado del CAPTCHA"
                variant="outlined"
                required
                value={formik.values.captchaInput}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.captchaInput && Boolean(formik.errors.captchaInput)}
                helperText={formik.touched.captchaInput && formik.errors.captchaInput}
              />
            </Box>

            <Button variant="contained" color="primary" size="large" type="submit" fullWidth>
              Enviar Mensaje
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default PaginaContacto;











