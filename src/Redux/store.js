import { applyMiddleware, createStore, compose } from "redux";
import reducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import handleFunctions from './sagas';
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

let store = createStore(reducer, compose(applyMiddleware (sagaMiddleware), composeWithDevTools()));

sagaMiddleware.run(handleFunctions);

export default store;