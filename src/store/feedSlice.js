import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:{
        feedData:[],
    },
    reducers:{
        setFeedData:(state,action)=>{
            state.feedData=action.payload;
        }
    }
});

export const {setFeedData}=feedSlice.actions;
export const feedreducer=feedSlice.reducer;