import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({
    name:"connections",
    initialState:{
        connections:[]
    },
    reducers:{
        setConnections:(state,action)=>{
          state.connections=action.payload;
        }
    }
});

export const {setConnections}=connectionSlice.actions;
export const connectionReducer=connectionSlice.reducer;