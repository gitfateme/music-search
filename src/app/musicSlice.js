import { createSlice } from "@reduxjs/toolkit";

export const musicSlice = createSlice({
  name: "currentMusic",
  initialState: {
    data: [],
  },
  reducers: {
    setCurrentMusic(state, action) {
      console.log("music slice in action!!");
      state.data = action.payload;
    },
  },
});

export const { setCurrentMusic } = musicSlice.actions;
export default musicSlice.reducer;
