import React from "react";

function ErrorMessage(props) {
    
    return (
        <div className="errorMessage">
            <img src="/assets/images/warning-upload.svg" className="iconWarning" />
                {props.errorText}
            <img 
                src="/assets/images/warning-upload-close.svg" 
                className="iconWarningClose" 
                onClick={props.errorClose}
            />
        </div>
    );
}

export default ErrorMessage;