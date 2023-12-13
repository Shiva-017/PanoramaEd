import Chat from '../models/chat.js';

// function to fetch the user chat
export const fetch = async (params = {})=> {
    const userId = params.userId;
    const chat = await Chat.find({"$or": [{"studentId": userId}, {"consultantId": userId}]}).exec();
    return chat;
}

// function to save a user chat
export const save = async (newChat) => {
    const chat = new Chat(newChat);
    return await chat.save();
}

// function to update a chat
export const update = async(newMessage, id) => {
    const chat = await Chat.updateOne({_id: id}, {$push: {messages: newMessage}}).exec();
    return chat;
}