/* eslint-disable no-throw-literal */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";


const initialState = {
  status: "idle",
  productList :[],
  limit:10,
  page:0
};

export const GetProduct = createAsyncThunk(
  "getproduct",
  async (page = 1, { getState, dispatch }) => {
    const state = getState().product
    try {
      const allProduct = await axiosInstance.get(`/products?offset=${(page - 1) * 10}&limit=${state?.limit}`);
      return {data:allProduct?.data,page};
    } catch (err) {
      throw err;
    }
  }
);

export const ProductSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProduct.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(GetProduct.fulfilled, (state, { payload }) => {
          state.status = "idle";
          if(state?.page < payload?.page){
            state.productList =[...state.productList,...payload?.data]
            state.page = payload?.page
          }
      })
      .addCase(GetProduct.rejected, (state, { payload }) => {
        state.status = "idle";
      });
  },
});

export const {  } = ProductSlice.actions;
