import CollegeModel from "../models/college.js";
import ProgramModel from "../models/program.js";
import StudentModel from "../models/student.js";

export const searchColleges = async (params = {}) => {
    const colleges = await CollegeModel.find(params).exec();
    return colleges;
}

export const removeCollege = async (id) => {
    const college = await CollegeModel.findByIdAndDelete(id);
    college.programs.forEach(async (program) => {
        await ProgramModel.findByIdAndDelete(program.id);
    })
    return;
}

export const findByCollegeId = async (id) => {
    const college = await CollegeModel.findById(id).exec();
    return college;
}

export const findByCollegeName = async (collegeName) => {
    const college = await CollegeModel.findOne({ name: { $regex: new RegExp(collegeName, 'i') } }).exec();
    return college;
}

export const addColleges = async (collegeList) => {
    const collegeDataList = [];

    for (const collegeData of collegeList) {
        const programDataList = collegeData.programs || [];

        const college = new CollegeModel(collegeData);

        const programs = await Promise.all(
            programDataList.map(async (programData) => {
                const program = new ProgramModel(programData);
                const savedProgram = await program.save();
                return { id: savedProgram._id, ...programData };
            })
        );

        college.programs = programs;
        collegeDataList.push(college);
    }

    const result = await CollegeModel.insertMany(collegeDataList);
    return result;
};

export const updateCollegeEvents = async (events, id) => {
    const college = await CollegeModel.findByIdAndUpdate(id, { $push: { upcomingEvents: { $each: events } } }, { new: true, runValidators: true }).exec();
    return college;
}

export const addCollegePrograms = async (programs, id) => {
    const college = await CollegeModel.findByIdAndUpdate(id, { $push: { programs: { $each: programs } } }, { new: true, runValidators: true }).exec();
    return college;
}

export const RemoveCollegePrograms = async (programs, id) => {
    const college = await CollegeModel.findByIdAndUpdate(id, { $pull: { programs: { $each: programs } } }, { new: true, runValidators: true }).exec();
    return college;
}

export const deleteCollegeEvents = async (title, id) => {
    const college = await CollegeModel.findByIdAndUpdate(id, { $pull: { upcomingEvents: { title } } }, { new: true, runValidators: true }).exec();
    return college;
}

export const shortlistCollege = async (studentId, collegeId) => {
    const college = await CollegeModel.findByIdAndUpdate(collegeId, { $addToSet: { shortListedStudents: studentId } }, { new: true, runValidators: true }).exec();
    await StudentModel.findByIdAndUpdate(studentId, {
        $addToSet: {
            collegeShorlisted: {
                collegeID: collegeId,
                collegeLogo: college.logo,
            },
        },
    }, { new: true, runValidators: true }).exec();
    return college;
}

export const removeShortlistCollege = async (studentId, collegeId) => {
    const college = await CollegeModel.findByIdAndUpdate(collegeId, { $pull: { shortListedStudents: studentId } }, { new: true, runValidators: true }).exec();
    await StudentModel.findByIdAndUpdate(studentId, { $pull: { collegeShorlisted: { collegeID: collegeId } } }, { new: true, runValidators: true }).exec();
    return college;
}