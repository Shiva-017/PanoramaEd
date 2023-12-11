import { configureStore } from "@reduxjs/toolkit";

import collegeSlice from "./slices/college-slice";

export const store = configureStore({
    reducer:{
        [collegeSlice.name]: collegeSlice.reducer
    }
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;

export default store;