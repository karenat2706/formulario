import { useState } from 'react';
import './App.css';
import { Container, Paper, Typography, TextField, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem, Rating, 
  Checkbox, Button, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormLabel } from '@mui/material';

function App() {
  const [datos, setDatos] = useState({ 
    nombre: '', 
    apellidos: '', 
    edad: '', 
    genero: '', 
    lenguajeFavorito: '', 
    puntuacion: 0, 
    terminosAceptados: false
  });

  const [dialogoAbierto, setDialogoAbierto] = useState(false);

  const manejarCambio = (evento) => {
    const name = evento.target.name;
    const type = evento.target.type;
    let value;

    if (type === 'checkbox') {
      value = evento.target.checked;
    } else {
      value = evento.target.value;
    }

    setDatos(prevDatos => {
      return {
        ...prevDatos,
        [name]: value
      };
    });
  };


  const manejarCambioRating = (event, nuevoValor) => {
    setDatos(prevDatos => ({
      ...prevDatos, 
      puntuacion: nuevoValor
    }));
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    setDialogoAbierto(true);
  };

  const manejarLimpiar = () => {
    setDatos({
      nombre: '',
      apellidos: '',
      edad: '',
      genero: '',
      lenguajeFavorito: '',
      puntuacion: 0,
      terminosAceptados: false
    });
  };

  const manejarCerrarDialogo = (confirmado) => {
    setDialogoAbierto(false);
    if (confirmado) {
      console.log('Datos enviados:', datos);
      manejarLimpiar();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Encuesta de programación
        </Typography>

        <form onSubmit={manejarEnvio}>
          <Grid container spacing={3}>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Nombre"
                name="nombre"
                value={datos.nombre}
                onChange={manejarCambio}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Apellidos"
                name="apellidos"
                value={datos.apellidos}
                onChange={manejarCambio}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="number"
                label="Edad"
                name="edad"
                value={datos.edad}
                onChange={manejarCambio}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" required fullWidth>
                <FormLabel component="legend">Género</FormLabel>
                <RadioGroup
                  name="genero"
                  value={datos.genero}
                  onChange={manejarCambio}
                >
                  <FormControlLabel value="femenino" control={<Radio />} label="Femenino" />
                  <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                  <FormControlLabel value="otro" control={<Radio />} label="Otro" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography component="legend" gutterBottom>
                Puntúa esta encuesta
              </Typography>
              <Rating
                name="puntuacion"
                value={datos.puntuacion}
                onChange={manejarCambioRating}
                size="large"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="label-lenguaje">Lenguaje de programación favorito</InputLabel>
                <Select
                  labelId="label-lenguaje"
                  name="lenguajeFavorito"
                  value={datos.lenguajeFavorito}
                  onChange={manejarCambio}
                  label="Lenguaje de programación favorito"
                  fullWidth
                  sx={{ minWidth: 300 }}
                >
                  <MenuItem value="javascript">JavaScript</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                </Select>
              </FormControl>

            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="terminosAceptados"
                    checked={datos.terminosAceptados}
                    onChange={manejarCambio}
                  />
                }
                label="He leído los términos y condiciones"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={!datos.terminosAceptados}
                sx={{ py: 1.5, mb: 1 }}
              >
                Enviar
              </Button>

              <Button
                type="button"
                variant="outlined"
                fullWidth
                size="large"
                onClick={manejarLimpiar}
                sx={{ py: 1.5 }}
              >
                Limpiar
              </Button>
            </Grid>

          </Grid>
        </form>

        <Dialog
          open={dialogoAbierto}
          onClose={() => manejarCerrarDialogo(false)}
        >
          <DialogTitle>Confirmar envío</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que quieres enviar el formulario? Esta acción no se puede deshacer
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => manejarCerrarDialogo(false)} color="primary">
              No
            </Button>
            <Button onClick={() => manejarCerrarDialogo(true)} color="primary" autoFocus>
              Si
            </Button>
          </DialogActions>
        </Dialog>

      </Paper>
    </Container>
  );
}

export default App;