import StudentModel from "../models/student.js";

export const searchStudents = async (params = {}) => {
    const students = await StudentModel.find(params).exec();
    return students;
}

export const removeStudent = async (id) => {
    const student = await StudentModel.findByIdAndDelete(id);
    student.programs.forEach(async (program) => {
        await ProgramModel.findByIdAndDelete(program.id);
    })
    return;
}

export const findByStudentId = async (id) => {
    const student = await StudentModel.findById(id).exec();
    return student;
}

export const addStudents = async (studentList) => {
    const studentDataList = [];

    for (const studentData of studentList) {
        const programDataList = studentData.programs || [];

        const student = new StudentModel(studentData);

        const programs = await Promise.all(
            programDataList.map(async (programData) => {
                const program = new ProgramModel(programData);
                const savedProgram = await program.save();
                return { id: savedProgram._id, ...programData };
            })
        );

        student.programs = programs;
        studentDataList.push(student);
    }

    const result = await StudentModel.insertMany(studentDataList);
    return result;
};