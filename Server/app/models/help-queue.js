import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const HelpQueueSchema = new Schema({
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['waiting', 'accepted', 'completed'],
        default: 'waiting'
    },
    mentorId: {
        type: String,
        default: null
    },
    mentorName: {
        type: String,
        default: null
    },
    chatRoomId: {
        type: String,
        default: null
    },
    requestedAt: {
        type: Date,
        default: Date.now
    },
    acceptedAt: {
        type: Date,
        default: null
    }
}, {
    versionKey: false
});

const HelpQueueModel = mongoose.model('helpqueue', HelpQueueSchema);

export default HelpQueueModel;