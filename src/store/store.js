import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import configReducer from "./reducers/config";

const rootReducer = combineReducers({
    config: configReducer
});

let store = {};
if (process.env && process.env.NODE_ENV === 'development') {
    store = createStore(rootReducer, applyMiddleware(thunk, logger));
} else {
    store = createStore(rootReducer, applyMiddleware(thunk));
}

export default store;