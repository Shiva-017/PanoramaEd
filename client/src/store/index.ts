import { configureStore } from "@reduxjs/toolkit";

import collegeSlice from "./slices/college-slice";
import postSlice from "./slices/StudentPost-slice"


export const store = configureStore({
    reducer:{
        [collegeSlice.name]: collegeSlice.reducer,
        [postSlice.name]: postSlice.reducer

    }
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;

export default store;