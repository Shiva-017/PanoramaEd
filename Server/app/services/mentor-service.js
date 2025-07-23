import User from '../models/user.js';
import Mentor from '../models/mentor.js';

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
        password: password, 
        userType: "CONSULTANT" 
    }).exec();
    
    if (!user) {
        return null;
    }
    
    // Then find corresponding mentor profile
    const mentor = await Mentor.findOne({ userId: user._id }).populate('userId').exec();
    return mentor;
}

// function to save a new mentor
export const save = async (newMentorData) => {
    // Create user first
    const user = new User({
        name: newMentorData.name,
        email: newMentorData.email,
        password: newMentorData.password,
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