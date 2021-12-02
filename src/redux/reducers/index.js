/** @format */

import { combineReducers } from "redux";
import userReducer from "src/redux/reducers/userReducer";
import tempReducer from "src/redux/reducers/tempReducer";
import postReducer from "src/redux/reducers/postReducer";

const rootReducer = combineReducers({
    userReducer,
    tempReducer,
    postReducer,
});

export default rootReducer;
