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

export const post = async (req, res) => {
    try {
        const newCollege = req.body;
        const colleges = await collegeService.addColleges(newCollege);
        setResponse(colleges, res);
    } catch (e) {
        setErrorResponse(e, res);
    }
};

export const update = async (req, res) => {
    try {
        const collegeId = req.params.id;
        const upcomingEvents = { ...req.body };
        const college = await collegeService.updateCollegeEvents(upcomingEvents, collegeId);
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

