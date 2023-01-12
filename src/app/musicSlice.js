import { createSlice } from "@reduxjs/toolkit";

export const musicSlice = createSlice({
  name: "currentMusic",
  initialState: {
    data: [],
    relatedPlaylist: [],
    currentIndex: 0,
  },
  reducers: {
    setCurrentMusic(state, action) {
      state.data = action.payload;
      console.log(state.data);
      state.currentIndex = 0;
    },
    setRelatedPlaylist(state, action) {
      // const related = JSON.parse(action.payload.related);
      const related = action.payload.related;
      state.relatedPlaylist = [action.payload, ...related];
      console.log(state.relatedPlaylist);
    },
    goNext(state) {
      if (state.currentIndex < state.relatedPlaylist.length - 1) {
        state.currentIndex += 1;
      } else {
        state.currentIndex = 0;
      }
    },
    goPrev(state) {
      if (state.currentIndex === 0) {
        state.currentIndex = 0;
      } else {
        state.currentIndex -= 1;
      }
    },
  },
});

export const { setCurrentMusic, setRelatedPlaylist, goNext, goPrev } =
  musicSlice.actions;
export default musicSlice.reducer;
