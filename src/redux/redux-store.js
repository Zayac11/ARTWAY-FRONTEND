import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import artifactReducer from "./artifact";
import museumReducer from "./museum-reducer";
import authReducer from "./authentication";

let reducers = combineReducers({
    artifact: artifactReducer,
    museum: museumReducer,
    auth: authReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;
