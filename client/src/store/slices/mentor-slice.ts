import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Mentor from "../../models/mentor";
import { AppState } from '../index';

export type MentorState = Mentor[];
const initialState: MentorState = [];

export const mentorSlice = createSlice({
    name: 'mentors',
    initialState: initialState,
    reducers: {
        loadMentors: (state, action: PayloadAction<MentorState>) => {
            return action.payload;
        },
        updateMentorStatus: (state, action: PayloadAction<{id: string, status: string}>) => {
            const mentor = state.find(m => m._id === action.payload.id);
            if (mentor) {
                mentor.status = action.payload.status as 'online' | 'busy' | 'offline';
            }
        },
        clearMentors: () => {
            return [];
        }
    }
});

export const retrieveMentors = () => {
    return (state: AppState) => state.mentors;
}

export const { loadMentors, updateMentorStatus, clearMentors } = mentorSlice.actions;
export default mentorSlice;
