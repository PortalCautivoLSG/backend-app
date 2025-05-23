const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Rutas
const indexRoutes = require('./src/routes/index.route.js');
app.use('/api', indexRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Algo salió mal' });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
