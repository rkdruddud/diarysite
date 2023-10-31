import { configureStore } from "@reduxjs/toolkit";
import userinfo from "../Reducer/store";
import dateinfo from "../Reducer/dateStrore";

const store = configureStore({
    reducer: {
        storeUserInfo: userinfo.reducer,
        storeDateInfo: dateinfo.reducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;