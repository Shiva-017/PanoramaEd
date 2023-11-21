import * as studentService from "../services/student-services.js";
import { setResponse, setErrorResponse } from './response-handler.js';

export const find = async (req, res) => {
    try {
        const params = { ...req.params, ...req.query };
        const students = await studentService.searchStudents(params);
        setResponse(students, res);
    } catch (err) {
        setErrorResponse(err, res)
    }
};

export const post = async (req, res) => {
    try {
        const newStudent = req.body;
        const students = await studentService.save(newStudent);
        setResponse(students, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
};


export const remove = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await studentService.removeStudent(studentId);
        setResponse(student, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
}

export const findById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await studentService.findByStudentId(studentId);
        setResponse(student, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
}

