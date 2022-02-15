import React from "react";

import Login from "../FormTypes/Login";
import Registration from "../FormTypes/Registration";
import RestorePassword from "../FormTypes/RestorePassword";

import "./AuthInputs.scss";

const FormType = (props) => {

    const { 
        formType,
        isActivePassView,
        setIsActivePassView,
        handleOnKeyDown,
        handleChange,
        hint
    } = props;
    const standartProps = {
        isActivePassView,
        setIsActivePassView,
        handleOnKeyDown,
        handleChange,
        hint
    }
    
    if (formType === "RESTORE_PASSWORD") {
        return <RestorePassword handleOnKeyDown={handleOnKeyDown} />
    } else if (formType === "REGISTRATION") {
        return <Registration {...standartProps} />
    } else {
        return <Login {...standartProps} />
    }

}

export default function AuthInputs(props) {

    const {
        formType,
        isActivePassView,
        setIsActivePassView,
        handleOnKeyDown,
        handleChange,
        error,
        hint
    } = props;

    return (
        <div className={`authInputs ${error?.isError && error?.show  ? "error" : ""}`}>
            <FormType 
                formType={formType}
                isActivePassView={isActivePassView}
                setIsActivePassView={setIsActivePassView}
                handleOnKeyDown={handleOnKeyDown}
                handleChange={handleChange}
                hint={hint}
            />
        </div>
    )
}