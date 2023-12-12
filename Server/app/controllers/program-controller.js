import * as programService from "../services/program-services.js";
import { setResponse, setErrorResponse } from './response-handler.js';

export const find = async (req, res) => {
    try {
        const params = { ...req.params, ...req.query };
        const programs = await programService.searchPrograms(params);
        setResponse(programs, res);
    } catch (err) {
        setErrorResponse(err, res)
    }
};


export const findById = async (req, res) => {
    try {
        const programId = req.params.id;
        const program = await programService.findByProgramId(programId);
        setResponse(program, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
}

export const findByNameAndCollege = async (req, res) => {
    try {
        const programName = req.query.program;
        const collegeName = req.query.college;
        const program = await programService.findByProgramNameAndCollege(programName, collegeName);
        setResponse(program, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
}


export const findByMetrics = async (req, res) =>{
    try{
        const studentMetrics = req.body.studentData;
        const exp = req.body.exp;
        const resumeRating = req.body.resumeRating;
        const country = req.body.country;
        const program = req.body.program;
        const programs = await programService.suggestProgramsByStudentData(studentMetrics, exp, resumeRating, country, program);
        setResponse(programs,res);
    } catch(e){
        setErrorResponse(e, res);
    }
}