import User from '../models/user.js';
import Mentor from '../models/mentor.js';
import bcrypt from 'bcrypt';

// function to fetch mentors
export const fetch = async (params = {}) => {
    const mentors = await Mentor.find(params).populate('userId').exec();
    return mentors;
}

// function to fetch mentor by user credentials (for login)
export const fetchByCredentials = async (email, password) => {
    // First find user with CONSULTANT type
    const user = await User.findOne({ 
        email: email, 
        userType: "CONSULTANT" 
    }).exec();
    if (!user) {
        return null;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    // Then find corresponding mentor profile
    const mentor = await Mentor.findOne({ userId: user._id }).populate('userId').exec();
    return mentor;
}

// function to save a new mentor
export const save = async (newMentorData) => {
    // Create user first
    let hashedPassword = newMentorData.password;
    if (hashedPassword) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(hashedPassword, saltRounds);
    }
    const user = new User({
        name: newMentorData.name,
        email: newMentorData.email,
        password: hashedPassword,
        userType: "CONSULTANT"
    });
    const savedUser = await user.save();
    // Create mentor profile
    const mentor = new Mentor({
        userId: savedUser._id,
        name: newMentorData.name,
        email: newMentorData.email,
        specializations: newMentorData.specializations || ["general"],
        bio: newMentorData.bio || "",
        experience: newMentorData.experience || "",
        languages: newMentorData.languages || ["English"]
    });
    return await mentor.save();
}

// function to update mentor status
export const updateStatus = async (mentorId, status) => {
    return await Mentor.findByIdAndUpdate(
        mentorId, 
        { status: status }, 
        { new: true }
    ).exec();
}

// function to get available mentors
export const getAvailableMentors = async (specialization = null) => {
    let query = { 
        status: 'online',
        $expr: { $lt: [{ $size: "$currentStudents" }, "$maxConcurrentChats"] }
    };
    
    if (specialization) {
        query.specializations = { $in: [specialization] };
    }
    
    return await Mentor.find(query).populate('userId').exec();
}