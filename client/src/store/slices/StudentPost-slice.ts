import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Post from "../../models/post";
import { AppState } from '../index';

export type PostState = Post[];
const initialState: PostState = [];
export const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        loadPosts: (state, action: PayloadAction<PostState>) => {
            return action.payload;
        }
    }
});

export const retrievePosts = ()=>{
    return (state: AppState)=> state.posts;
}

export const {loadPosts} = postSlice.actions;
export default postSlice;

