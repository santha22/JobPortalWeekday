import { combineReducers  } from "redux";
import jobsReducer from "./reducers/jobsReducer";

const rootReducer = combineReducers({
    jobs: jobsReducer,
});

export default rootReducer;