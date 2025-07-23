import * as loginService from '../services/login-service.js';
import {setResponse, setErrorResponse} from './response-handler.js'
import jwt from 'jsonwebtoken';

//controller for fetching user (login)
export const fetch = async (request, response) => {
    try {
        const params = { ...request.body };
        const user = await loginService.fetch(params);
        if (!user || user.length === 0) {
            return setErrorResponse({ message: 'Invalid credentials' }, response);
        }
        // Issue JWT token (only include userType if present)
        const payload = { id: user[0]._id, email: user[0].email };
        if (user[0].userType) payload.userType = user[0].userType;
        const token = jwt.sign(payload, 'panoramaed_secret', { expiresIn: '2h' });
        setResponse({ user: user[0], token }, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

//controller for saving user (signup)
export const post = async (request, response) =>{
    try {
        const newUser = { ...request.body };
        // Set userType if not provided (default to STUDENT)
        if (!newUser.userType) {
            newUser.userType = 'STUDENT';
        }
        const user = await loginService.save(newUser);
        // Issue JWT token after signup
        const payload = { id: user._id, email: user.email };
        if (user.userType) payload.userType = user.userType;
        const token = jwt.sign(payload, 'panoramaed_secret', { expiresIn: '2h' });
        setResponse({ user, token }, response);
    } catch(err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return response.status(409).json({
                code: "DuplicateEmail",
                message: "An account with this email already exists."
            });
        }
        setErrorResponse(err, response);
    }
}