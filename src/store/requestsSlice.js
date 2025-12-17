import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:"requests",
    initialState:{
        requests:[]
    },
    reducers:{
        setRequests:(state,action)=>{
          state.requests=action.payload;
        },
            removeReq: (state, action) => {
           state.requests = state.requests.filter((req) => req._id !== action.payload);
         }
        }
    }
);

export const {setRequests,removeReq}=requestSlice.actions;
export const requestReducer=requestSlice.reducer;