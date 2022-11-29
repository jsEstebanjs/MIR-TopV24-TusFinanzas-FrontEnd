import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user.Slice'
import transaccionsSlice from './transaccions.Slice';

export const store = configureStore({
  reducer: {
    UserSlice: userSlice,
    TransaccionsSlice:transaccionsSlice,
  },
})