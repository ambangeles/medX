import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import blockchainReducer from "./blockchainReducer";

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  medrec: blockchainReducer
});

export default rootReducer;
