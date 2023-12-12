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

export const findByProgramNameAndCollege = async (Pname, Cname) => {
    const program = await ProgramModel.findOne({name:Pname, university: Cname}).exec();
    return program;
}


export const suggestProgramsByStudentData = async (studentData, exp, resumeRating, country, program) => {
    const programs = await ProgramModel.find({'requirements.lorRequired': { $lte: studentData.lorRequired }, country: country, name: program}).exec();
    const sortedPrograms = programs.sort((a, b) => admitClassifier(studentData, b.requirements, exp, resumeRating) - admitClassifier(studentData, a.requirements, exp, resumeRating));

    const ambitious = sortedPrograms.filter(
        (program) => admitClassifier(studentData, program.requirements, exp, resumeRating) >= 1
    ).sort((a, b) => admitClassifier(studentData, b.requirements, exp, resumeRating) - admitClassifier(studentData, a.requirements, exp, resumeRating)).slice(0, 3);

    const moderate = sortedPrograms.filter(
        (program) => admitClassifier(studentData, program.requirements, exp, resumeRating) >= 0.75 && admitClassifier(studentData, program.requirements, exp, resumeRating) < 1
    ).sort((a, b) => admitClassifier(studentData, b.requirements, exp, resumeRating) - admitClassifier(studentData, a.requirements, exp, resumeRating)).slice(0, 3);

    const safe = sortedPrograms.filter(
        (program) => admitClassifier(studentData, program.requirements, exp, resumeRating) >= 0.5 && admitClassifier(studentData, program.requirements, exp, resumeRating) < 0.75
    ).sort((a, b) => admitClassifier(studentData, b.requirements, exp, resumeRating) - admitClassifier(studentData, a.requirements, exp, resumeRating)).slice(0, 3);

    const suggestedColleges = [...ambitious, ...moderate, ...safe];
    return suggestedColleges;
}
// check what is the proficiency test given, also include resume rating and years of exp for the metrics. (logic)
// make sure that the colleges are sorted in classification way
// think of some parameter to set the specific route