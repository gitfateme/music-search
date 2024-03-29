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
      document.title = `${action.payload.song} - ${action.payload.artist} - Meowzic.com`;
      state.data = action.payload;
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
      document.title = `${state.relatedPlaylist[state.currentIndex].song} - ${
        state.relatedPlaylist[state.currentIndex].artist
      } - Meowzic.com`;
    },
    goPrev(state) {
      if (state.currentIndex === 0) {
        state.currentIndex = 0;
      } else {
        state.currentIndex -= 1;
      }
      document.title = `${state.relatedPlaylist[state.currentIndex].song} - ${
        state.relatedPlaylist[state.currentIndex].artist
      } - Meowzic.com`;
    },
  },
});

export const { setCurrentMusic, setRelatedPlaylist, goNext, goPrev } =
  musicSlice.actions;
export default musicSlice.reducer;
