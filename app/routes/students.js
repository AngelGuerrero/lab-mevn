import students from '../data/students.json';
import mongoose from 'mongoose';
import express from 'express';
import _ from 'lodash';
import { studentSchema, studentModel } from '../models/student';

var router = express.Router();

// Variables
let studentsArray = students;


// /
router.get('/', (req, res) => {
    studentModel.find((err, students) => {
        if (err) res.status(500).json(err);

        res.json(students);
    });
});

// /show/:id
router.get('/show/:id', (req, res) => {
    studentModel.findById(
        // id of the item to find
        req.params.id, 
        
        // the callback function
        (err, student) => {
            if (err) res.status(500).json(err);
        
            res.json(student);
        });
});

// /new
router.post('/new', (req, res) => {
    const id = new mongoose.Types.ObjectId();

    const studentToPersist = Object.assign({
        _id: id,
    }, req.body);

    const student = new studentModel(studentToPersist);
    student.save().then((err, student) => {
        if(err) res.status(500).json(err);

        res.status(200).json(student);
    });

});

// /edit/:id
router.put('/edit/:id', (req, res) => {
    studentModel.findByIdAndUpdate(
        // id of the item to find
        req.params.id, 
        
        // the change to be made
        req.body,

        // asks to mongoose to return the updated version
        { new: true},

        // the callback function
        (err, student) => {
        
            if (err) res.status(500).json(err);
            
            res.status(200).json(student);
        });
});

// /delete/:id
router.delete('/delete/:id', (req, res) => {
    studentModel.findByIdAndRemove(
      req.params.id,
      
      // the callback function
      (err, student) => {
          if (err) return res.status(500).json(err);

          const response = {
              message: "Student successfully deleted",
              id: student._id
          };
          return res.status(200).json(response);
      });
});

export default router;