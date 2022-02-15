import React from "react";

function ErrorMessage(props) {
    
    return (
        <div className="errorMessage" style={!props.isClosable ? {paddingRight: "40px"} : {}} >
            <img src="/assets/images/warning-upload.svg" className="iconWarning" />
            {props.errorText}
            {props.isClosable &&
                <img 
                    src="/assets/images/warning-upload-close.svg" 
                    className="iconWarningClose" 
                    onClick={props.errorClose}
                />
            }
        </div>
    );
}

export default ErrorMessage;