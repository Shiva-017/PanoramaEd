import User from '../models/user.js';
import Student from '../models/student.js';
import bcrypt from 'bcrypt';

// function to fetch the user
export const fetch = async (params = {})=> {
    // If password is present in params, hash it for comparison
    if (params.password) {
        // Remove password from params for now, we'll check it after fetching user
        const password = params.password;
        delete params.password;
        const user = await User.findOne(params).exec();
        if (!user) return null;
        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;
        return [user];
    } else {
        const user = await User.find(params).exec();
        return user;
    }
}

// function to save a new user
export const save = async (newUser) => {
    // Hash the password before saving
    if (newUser.password) {
        const saltRounds = 10;
        newUser.password = await bcrypt.hash(newUser.password, saltRounds);
    }
    // Ensure name is present in Student document
    const studentData = { ...newUser };
    if (!studentData.name && newUser.name) {
        studentData.name = newUser.name;
    }
    const user = new User(newUser);
    const student = new Student(studentData);
    await student.save();
    return await user.save();
}