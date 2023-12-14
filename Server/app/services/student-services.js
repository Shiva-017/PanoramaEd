import StudentModel from "../models/student.js";


// Function to search for students based on provided parameters

export const searchStudents = async (params = {}) => {
        // Using Mongoose to find students with optional parameters and populating related data
    const students = await StudentModel.find(params)
    .populate()
    .exec();
    return students;
}
// Function to remove a student by ID
export const removeStudent = async (id) => {
    const student = await StudentModel.findByIdAndDelete(id);
    
    return;
}

// Function to find a student by email
export const findByStudentEmail = async (studentEmail) => {
    const student = await StudentModel.find({email: studentEmail}).exec();
    return student;
}
// Function to save a new student
export const save = async (newStudent) => {

    const student = new StudentModel(newStudent);
    return await student.save();
};

// Function to update a student by ID with new fields

export const update = async (id,updateFields) => {

    const student = await StudentModel.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
    ).exec();
    return student;
    
    }