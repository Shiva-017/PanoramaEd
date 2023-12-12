import { configureStore } from "@reduxjs/toolkit";

import collegeSlice from "./slices/college-slice";
import postSlice from "./slices/StudentPost-slice";
import programSuggestSlice from "./slices/college-suggest";


export const store = configureStore({
    reducer:{
        [collegeSlice.name]: collegeSlice.reducer,
        [postSlice.name]: postSlice.reducer,
        [programSuggestSlice.name]: programSuggestSlice.reducer,

    }
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;

export default store;