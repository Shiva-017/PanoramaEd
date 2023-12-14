import mongoose from "mongoose";

// Creating a Mongoose schema for the Student model
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
        type: [
            {
                collegeID: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'CollegeModel',
                },
                collegeLogo: {
                  type: String,
                },
                collegeName: {
                    type: String,
                  },
              },
        ],
        required: false,
    }
})

// Creating a Mongoose model for the Student schema

const StudentModel = mongoose.model('student', StudentSchema);
export default StudentModel;