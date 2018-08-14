import StudentRoutes from './routes/StudentRoutes';
import CareerRoutes from './routes/CareerRoutes';
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';


const server = express();
const PORT = 3000;

// Funciones
const buildUrl = (version, path = '') => `/api/${version}/${path}`;

// Middleware
server.use(morgan('tiny'));
server.use(bodyParser.json());

server.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// Rutas
server.use(buildUrl('v1'), StudentRoutes);
server.use(buildUrl('v1'), CareerRoutes);

// Root path
server.get('/', (req, res) => res.send('Hola mundo desde Express'));

// Inicia el servidor
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));