import { createSlice } from "@reduxjs/toolkit";

export const searchItemSlice = createSlice({
  name: "searchItem",
  initialState: {
    data: [],
  },
  reducers: {
    setSearchedItem(state, action) {
      state.data = action.payload;
      console.log(action.payload);
    },
  },
});

export const { setSearchedItem } = searchItemSlice.actions;
export default searchItemSlice.reducer;
