import express from 'express';
import StudentRoutes from './routes/StudentRoutes';
import CareerRoutes from './routes/CareerRoutes';

const server = express();
const PORT = 3000;

// Función para construir una ruta
const buildUrl = (version, path = '') => `/api/${version}/${path}`;

// RUTAS
server.use(buildUrl('v1'), StudentRoutes);
server.use(buildUrl('v1'), CareerRoutes);

// Root path
server.get('/', (req, res) => res.send('Hola mundo desde Express'));

// Inicia el servidor
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));