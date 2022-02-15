import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store/Store";
import { connect, Provider } from "react-redux";
import Main from "./components/Main/Main";

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <Main />
        </Provider>
    </Router>,
    document.getElementById("render")
);
