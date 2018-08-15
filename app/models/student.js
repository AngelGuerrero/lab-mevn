import mongoose from 'mongoose';

// Schema
const StudentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    course: String
});

// Model
const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = { StudentSchema, StudentModel };