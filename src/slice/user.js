import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    value: 0,
  };

  export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
      add: state => {
        state.value += 1;
      },
      decrement: state => {
        state.value -= 1;
      },
    },
  });