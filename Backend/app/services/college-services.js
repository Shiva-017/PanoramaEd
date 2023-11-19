import models from "../models"

const {College, Program} = models;

export const searchColleges = async (params = {}) => {
    const colleges = await College.find(params).exec();
    return colleges;
}

// export const addCollege = async (newCollege) => {
//     const college = new College(newCollege);
//     return college.save();
// }

export const removeCollege = async (id) => {
    await College.findByIdAndDelete(id);
    return;
}

export const findByCollegeId = async (id)=>{
    const college = await College.findById(id).exec();
    return college;
}

export const addColleges = async (collegeList) => {
    const collegeDataList = [];
    collegeList.forEach(collegeData => {
        collegeDataList.push(new College(collegeData));
    });
    const result = await College.insertMany(collegeDataList);
    return result;
}

export const updateCollegeEvents = async (upcomingEvents, id) => {
    const college = await College.findByIdAndUpdate(id, { $set: { upcomingEvents } }, { new: true, runValidator: true }).exec();
    return college;
}