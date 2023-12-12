import * as loginService from '../services/login-service.js';
import {setResponse, setErrorResponse} from './response-handler.js'

//controller for fetching user
export const fetch = async (request,response) =>{
    try {
        const params = {...request.query};
        const user = await loginService.fetch(params);
        setResponse(user,response);
    } catch(err) {
        setErrorResponse(err, response);
    }
}

//controller for saving user
export const post = async (request, response) =>{
    try {
        const newUser = {...request.body};
        const user = await loginService.save(newUser);
        setResponse(user, response);
    } catch(err) {
        setErrorResponse(err, response);
    }
}