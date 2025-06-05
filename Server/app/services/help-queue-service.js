import HelpQueue from '../models/help-queue.js';

// Retrieve all help requests with waiting status
export const getWaitingStudents = async () => {
    return await HelpQueue.find({ status: 'waiting' })
        .sort({ requestedAt: 1 })
        .exec();
};

// Enqueue a new student help request
export const addToQueue = async (studentData) => {
    const helpRequest = new HelpQueue(studentData);
    return await helpRequest.save();
};

// Accept a queued help request and assign mentor
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

// Fetch the active help request for a student
export const getStudentRequest = async (studentId) => {
    try {
        console.log('[queue] searching for studentId:', studentId);
        const result = await HelpQueue.findOne({ 
            studentId: studentId, 
            status: { $in: ['waiting', 'accepted'] }
        }).exec();
        console.log('[queue] result:', result?._id ?? null);
        return result;
    } catch (error) {
        console.error('[queue] getStudentRequest error:', error.message);
        throw error;
    }
};

// Mark a help request as completed
export const completeHelpRequest = async (requestId) => {
    return await HelpQueue.findByIdAndUpdate(
        requestId,
        { status: 'completed' },
        { new: true }
    ).exec();
};

// Expire all pending requests for a student
export const clearOldRequests = async (studentId) => {
    return await HelpQueue.updateMany(
        { 
            studentId: studentId, 
            status: { $in: ['waiting', 'accepted'] } 
        },
        { status: 'completed' }
    ).exec();
};
