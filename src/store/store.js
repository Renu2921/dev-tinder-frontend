import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./loginSlice";
import { feedreducer } from "./feedSlice";
import { connectionReducer } from "./connectionSlice";
import { requestReducer } from "./requestsSlice";

const store=configureStore({
    reducer:{
        login:loginReducer,
        feed:feedreducer,
        connection:connectionReducer,
        request:requestReducer
    }
});

export default store;