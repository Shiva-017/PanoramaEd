import ProgramModel from "../models/program.js";


export const searchPrograms = async (params = {}) => {
    const programs = await ProgramModel.find(params).exec();
    return programs;
}

export const findByProgramId = async (id) => {
    const program = await ProgramModel.findById(id).exec();
    return program;
}
