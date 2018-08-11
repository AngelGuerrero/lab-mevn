import students from '../data/students.json';
import express from 'express';
import _ from 'lodash';

const router = express.Router();

// Variables
let studentsArray = students;

// API's

// api/v1/students.json
router.get('/students', (req, res) => res.json(studentsArray));

// api/v1/student/:id
router.get('/student/:id', (req, res) => {
    const student = _.find(studentsArray, student => student.id === req.params.id);

    if (student) {
        res.json(student);
    } else {
        res.send(`No existe el estudiante con el id: ${req.params.id}`);
    }
    res.end();
});

// api/v1/students/new
router.post('/students/new', (req, res) => {
    console.log("Solicitando registro de nuevo estudiante.");
    console.log(req.body);

    const student = _.find(studentsArray, { "id": req.body.id });

    if (student) {
        console.log(`Ya existe un estudiante con el id: ${req.body.id}`);
        res.end();
    } else {
        studentsArray.push(req.body);
        res.status(200).send("OK");
    }
});

export default router;