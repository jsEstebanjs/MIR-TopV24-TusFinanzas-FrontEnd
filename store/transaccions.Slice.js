import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  docs: [],
};

export const transaccionsSlice = createSlice({
  name: "TransaccionsSlice",
  initialState,
  reducers: {
    pushDocs:(state,action)=>{
      state.docs = action.payload;
        
    },
  },
});

export const { pushDocs } = transaccionsSlice.actions;

export default transaccionsSlice.reducer;
