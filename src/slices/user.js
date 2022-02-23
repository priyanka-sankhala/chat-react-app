import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {register as userRegister} from '../services/user.service'
import { setMessage } from "./message";

const initialValues = {};

export const register = createAsyncThunk(
  "user/register",
  async (formValue, thunkAPI) => {
    
    try {
      const response = await userRegister(formValue);
     console.log("user.js response", response);
     // console.log("user.js", response.response);
      
     // thunkAPI.dispatch(setMessage(response.message));
     // thunkAPI.dispatch(setUser(response))
      return response
    } catch (error) {
      // console.log("user.js 17", error);
      // console.log("user.js 18", error.response);
      // console.log("user.js 19", error.message);
      
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
      console.log("in setUser reduce==>", action);
      const  {tokens,user} = action.payload;
      return { user:user, tokens:tokens};
    },
    clearUser: () => {
      return { user: "" , tokens:"" };
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      console.log(" register extra redu fulfilled", action);
      
      state.isLoggedIn = false;
      state.loading= false
      state.user=action.payload.user
      state.tokens=action.payload.tokens;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.loading= false
    },
    [register.pending]:(state,action)=>{
        state.loading= true
    }
    
  },
});


const { reducer, actions } = userSlice;


// export const { setMessage, clearMessage } = actions;
// export default reducer;

//const { reducer } = userSlice;
export default reducer;
