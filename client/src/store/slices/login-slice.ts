import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../../models/user";
import { AppState } from '../index';

export type UserState = User[];
const initialState: UserState = [];
export const loginSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        loadUsers: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        }
    }
});

export const retrieveUsers = ()=>{
    return (state: AppState) => state.users;
}

export const {loadUsers} = loginSlice.actions;
export default loginSlice;

