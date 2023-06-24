import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../Helper/Helper"

const initialState = {
    status:"idle",
    filterProductList:[],
    filterProductListByCategory:[],
}

export const FilterByTitle = createAsyncThunk(
    "filterbyname",
    async(title,{dispatch,getState})=>{
        let res = await axiosInstance.get(`products/?title=${title}`);
        return res
    }
)

export const FilterByCategory = createAsyncThunk(
    "filterbycategory",
    async(id,{dispatch,getState})=>{
        let res = await axiosInstance.get(`products/?categoryId=${id}`);
        return res
    }
)
export const FilterByPriceRange = createAsyncThunk(
    "filterbypricerange",
    async(value,{dispatch,getState})=>{
        let res = await axiosInstance.get(`products/?price_min=${value[0]}&price_max=${value[1]}`)
        return res
    }
)
export const FilterSlice = createSlice({
    initialState,
    name:"filterproducts",
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(FilterByTitle.pending,(state,action)=>{
            state.status = "pending"
        })
        .addCase(FilterByTitle.fulfilled,(state,{payload})=>{
            if(payload?.status === 200){
                state.filterProductList = payload?.data
                state.status = "idle"
            }
        })
        .addCase(FilterByTitle.rejected,(state,action)=>{
            state.status = "idle"
        })

        // filter by category

        .addCase(FilterByCategory.pending,(state,action)=>{
            state.status = "pending"
        })
        .addCase(FilterByCategory.fulfilled,(state,{payload})=>{
            if(payload?.status === 200){
                state.filterProductListByCategory = payload?.data
                state.status = "idle"
            }
        })
        .addCase(FilterByCategory.rejected,(state,action)=>{
            state.status = "idle"
        })

        // filter by price range

        .addCase(FilterByPriceRange.pending,(state,action)=>{
            state.status = "pending"
        })
        .addCase(FilterByPriceRange.fulfilled,(state,{payload})=>{
            if(payload?.status === 200){
                state.filterProductList = payload?.data
                state.status = "idle"
            }
        })
        .addCase(FilterByPriceRange.rejected,(state,action)=>{
            state.status = "idle"
        })
    }
})