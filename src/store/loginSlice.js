import { createSlice } from "@reduxjs/toolkit";

const loginSlice=createSlice({
    name:"login",
    initialState:{
        userData:null,
    },
    reducers:{
        setUserData:(state,action)=>{
        state.userData=action.payload;
        },
        removeUser:(state,action)=>{
            state.userData=null;
        }

    }
});

export const {setUserData,removeUser}=loginSlice.actions;
export const loginReducer=loginSlice.reducer;