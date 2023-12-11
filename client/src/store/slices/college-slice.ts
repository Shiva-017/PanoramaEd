import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import College from "../../models/college";
import { type } from "os";
import { AppState } from "..";


export type CollegeState = College[];

const initialState : CollegeState = [];


const collegeSlice = createSlice(
    {
        name: 'colleges',
        initialState,
        reducers:{
            loadColleges: (state, action: PayloadAction<CollegeState>)=>{
                return action.payload
            }
        }
    }
);

export const {loadColleges} = collegeSlice.actions;
export const searchCollege = (query: string)=>{
    return (state: AppState)=> state.colleges.filter(c=>c.name.startsWith(query));
}
export default collegeSlice;