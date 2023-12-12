import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CollegeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo:{
        type:String,
        required: false
    },
    background: {
        type: String,
        required: false,
    },
    admissionLink: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    ranking: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: true
    },
    yearEstd: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    costOfStudy: {
        type: String,
        required: false,
    },
    collegeType:{
        type: String,
        required: false
    },
    programs: {
        type: Array,
        required: true,
        items: {
            type: mongoose.Schema.Types.ObjectId, ref: 'ProgramModel'
        }
    },
    upcomingEvents: {
        type: Array,
        required: false,
        items: {
            link: {
                type: String,
                required: false
            },
            videoUrl: {
                type: String,
                required: false
            },
            title: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: false
            },
            duration: {
                type: String,
                required: true
            }
        }
    },
    shortListedStudents: {
        type: Array,
        required: true,
        items: {
            type: mongoose.Schema.Types.ObjectId, ref: 'StudentModel'
        }
    }
})

const CollegeModel = mongoose.model('college', CollegeSchema);
export default CollegeModel;