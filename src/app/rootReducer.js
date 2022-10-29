import { combineReducers } from "@reduxjs/toolkit";
import searchItemReducer from "./searchItemSlice";
const rootReducer = combineReducers({ searchItemReducer });
export default rootReducer;
