import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {login as userLogin, refreshToken as userRefresh} from '../services/user.service'
import { setMessage } from "./message";

const initialValues = {
  isLoggedIn:false
};

export const login = createAsyncThunk(
  "auth/login",
  async (formValue, thunkAPI) => {
    console.log("inside create thunk");
    
    try {
      const response = await userLogin(formValue);
      console.log("user.js response=>", response);
     if(response.status===1){
      localStorage.setItem("accessToken", response.tokens.access.token)
      localStorage.setItem("refreshToken", response.tokens.refresh.token)
      localStorage.setItem("isLoggedIn", true)

     }
      
     // thunkAPI.dispatch(setMessage(response.message));
     // thunkAPI.dispatch(setUser(response))
      return response
    } catch (error) {
      console.log("user.js 17", error);
      console.log("user.js 18", error.response);
      console.log("user.js 19", error.message);
      
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (formValue, thunkAPI) => {
    
    
    try {
      const response = await userRefresh();
      console.log("user.js response=>", response);
     if(response.status===1){
      localStorage.setItem("accessToken", response.tokens.access.token)
      localStorage.setItem("refreshToken", response.tokens.refresh.token)
      localStorage.setItem("isLoggedIn", true)

     }
      
     // thunkAPI.dispatch(setMessage(response.message));
     // thunkAPI.dispatch(setUser(response))
      return response
    } catch (error) {
      
      
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState:initialValues,
  reducers: {
    setUser: (state, action) => {
     // console.log("message==>", action);
      const  {tokens,user} = action.payload;
      return { user:user, tokens:tokens};
    },
    clearUser: () => {
      return { user: "" , tokens:"" };
    },
  },
  extraReducers: {
    //console.log("");
    
    [login.fulfilled]: (state, action) => {
      console.log("Auth Extra Reducers fulfilled", action);
      
      state.isLoggedIn = true;
      state.loading= false
      state.user=action.payload.user
      state.tokens=action.payload.tokens;
    },
    [login.rejected]: (state, action) => {
      
      
      state.isLoggedIn = false;
      state.loading= false
    },
    [login.pending]:(state,action)=>{
      
      
        state.loading= true
    },
    [refresh.fulfilled]:(state,action)=>{
     
      state.loading= false
      state.isLoggedIn = true;
      state.loading= false
      state.user=action.payload.user
      state.tokens=action.payload.tokens;
      if(action.payload.code===200){
        localStorage.setItem("accessToken",action.payload.access.token )
        localStorage.setItem("refreshToken",action.payload.refresh.token )
       // history.push
      }else{

      }

      
    },
    [refresh.pending]:(state,action)=>{
      
      
        state.loading= true
    },

    
  },
});




const { reducer, actions } = userSlice;


export const { setUser, clearUser } = actions;
// export default reducer;

//const { reducer } = userSlice;

export const selectUserId = (state) =>
state?.auth?.user?._id
export const selectUserName = (state) =>
state?.auth?.user?.first_name

export const selectIsloggedIn = (state) =>
state?.auth?.isLoggedIn
export default reducer;
