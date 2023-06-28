import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../Helper/Helper"

const initialState = {
    status:"idle",
    filterProductList:[],
    // limit:10,
    // page:0
    // filterProductListByCategory:[],
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

export const FilterByAll = createAsyncThunk(
    "filterbyall",
    async({title,id,value},{getState,dispatch})=>{
        const state = getState().product;
     
        let allProduct = await axiosInstance.get(`products/?title=${title}&price_min=${value[0]}&price_max=${value[1]}&categoryId=${id}`)
        return allProduct;
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
                state.filterProductList = payload?.data
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


        // filter by all sets

        .addCase(FilterByAll.pending,(state,action)=>{
            state.status = "pending"
        })
        .addCase(FilterByAll.fulfilled,(state,{payload})=>{
            if(payload?.status === 200){
                state.filterProductList = payload?.data
                state.status = "idle"
            }
            // console.log(state?.page,"state?.page")
            // console.log(payload?.page,"payload?.page")
            // if(state?.page <= payload?.page){
            //     state.filterProductList=[]
            //     // state.page = 0
            //     state.filterProductList =[...state.filterProductList,...payload?.data]
            //     state.page = payload?.page
            //   }
        })
        .addCase(FilterByAll.rejected,(state,action)=>{
            state.status = "idle"
        })
    }
})