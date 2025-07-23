// ===== MENTOR MODEL =====
// models/mentor.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MentorSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    specializations: {
        type: [String],
        enum: ["visa", "applications", "housing", "scholarships", "general"],
        default: ["general"]
    },
    status: {
        type: String,
        enum: ['online', 'busy', 'offline'],
        default: 'offline'
    },
    currentStudents: {
        type: [String], 
        default: []
    },
    maxConcurrentChats: {
        type: Number,
        default: 3
    },
    rating: {
        type: Number,
        default: 5.0,
        min: 1,
        max: 5
    },
    totalChats: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        default: ""
    },
    experience: {
        type: String,
        default: ""
    },
    languages: {
        type: [String],
        default: ["English"]
    },
    availability: {
        timezone: String,
        workingHours: {
            start: String,
            end: String    
        }
    }
}, {
    versionKey: false,
    timestamps: true
});

const MentorModel = mongoose.model('mentor', MentorSchema);

export default MentorModel;
