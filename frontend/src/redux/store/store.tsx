import { configureStore } from "@reduxjs/toolkit";

import categorySlice from "./../slice/categorySlice";
import productSlice from "./../slice/productSlice"
import selfProductSlice from "./../slice/selfProductSlice"
import orderCartSlice from './../slice/orderCartSlice'
import isAdminSlice from './../slice/isAdminSlice'




export const store = configureStore({
    reducer: {
        categorySlice,
        productSlice,
        selfProductSlice,
        orderCartSlice,
        isAdminSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
