import { configureStore } from "@reduxjs/toolkit";

import categorySlice from "./../slice/categorySlice";
import productSlice from "./../slice/productSlice"


export const store = configureStore({
    reducer: {
        categorySlice,
        productSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
