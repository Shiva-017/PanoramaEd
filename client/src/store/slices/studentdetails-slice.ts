import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "..";
import Student from "../../models/student";

// Defining the state type for the Student slice

export type StudentState = Student;

// Initial state for the Student slice

const initialState : Student = {
    _id: '',
    name: '',
    email: '',
    degreeseeking: '',
    intake: '',
    undergradgrade: '',
    undergradcollege: '',
    undergradcourse: '',
    gre: '',
    ielts: '',
    experiencecompany: '',
    experiencedesignation: '',
    experienceduration: '',
    collegeShorlisted: []
    
};


// Creating a Redux slice for the Student state

const studentslice = createSlice(
    {
        name: 'student',
        initialState,
        reducers:{
                    // Reducer for loading student data into the state
            loadStudent: (state, action: PayloadAction<StudentState>)=>{
                return action.payload
            }
        }
    }
);

// Extracting the action creator and reducer from the created slice

export const {loadStudent} = studentslice.actions;

// Selector function for accessing the student state from the overall app state

export const searchstudent = ()=>{
    return (state: AppState)=> state.student;
}
export default studentslice;