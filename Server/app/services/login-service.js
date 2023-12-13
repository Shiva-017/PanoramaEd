import User from '../models/user.js';
import Student from '../models/student.js';

// function to fetch the user
export const fetch = async (params = {})=> {
    const user = await User.find(params).exec();
    return user;
}

// function to save a new user
export const save = async (newUser) => {
    const user = new User(newUser);
    const student = new Student(newUser);
    
    await student.save();
    return await user.save();
}