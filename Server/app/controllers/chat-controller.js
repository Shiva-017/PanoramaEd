import * as chatService from '../services/chat-service.js';
import {setResponse, setErrorResponse} from './response-handler.js'

//controller for showing chat
export const  show = async (request,response) =>{
    try {
        const params = {...request.query};
        const chat = await chatService.fetch(params);
        setResponse(chat,response);
    } catch(err){
        setErrorResponse(err, response);
    }
}

//controller for saving chat
export const post = async (request, response) =>{
    try {
        const newChat = {...request.body};
        const chat = await chatService.save(newChat);
        setResponse(chat, response);
    } catch(err){
        setErrorResponse(err, response);
    }
}

//controller for updating chat
export const update = async (request, response) => {
    try {
        const id = request.params.id;
        const newMessage = {...request.body};
        const chat = await chatService.update(newMessage, id);
        setResponse(chat, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}