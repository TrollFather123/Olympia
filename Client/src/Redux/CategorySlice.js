/* eslint-disable no-throw-literal */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";

const initialState = {
  status: "idle",
  categoryList: [],
  ProductListByCategory:[],
  page:0,
  limit:10,
  productId:-1
};

export const GetCategory = createAsyncThunk(
  "getproduct",
  async (arg, { getState, dispatch }) => {
    try {
      const allCategory = await axiosInstance.get("/categories");
      return allCategory;
    } catch (err) {
      throw err;
    }
  }
);
export const GetProductByCategory = createAsyncThunk(
    "getproductbycategory",
    async ({id,page=1}, { getState, dispatch }) => {
        const state = getState().category
      try {
        const allProductByCategory = await axiosInstance.get(`/categories/${id}/products?offset=${(page - 1) * 10}&limit=${state?.limit}`);
        return {data:allProductByCategory?.data,page};
      } catch (err) {
        throw err;
      }
    }
  );

  export const Createcategory = createAsyncThunk(
    "createcategory",
    async (data, { getState, dispatch }) => {
      try {
        const allCategory = await axiosInstance.post("/categories",{...data,image:"https://fastly.picsum.photos/id/1065/640/640.jpg?hmac=k_bNRMiBlwjqhi5DQoR0u8IwkCDCWAv524qi0ZObXqU"});
        return allCategory;
      } catch (err) {
        throw err;
      }
    }
  );


export const CategorySlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCategory.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(GetCategory.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          state.categoryList = payload?.data;
          state.status = "idle";
        }
      })
      .addCase(GetCategory.rejected, (state, { payload }) => {
        state.status = "idle";
      })

      // Get product by category

      .addCase(GetProductByCategory.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(GetProductByCategory.fulfilled, (state, { payload }) => {
        // console.log(state.ProductListByCategory?.[0]?.category?.id,"hello")
        if(payload?.data?.[0]?.category?.id !== state.productId){
          state.ProductListByCategory = []
          state.page = 0
        }
        if (payload?.page >  state.page) {
          console.log(state.ProductListByCategory,"asdf")
            state.ProductListByCategory = [...state.ProductListByCategory,...payload?.data];
            state.productId = payload?.data?.[0]?.category?.id
            state.page = payload?.page
            
        }
        state.status = "idle";
      })
      .addCase(GetProductByCategory.rejected, (state, { payload }) => {
        state.status = "idle";
      })

      // Create Category

      .addCase(Createcategory.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(Createcategory.fulfilled, (state, { payload }) => {
        if (payload?.status === 201) {
          state.status = "idle";
        }
      })
      .addCase(Createcategory.rejected, (state, { payload }) => {
        state.status = "idle";
      })
  },
});
