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

