import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../Redux/UserSlice";
import { ProductSlice } from "../Redux/ProductSlice";
import { CategorySlice } from "../Redux/CategorySlice";

export const store = configureStore({
    reducer:{
        user: UserSlice.reducer,
        product:ProductSlice.reducer,
        category:CategorySlice.reducer
    }
})