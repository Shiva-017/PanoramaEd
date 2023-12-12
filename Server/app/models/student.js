import mongoose from "mongoose";
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: false
    },
    intake: {
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
              },
        ],
        required: false,
    }
})

const StudentModel = mongoose.model('student', StudentSchema);
export default StudentModel;