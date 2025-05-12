import StudentModel from "../models/student.js";


// Search students matching provided params

export const searchStudents = async (params = {}) => {
        // Using Mongoose to find students with optional parameters and populating related data
    const students = await StudentModel.find(params)
    .populate()
    .exec();
    return students;
}
// Remove a student document by ID
export const removeStudent = async (id) => {
    const student = await StudentModel.findByIdAndDelete(id);
    
    return;
}

// Find students by email address
export const findByStudentEmail = async (studentEmail) => {
    const student = await StudentModel.find({email: studentEmail}).exec();
    return student;
}
// Persist a new student document
export const save = async (newStudent) => {

    const student = new StudentModel(newStudent);
    return await student.save();
};

// Apply partial update to a student document

export const update = async (id,updateFields) => {

    const student = await StudentModel.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
    ).exec();
    return student;
    
    }