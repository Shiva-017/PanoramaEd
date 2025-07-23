import * as mentorService from '../services/mentor-service.js';
import {setResponse, setErrorResponse} from './response-handler.js';
import jwt from 'jsonwebtoken';

// controller for mentor login
export const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        
        if (!email || !password) {
            return setErrorResponse({ message: "Email and password are required" }, response);
        }
        
        const mentor = await mentorService.fetchByCredentials(email, password);
        
        if (!mentor) {
            return setErrorResponse({ message: "Invalid credentials or not a mentor account" }, response);
        }
        
        // Update status to online when logging in
        await mentorService.updateStatus(mentor._id, 'online');
        
        // Issue JWT token
        const token = jwt.sign({ id: mentor._id, email: mentor.email, userType: 'CONSULTANT' }, 'panoramaed_secret', { expiresIn: '2h' });
        setResponse({ mentor, token }, response);
    } catch(err) {
        setErrorResponse(err, response);
    }
}

// controller for fetching mentors
export const fetch = async (request, response) => {
    try {
        const params = {...request.query};
        const mentors = await mentorService.fetch(params);
        setResponse(mentors, response);
    } catch(err) {
        setErrorResponse(err, response);
    }
}

// controller for creating mentor
export const post = async (request, response) => {
    try {
        const newMentor = {...request.body};
        const mentor = await mentorService.save(newMentor);
        // Find the user for this mentor
        const user = await (await import('../models/user.js')).default.findOne({ email: mentor.email });
        // Issue JWT token
        const payload = { id: user._id, email: user.email, userType: user.userType };
        const token = jwt.sign(payload, 'panoramaed_secret', { expiresIn: '2h' });
        response.status(200).json({ mentor, token });
    } catch(err) {
        setErrorResponse(err, response);
    }
}

// controller for updating mentor status
export const updateStatus = async (request, response) => {
    try {
        const { id } = request.params;
        const { status } = request.body;
        
        const mentor = await mentorService.updateStatus(id, status);
        setResponse(mentor, response);
    } catch(err) {
        setErrorResponse(err, response);
    }
}

// controller for getting available mentors
export const getAvailable = async (request, response) => {
    try {
        const { specialization } = request.query;
        const mentors = await mentorService.getAvailableMentors(specialization);
        setResponse(mentors, response);
    } catch(err) {
        setErrorResponse(err, response);
    }
}
