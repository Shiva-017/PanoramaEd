import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import College, { FinanceType } from "../../models/college";

import { AppState } from "..";


export type CollegeState = College;

const initialState : College = {
    _id: '',
    name: '',
    logo: '',
    background: '',
    admissionLink: '',
    address: '',
    ranking: '',
    state: '',
    yearEstd: '',
    country: '',
    content: '',
    programs: [],
    upcomingEvents: [],
    shortlistedStudents: [],
    costOfStudy: FinanceType.Moderate,
};



const collegeSlice = createSlice(
    {
        name: 'college',
        initialState,
        reducers:{
            loadCollege: (state, action: PayloadAction<CollegeState>)=>{
                return action.payload
            }
        }
    }
);

export const {loadCollege} = collegeSlice.actions;
export const searchCollege = ()=>{
    return (state: AppState)=> state.college;
}
export default collegeSlice;