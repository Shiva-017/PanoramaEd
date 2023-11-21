import Chat from '../models/chat.js';

// function to fetch the user chat
export const fetch = async (params = {})=> {
    const chat = await Chat.find({}).exec();
    return chat;
}

// function to save a user chat
export const save = async (newChat) => {
    const chat = new Chat(newChat);
    return await chat.save();
}