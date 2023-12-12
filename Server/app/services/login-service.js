import User from '../models/user.js';

// function to fetch the user
export const fetch = async (params = {})=> {
    const user = await User.find(params).exec();
    return user;
}

// function to save a new user
export const save = async (newUser) => {
    const user = new User(newUser);
    return await user.save();
}