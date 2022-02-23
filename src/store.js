import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
console.log("message reducer", messageReducer);

const reducer = {
 
  auth: authReducer,
  message: messageReducer
}

const store = configureStore({
  reducer: reducer,
  //devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

})

export default store;
