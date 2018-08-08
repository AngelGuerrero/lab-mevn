import students from './data/students.json';
import careers from './data/careers.json';
import express from 'express';
import _ from 'lodash';

const server = express();
const PORT = 3000;

// RUTAS

// Función para construir una ruta
const buildUrl = (version, path) => `/api/${version}/${path}`;

// Root path
server.get('/', (req, res) => res.send('Hola mundo desde Express'));

// API's

// api/v1/students.json
server.get(buildUrl('v1', 'students'), (req, res) => res.json(students));

// api/v1/student/:id
server.get(buildUrl('v1', 'student/:id'), (req, res) => {
    const student = _.find(students, student => student.id === req.params.id);

    if (student) {
        res.json(student);
    } else {
        res.send(`No existe el estudiante con el id: ${req.params.id}`);
    }
    res.end();
});

// api/v1/careers.json
server.get(buildUrl('v1', 'careers'), (req, res) => res.json(careers));

// Inicia el servidor
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));