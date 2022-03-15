import { combineReducers } from "redux";
import takeAction from "../allActions/takeAction" 

export default () =>
  combineReducers({
    takeAction,
  });
