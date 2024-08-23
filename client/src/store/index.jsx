import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slice/userSlice";
import { authReducer } from "./slice/authSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        auth : authReducer
    }
});