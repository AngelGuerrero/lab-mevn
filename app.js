import express from 'express';

const PORT = 3000;

const server = express();

// Configuración de las rutas
server.get('/', (req, res) => {
    res.send("Hola mundo desde Express");
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));