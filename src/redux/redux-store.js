import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import museumReducer from "./museum-reducer";
import authReducer from "./authentication";
import locationReducer from "./location-reducer";
import hallReducer from "./hall-reducer";
import artifactReducer from "./artifact-reducer";
import adminReducer from "./admin-reducer";
import serviceAdminReducer from "./serviceAdmin-reducer";
import cashierReducer from "./cashier-reducer";
import userReducer from "./user-reducer";

let reducers = combineReducers({
    artifact: artifactReducer,
    museum: museumReducer,
    auth: authReducer,
    location: locationReducer,
    hall: hallReducer,
    admin: adminReducer,
    service: serviceAdminReducer,
    cashier: cashierReducer,
    user: userReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// window.store = store;

export default store;
