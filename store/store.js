import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user.Slice'
import transaccionsSlice from './transaccions.Slice';
import logOutSlice from './logOut.slice';

export const store = configureStore({
  reducer: {
    UserSlice: userSlice,
    TransaccionsSlice:transaccionsSlice,
    LogOutSlice:logOutSlice
  },
})