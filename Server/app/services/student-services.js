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

export const update = async (id,degreeseeking ) => {

    const student = await StudentModel.findByIdAndUpdate(id,{$set: {degreeseeking: degreeseeking}},
        {$set: {intake: intake}},
        {$set: {undergradgrade: undergradgrade}},
        {$set: {undergradcollege: undergradcollege}},
        {$set: {undergradcourse: undergradcourse}},
        {$set: {gre: gre}},
        {$set: {ielts: ielts}},
        {$set: {experiencecompany: experiencecompany}},
        {$set: {experiencedesignation: experiencedesignation}},
        {$set: {experienceduration: experienceduration}
        
    }).exec();
    return post;
    
    }