import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Program } from "../../models/college";
import { AppState } from "..";



export type SuggestedProgramsState = Program[];

const initialState : SuggestedProgramsState = [];


const programSuggestSlice = createSlice(
    {
        name: 'suggestedPrograms',
        initialState,
        reducers:{
            loadSuggestedPrograms: (state, action: PayloadAction<SuggestedProgramsState>)=>{
                return action.payload;
            }
        }
    }
);

export const {loadSuggestedPrograms} = programSuggestSlice.actions;
export const getSuggestedPrograms = ()=>{
    return (state: AppState)=> state.suggestedPrograms;
}
export default programSuggestSlice;