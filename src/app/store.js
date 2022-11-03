import { configureStore } from "@reduxjs/toolkit";
import musicSliceReducer from "./musicSlice";
const store = configureStore({
  reducer: {
    music: musicSliceReducer,
  },
});

export default store;
