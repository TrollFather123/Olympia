/* eslint-disable no-throw-literal */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";


const initialState = {
  status: "idle",
  productList :[],
  productDetails:{},
  limit:10,
  page:0
};

export const GetProduct = createAsyncThunk(
  "getproduct",
  async (page = 1, { getState, dispatch }) => {
    const state = getState().product
    console.log(state)
    try {
      const allProduct = await axiosInstance.get(`/products?offset=${(page - 1) * 10}&limit=${state?.limit}`);
      return {data:allProduct?.data,page};
    } catch (err) {
      throw err;
    }
  }
);

export const CreateEachProduct = createAsyncThunk(
  "createproduct",
  async (product, { getState, dispatch }) => {
    try {
      const res = await axiosInstance.post(`/products`,{...product,images:["https://fastly.picsum.photos/id/1065/640/640.jpg?hmac=k_bNRMiBlwjqhi5DQoR0u8IwkCDCWAv524qi0ZObXqU","https://fastly.picsum.photos/id/1065/640/640.jpg?hmac=k_bNRMiBlwjqhi5DQoR0u8IwkCDCWAv524qi0ZObXqU","https://fastly.picsum.photos/id/1065/640/640.jpg?hmac=k_bNRMiBlwjqhi5DQoR0u8IwkCDCWAv524qi0ZObXqU"]});
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const GetEachProduct = createAsyncThunk(
  "getproductdetails",
  async (id, { getState, dispatch }) => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const UpdateProduct = createAsyncThunk(
  "updateproduct",
  async (product, { getState, dispatch }) => {
    try {
      const res = await axiosInstance.put(`/products/${getState()?.product?.productDetails?.id}`,product);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const DeleteProduct = createAsyncThunk(
  "deleteproduct",
  async (id, { getState, dispatch }) => {
    try {
      const res = await axiosInstance.delete(`/products/${id}`);
      return res;
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
      })

      // Create Product

      .addCase(CreateEachProduct.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(CreateEachProduct.fulfilled, (state, { payload }) => {
          if(payload?.status === 201){
            state.status = "idle";
          }
      })
      .addCase(CreateEachProduct.rejected, (state, { payload }) => {
        state.status = "idle";
      })


        // Deatils Product

        .addCase(GetEachProduct.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(GetEachProduct.fulfilled, (state, { payload }) => {
            if(payload?.status === 200){
              state.productDetails = payload?.data
              state.status = "idle";
            }
        })
        .addCase(GetEachProduct.rejected, (state, { payload }) => {
          state.status = "idle";
        })

         // Update Product

         .addCase(UpdateProduct.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(UpdateProduct.fulfilled, (state, { payload }) => {
            if(payload?.status === 201){
              state.productDetails = payload?.data
              state.status = "idle";
            }
        })
        .addCase(UpdateProduct.rejected, (state, { payload }) => {
          state.status = "idle";
        })

        
         // Delete Product

         .addCase(DeleteProduct.pending, (state, action) => {
          state.status = "pending";
        })
        .addCase(DeleteProduct.fulfilled, (state, { payload }) => {
          state.status = "idle";
        })
        .addCase(DeleteProduct.rejected, (state, { payload }) => {
          state.status = "idle";
        });
  },
});


