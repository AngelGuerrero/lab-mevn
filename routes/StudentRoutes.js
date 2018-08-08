import students from '../data/students.json';
import express from 'express';
import _ from 'lodash';

const router = express.Router();

// API's

// api/v1/students.json
router.get('/students', (req, res) => res.json(students));

// api/v1/student/:id
router.get('/student/:id', (req, res) => {
    const student = _.find(students, student => student.id === req.params.id);

    if (student) {
        res.json(student);
    } else {
        res.send(`No existe el estudiante con el id: ${req.params.id}`);
    }
    res.end();
});

module.exports = router;