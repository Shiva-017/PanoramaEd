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
export const getStudentStatus = async (request, response) => {
    try {
        const { studentId } = request.params;
        const request = await helpQueueService.getStudentRequest(studentId);
        setResponse(request, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};
