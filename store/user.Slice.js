import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  picture: "",
  transactionsIds: [],
  categoriesIds: [],
};

export const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setInitialState: (state,action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setInitialState } = userSlice.actions;

export default userSlice.reducer;
