import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:{
        feedData:[],
    },
    reducers:{
        setFeedData:(state,action)=>{
            state.feedData=action.payload;
        },
        removeFeed:(state,action)=>{
            state.feedData=state.feedData.filter((feed)=>feed._id!==action.payload);
        }
    }
});

export const {setFeedData,removeFeed}=feedSlice.actions;
export const feedreducer=feedSlice.reducer;