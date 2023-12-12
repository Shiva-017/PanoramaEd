import * as collegeService from "../services/college-services.js";
import { setResponse, setErrorResponse } from './response-handler.js';

export const find = async (req, res) => {
    try {
        const params = { ...req.params, ...req.query };
        const colleges = await collegeService.searchColleges(params);
        setResponse(colleges, res);
    } catch (err) {
        setErrorResponse(err, res)
    }
};

export const findByIds = async (req, res) => {
    try {
        const ids = req.query.ids.split(',')  // send ids as comma seperated strings
        const colleges = await collegeService.findByCollegeIds(ids);
        setResponse(colleges, res);
    } catch (err) {
        setErrorResponse(err, res)
    }
};


export const post = async (req, res) => {
    try {
        const newCollege = req.body;
        const colleges = await collegeService.addColleges(newCollege);
        setResponse(colleges, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
};

export const updateEvents = async (req, res) => {
    try {
        const collegeId = req.params.id;
        const upcomingEvents = req.body;
        const college = await collegeService.updateCollegeEvents(upcomingEvents, collegeId);
        setResponse(college, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
}

export const addPrograms = async (req, res) => {
    try {
        const collegeId = req.params.id;
        const programs = req.body;
        const college = await collegeService.addCollegePrograms(programs, collegeId);
        setResponse(college, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
}

export const deletePrograms = async (req, res) => {
    try {
        const collegeId = req.params.id;
        const programs = req.body;
        const college = await collegeService.RemoveCollegePrograms(programs, collegeId);
        setResponse(college, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
}

export const removeEvent = async (req, res) => {
    try {
        const collegeId = req.params.id;
        const title = req.params.title;
        const college = await collegeService.deleteCollegeEvents(title, collegeId);
        setResponse(college, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
}

export const remove = async (req, res) => {
    try {
        const collegeId = req.params.id;
        const college = await collegeService.removeCollege(collegeId);
        setResponse(college, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
}

export const findById = async (req, res) => {
    try {
        const collegeId = req.params.id;
        const college = await collegeService.findByCollegeId(collegeId);
        setResponse(college, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
}

export const findByName = async (req, res) => {
    try {
        const collegeName = req.params.name;
        const college = await collegeService.findByCollegeName(collegeName);
        setResponse(college, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
}

export const shortlistCollege = async (req, res) => {
    try{
        const studentId = req.query.studentId;
        const collegeId = req.query.collegeId;
        const college = await collegeService.shortlistCollege(studentId, collegeId);
        setResponse(college, res);
    }catch(e){
        setErrorResponse(e, res);
    }
}

export const removeShortlistCollege = async (req, res) => {
    try{
        const studentId = req.query.studentId;
        const collegeId = req.query.collegeId;
        const college = await collegeService.removeShortlistCollege(studentId, collegeId);
        setResponse(college, res);
    }catch(e){
        setErrorResponse(e, res);
    }
}