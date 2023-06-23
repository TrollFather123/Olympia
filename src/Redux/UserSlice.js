/* eslint-disable no-throw-literal */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/Helper";
import axios from "axios";

const initialState = {
  status: "idle",
  emailAvailable: true,
  isLoggedIn: false,
  userDetails: {},
};

export const CreateUser = createAsyncThunk(
  "createuser",
  async (user, { getState, dispatch }) => {
    try{
      const allUser = await axiosInstance.get("/users")
      // console.log(allUser?.data,"allUser")
      const checkEmail = allUser?.data.find((data)=>data?.email === user?.email)
      if(!checkEmail){
       
        console.log(user?.avatar,"avatar")
        const file = await axiosInstance.post("/files/upload",user?.avatar)
        console.log(file?.data,"file")
        const res = await axiosInstance.post("/users", {...user,avatar:file?.data?.location});
        dispatch(LoginUser(user))
        return res;
      }
      else{
        throw {message:"User Already Exist"}
      }
    }
    catch(err){
      throw err
    }
  }
);
export const CheckEmail = createAsyncThunk(
  "checkemail",
  async (user, { getState, dispatch }) => {
    try {
      const res = await axiosInstance.post("/users/is-available/", user);
      return res;
    } catch (err) {
      throw err;
    }
  }
);
export const LoginUser = createAsyncThunk(
  "loginuser",
  async (user, { getState, dispatch }) => {
    try {
      const res = await axiosInstance.post("/auth/login/", user);
      return res;
    } catch (err) {
      throw {message:"Password or Emial id is wrong"};
    }
  }
);
export const CurrentUser = createAsyncThunk("currentuser", async () => {
  try {
    const res = await axiosInstance.get("/auth/profile/");
    return res;
  } catch (err) {
    throw err;
  }
});

// export const CurrentUserEdit = createAsyncThunk(
//   "currentuseredit",
//   async (args, { getState }) => {
//     try {
//       console.log(getState(),"getstate")
//       const res = await axiosInstance.get(
//         `/users/${getState().userDetails?.id}`
//       );
//       return res;
//     } catch (err) {
//       throw err;
//     }
//   }
// );
export const CurrentUserUpdate = createAsyncThunk(
    "currentuserupdate",
    async (user, { getState }) => {
      try {
       
        const res = await axiosInstance.put(
          `/users/${getState().user?.userDetails?.id}`,{...user,avatar:"https://api.lorem.space/image/face?w=640&h=480&r=867"});
        return res;
      } catch (err) {
        throw err;
      }
    }
  );

  export const ForgetPasswordUser = createAsyncThunk(
    "forgetpassword",
    async (user, { getState }) => {
      try{
        const allUser = await axiosInstance.get("/users")
        console.log(allUser?.data,"allUser")
        const checkEmail = allUser?.data.find((data)=>data?.email === user?.email)
        if(checkEmail){
          await axios.post("https://60fd-182-79-73-22.ngrok-free.app/sendMail",checkEmail)
          throw {message:`Your password is sent to your register Email`}
        }
        else{
          throw {message:"User Does Not Exist"}
        }
      }
      catch(err){
        throw err
      }
    }
  );



export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoggedOut: (state, { payload }) => {
      localStorage.removeItem("access_token");
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(CreateUser.fulfilled, (state, { payload }) => {
        if (payload?.status === 201) {
          state.status = "idle";
        }
      })
      .addCase(CreateUser.rejected, (state, { payload }) => {
        state.status = "idle";
      })
      // for email-check
      .addCase(CheckEmail.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(CheckEmail.fulfilled, (state, { payload }) => {
        if (payload?.status === 201) {
          state.emailAvailable = payload?.data?.isAvailable;
        }
      })
      .addCase(CheckEmail.rejected, (state, { payload }) => {
        state.status = "idle";
      })

      // Login User
      .addCase(LoginUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(LoginUser.fulfilled, (state, { payload }) => {
        if (payload?.status === 201) {
          state.status = "idle";
          state.isLoggedIn = true;
          localStorage.setItem("access_token", payload?.data?.access_token);
        }
      })
      .addCase(LoginUser.rejected, (state, { payload }) => {
        state.status = "idle";
      })

      // Current User
      .addCase(CurrentUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(CurrentUser.fulfilled, (state, { payload }) => {
        if (payload?.status === 200) {
          state.status = "idle";
          console.log(payload?.data, " payload?.data");
          state.userDetails = payload?.data;
        }
      })
      .addCase(CurrentUser.rejected, (state, { payload }) => {
        state.status = "idle";
      })

      // Edit Current User
      // .addCase(CurrentUserEdit.pending, (state, action) => {
      //   state.status = "pending";
      // })
      // .addCase(CurrentUserEdit.fulfilled, (state, { payload }) => {
      //   if (payload?.status === 200) {
      //     state.status = "idle";
      //     state.userDetails = payload?.data;
      //   }
      // })
      // .addCase(CurrentUserEdit.rejected, (state, { payload }) => {
      //   state.status = "idle";
      // })

      // Edit Current User
      .addCase(CurrentUserUpdate.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(CurrentUserUpdate.fulfilled, (state, { payload }) => {
        if (payload?.status === 201) {
          state.status = "idle";
         
        }
      })
      .addCase(CurrentUserUpdate.rejected, (state, { payload }) => {
        state.status = "idle";
      });
  },
});

export const { LoggedOut } = UserSlice.actions;
