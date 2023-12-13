import { configureStore } from "@reduxjs/toolkit";

import collegeSlice from "./slices/college-slice";
import postSlice from "./slices/StudentPost-slice";
import programSuggestSlice from "./slices/college-suggest";
import studentslice from "./slices/studentdetails-slice";
import loginSlice from "./slices/login-slice";


export const store = configureStore({
    reducer:{
        [collegeSlice.name]: collegeSlice.reducer,
        [postSlice.name]: postSlice.reducer,
        [programSuggestSlice.name]: programSuggestSlice.reducer,
        [loginSlice.name]: loginSlice.reducer,
        [studentslice.name]: studentslice.reducer

    }
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;

export default store;
