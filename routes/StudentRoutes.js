import students from '../data/students.json';
import mongoose from 'mongoose';
import express from 'express';
import _ from 'lodash';

const ROUTER = express.Router();

const DB_USER = 'angelguerrero';
const DB_USER_PASSWD = 'Master10';
const DB_URL = `mongodb://${DB_USER}:${DB_USER_PASSWD}@ds119692.mlab.com:19692/angelguerreroprojects`;

// Variables
let studentsArray = students;

// Database connection
mongoose.connect(DB_URL);
const DB = mongoose.connection;
DB.once('open', () => console.log('Successfully database connection.'));

// Schema
const StudentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    course: String
});

// Model
const StudentModel = mongoose.model('Student', StudentSchema);


// API's

// api/v1/students.json
ROUTER.get('/students', (req, res) => res.json(studentsArray));

// api/v1/student/:id
ROUTER.get('/student/:id', (req, res) => {
    const student = _.find(studentsArray, student => student.id === req.params.id);
    (student) ? res.json(student) : res.send(`No existe el estudiante con el id ${req.params.id}`);
});

// api/v1/students/new
ROUTER.post('/students/new', (req, res) => {
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

// api/v1/student/:id
ROUTER.patch('/student/:id', () => {

});

export default ROUTER;