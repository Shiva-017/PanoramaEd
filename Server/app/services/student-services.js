import StudentModel from "../models/student.js";

export const searchStudents = async (params = {}) => {
    const students = await StudentModel.find(params)
    .populate()
    .exec();
    return students;
}

export const removeStudent = async (id) => {
    const student = await StudentModel.findByIdAndDelete(id);
    
    return;
}

export const findByStudentEmail = async (studentEmail) => {
    const student = await StudentModel.find({email: studentEmail}).exec();
    return student;
}

export const save = async (newStudent) => {

    const student = new StudentModel(newStudent);
    return await student.save();
};

