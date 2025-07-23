import * as studentService from "../services/student-services.js";
import { setResponse, setErrorResponse } from './response-handler.js';

// Controller function to find students based on parameters
export const find = async (req, res) => {
    try {
        const params = { ...req.params, ...req.query };
                // Searching for students using the service function
        const students = await studentService.searchStudents(params);
        setResponse(students, res);
    } catch (err) {
        setErrorResponse(err, res)
    }
};

// Controller function to add a new student
export const post = async (req, res) => {
    try {
        const newStudent = req.body;
        const students = await studentService.save(newStudent);
        setResponse(students, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
};

// Controller function to remove a student by ID

export const remove = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await studentService.removeStudent(studentId);
        setResponse(student, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
}
// Controller function to find a student by email

export const findByEmail = async (req, res) => {
    try {
        const studentEmail = req.params.id;
        const students = await studentService.findByStudentEmail(studentEmail);
        console.debug('findByEmail:', studentEmail, students);
        if (students.length === 1) {
            setResponse(students[0], res);
        } else {
            setResponse(students, res);
        }
    } catch (e) {
        setErrorResponse(e, res);
    }
}
// Controller function to update a student by ID

export const update = async (request, response) => {

    try{

        const id = request.params.id;
        const updateFields = request.body;
        console.log('PATCH updateFields:', updateFields);
        const before = await studentService.update(id, {}); // fetch current doc
        console.log('PATCH student before update:', before);
        const student = await studentService.update(id, updateFields);
        console.log('PATCH student after update:', student);
        setResponse(student,response);

    } catch (err){
        setErrorResponse(err, response);


    }

}
