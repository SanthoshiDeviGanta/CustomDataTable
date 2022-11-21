import { combineReducers } from "redux";
import techReducers from "./reducer";

const rootReducer = combineReducers({
    techonolgiesReducer : techReducers
})

export default rootReducer;