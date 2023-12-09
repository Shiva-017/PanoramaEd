import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ProgramSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ranking: {
        type: String,
        required: false
    },
    university:{
        type: String,
        required: true
    },
    universityAddress:{
        type: String,
        required: true
    },
    universityLogo:{
        type: String,
        required: false
    },
    requirements:{
        greScore:{
            type: String,
            required: false
        },
        toeflScore:{
            type: String,
            required: false
        },
        ieltsScore:{
            type: String,
            required: false
        },
        cgpa:{
            type: String,
            required: false
        },
        sopRating:{
            type: Number,
            required: false
        },
        lorRequired:{
            type: Number,
            required: false
        }
    },
    fee:{
        type: String,
        required: true
    },
    costOfStudy:{
        type: String,
        required: true,
        enum: ['Premium', 'Moderate', 'Reasonable']
    }
})

const ProgramModel = mongoose.model('program', ProgramSchema);
export default ProgramModel;