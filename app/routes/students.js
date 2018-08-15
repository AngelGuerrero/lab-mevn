import students from '../data/students.json';
import mongoose from 'mongoose';
import express from 'express';
import _ from 'lodash';
import { StudentSchema, StudentModel } from '../models/student';

var router = express.Router();

// Variables
let studentsArray = students;


// api/v1/students.json
router.get('/', (req, res) => res.json(studentsArray));

// api/v1/students/:id
router.get('/:id', (req, res) => {
    const student = _.find(studentsArray, student => student.id === req.params.id);
    (student) ? res.json(student) : res.send(`No existe el estudiante con el id ${req.params.id}`);
});

// api/v1/students/new
router.post('/new', (req, res) => {
    const id = new mongoose.Types.ObjectId();

    const studentToPersist = Object.assign({
        _id: id,
    }, req.body);

    const student = new StudentModel(studentToPersist);
    student.save().then((err, student) =>{
        if(err) res.status(500).send(err);

        res.json(student);
    });

});

// api/v1/students/:id
router.patch('/:id', () => {

});

export default router;