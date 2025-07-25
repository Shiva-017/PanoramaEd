import HelpQueue from '../models/help-queue.js';

// Get all waiting students
export const getWaitingStudents = async () => {
    return await HelpQueue.find({ status: 'waiting' })
        .sort({ requestedAt: 1 })
        .exec();
};

// Add student to queue
export const addToQueue = async (studentData) => {
    const helpRequest = new HelpQueue(studentData);
    return await helpRequest.save();
};

// Accept help request
export const acceptHelpRequest = async (requestId, mentorData) => {
    const chatRoomId = `help_${requestId}_${Date.now()}`;
    
    const updatedRequest = await HelpQueue.findByIdAndUpdate(
        requestId,
        {
            status: 'accepted',
            mentorId: mentorData.mentorId,
            mentorName: mentorData.mentorName,
            chatRoomId: chatRoomId,
            acceptedAt: new Date()
        },
        { new: true }
    ).exec();
    
    return updatedRequest;
};

// Get student's current help request
export const getStudentRequest = async (studentId) => {
    try {
        console.log('Searching for student request with ID:', studentId);
        const result = await HelpQueue.findOne({ 
            studentId: studentId, 
            status: { $in: ['waiting', 'accepted'] }
        }).exec();
        console.log('Found result:', result);
        return result;
    } catch (error) {
        console.error('Error in getStudentRequest:', error);
        throw error;
    }
};

// Complete help request
export const completeHelpRequest = async (requestId) => {
    return await HelpQueue.findByIdAndUpdate(
        requestId,
        { status: 'completed' },
        { new: true }
    ).exec();
};

// Clear old requests for a student (mark as completed)
export const clearOldRequests = async (studentId) => {
    return await HelpQueue.updateMany(
        { 
            studentId: studentId, 
            status: { $in: ['waiting', 'accepted'] } 
        },
        { status: 'completed' }
    ).exec();
};
