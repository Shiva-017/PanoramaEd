import admitClassifier from "../helpers/admitClassifier.js";
import ProgramModel from "../models/program.js";


export const searchPrograms = async (params = {}) => {
    const programs = await ProgramModel.find(params).exec();
    return programs;
}

export const findByProgramId = async (id) => {
    const program = await ProgramModel.findById(id).exec();
    return program;
}

export const suggestProgramsByStudentData = async (studentData) => {
    const programs = await ProgramModel.find({'requirements.lorRequired': { $lte: studentData.lors },}).exec();
    const sortedPrograms = programs.sort((a, b) => admitClassifier(studentData, b.requirements) - admitClassifier(studentData, a.requirements));
    const ambitious = sortedPrograms.filter(
        (program) => admitClassifier(studentData, program.requirements) >= 1
    ).sort((a, b) => admitClassifier(studentData, b.requirements) - admitClassifier(studentData, a.requirements)).slice(0, 3);

    const moderate = sortedPrograms.filter(
        (program) => admitClassifier(studentData, program.requirements) >= 0.75 && admitClassifier(studentData, program.requirements) < 1
    ).sort((a, b) => admitClassifier(studentData, b.requirements) - admitClassifier(studentData, a.requirements)).slice(0, 3);

    const safe = sortedPrograms.filter(
        (program) => admitClassifier(studentData, program.requirements) >= 0.5 && admitClassifier(studentData, program.requirements) < 0.75
    ).sort((a, b) => admitClassifier(studentData, b.requirements) - admitClassifier(studentData, a.requirements)).slice(0, 3);
    const suggestedColleges = [...ambitious, ...moderate, ...safe];
    return suggestedColleges;
}
// check what is the proficiency test given, also include resume rating and years of exp for the metrics. (logic)
// make sure that the colleges are sorted in classification way
// think of some parameter to set the specific route