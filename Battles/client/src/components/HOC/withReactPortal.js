import React from "react";
import ReactDOM from "react-dom";

function withReactPortal(Component) {
    return ({...props}) => { 
        return ReactDOM.createPortal(
            <Component {...props} />,
            document.body
        )
    }
}

export default withReactPortal;