import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";   // ✅ Import reducer

const appStore = configureStore({
    reducer: {
        user: userReducer,   // ✅ Register slice
    },
});

export default appStore;
