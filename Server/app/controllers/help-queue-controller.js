import * as helpQueueService from '../services/help-queue-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

// Get all waiting students (for mentors)
export const getWaitingStudents = async (request, response) => {
    try {
        const waitingStudents = await helpQueueService.getWaitingStudents();
        setResponse(waitingStudents, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Student requests help
export const requestHelp = async (request, response) => {
    try {
        const helpRequest = await helpQueueService.addToQueue(request.body);
        setResponse(helpRequest, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Mentor accepts help request
export const acceptHelp = async (request, response) => {
    try {
        const { requestId } = request.params;
        const mentorData = request.body;
        
        const acceptedRequest = await helpQueueService.acceptHelpRequest(requestId, mentorData);
        setResponse(acceptedRequest, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Get student's current request status
export const getStudentStatus = async (req, response) => {
    try {
        const { studentId } = req.params;
        console.log('Controller received studentId:', studentId);
        const helpRequest = await helpQueueService.getStudentRequest(studentId);
        console.log('Controller got helpRequest:', helpRequest);
        setResponse(helpRequest, response);
    } catch (err) {
        console.error('Controller error:', err);
        setErrorResponse(err, response);
    }
};

// Complete help request
export const completeHelpRequest = async (req, response) => {
    try {
        const { requestId } = req.params;
        const completedRequest = await helpQueueService.completeHelpRequest(requestId);
        setResponse(completedRequest, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Clear old requests for a student
export const clearOldRequests = async (req, response) => {
    try {
        const { studentId } = req.params;
        const result = await helpQueueService.clearOldRequests(studentId);
        setResponse(result, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};
