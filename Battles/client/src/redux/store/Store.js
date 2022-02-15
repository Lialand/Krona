import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/Reducer";
import ajaxReducer from "../reducers/AjaxReducer";
import uploadModalReducer from "../reducers/UploadModalReducer";

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    reducer,
    uploadModalReducer,
    ajaxReducer
});

const store = createStore(
    rootReducer,
    composer(applyMiddleware(thunk))
);

export default store;
