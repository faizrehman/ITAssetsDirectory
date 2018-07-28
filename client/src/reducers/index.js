import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import assetReducer from "./assetReducer";

export default combineReducers({
  auth: authReducer,
  asset: assetReducer,
  errors: errorReducer
});
