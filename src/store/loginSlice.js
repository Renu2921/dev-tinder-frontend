import { createSlice } from "@reduxjs/toolkit";

const loginSlice=createSlice({
    name:"login",
    initialState:{
        userData:{},
    },
    reducers:{
        setUserData:(state,action)=>{
        state.userData=action.payload;
        }
    }
});

export const {setUserData}=loginSlice.actions;
export const loginReducer=loginSlice.reducer;