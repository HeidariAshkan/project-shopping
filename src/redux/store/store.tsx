import { configureStore } from "@reduxjs/toolkit";

import categorySlice from "./../slice/categorySlice";
import productSlice from "./../slice/productSlice"
import selfProductSlice from "./../slice/selfProductSlice"


export const store = configureStore({
    reducer: {
        categorySlice,
        productSlice,
        selfProductSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
