import Chat from '../models/chat.js';

// fetch chat thread for a given user
export const fetch = async (params = {})=> {
    const userId = params.userId;
    const chat = await Chat.find({"$or": [{"studentId": userId}, {"consultantId": userId}]}).exec();
    return chat;
}

// persist a new chat thread
export const save = async (newChat) => {
    const chat = new Chat(newChat);
    return await chat.save();
}

// append a new message to an existing chat
export const update = async(newMessage, id) => {
    const chat = await Chat.updateOne({_id: id}, {$push: {messages: newMessage}}).exec();
    return chat;
}