import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user.Slice'

export const store = configureStore({
  reducer: {
    UserSlice:userSlice
  },
})