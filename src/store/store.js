import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./loginSlice";
import { feedreducer } from "./feedSlice";

const store=configureStore({
    reducer:{
        login:loginReducer,
        feed:feedreducer
    }
});

export default store;