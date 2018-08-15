import mongoose from 'mongoose';

// Schema
const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    course: String
});

// Model
const studentModel = mongoose.model('Student', studentSchema);

module.exports = { studentSchema, studentModel };