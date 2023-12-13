import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "..";
import Student from "../../models/student";


export type StudentState = Student;

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



const studentslice = createSlice(
    {
        name: 'student',
        initialState,
        reducers:{
            loadStudent: (state, action: PayloadAction<StudentState>)=>{
                return action.payload
            }
        }
    }
);

export const {loadStudent} = studentslice.actions;
export const searchstudent = ()=>{
    return (state: AppState)=> state.student;
}
export default studentslice;