import { combineReducers } from "redux";
import UserReduce from "./users/userReducer";
import WorkDateReducer from "./workDates/workDateReducer";

const rootReducer = combineReducers({
    users: UserReduce,
    workDates: WorkDateReducer
})
export default rootReducer