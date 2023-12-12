import mongoose from "mongoose";
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    degreeseeking: {
        type: String,
        required: false
    },
    intake: {
        type: String,
        required: false
    },
    undergradgrade: {
        type: String,
        required: false
    },
    undergradcollege: {
        type: String,
        required: false
    },
    undergradcourse: {
        type: String,
        required: false
    },
    gre: {
        type: String,
        required: false
    },
    ielts: {
        type: String,
        required: false
    },
    experiencecompany: {
        type: String,
        required: false
    },
    experiencedesignation: {
        type: String,
        required: false
    },
    experienceduration: {
        type: String,
        required: false
    },
    collegeShorlisted: {
        type: Array,
        required: false,
        items: {
            collegeId: Number
        }
    }
})

const StudentModel = mongoose.model('student', StudentSchema);
export default StudentModel;