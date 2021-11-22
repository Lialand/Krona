import React from "react";

import Login from "../FormTypes/Login";
import Registration from "../FormTypes/Registration";
import RestoreAccount from "../FormTypes/RestoreAccount";
import RestorePassword from "../FormTypes/RestorePassword";

import "./AuthInputs.scss";

const FormType = (props) => {

    const { 
        formType,
        isActivePassView,
        setIsActivePassView,
        enterBtn
    } = props;
    const standartProps = {
        isActivePassView,
        setIsActivePassView,
        enterBtn
    }
    
    if (formType === "RESTORE_PASSWORD") {
        return <RestorePassword enterBtn={enterBtn} />
    } else if (formType === "RESTORE_ACCOUNT") {
        return <RestoreAccount {...standartProps} />
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
        enterBtn,
        error
    } = props;

    return (
        <div className={`authInputs ${error.isError && error.show  ? "error" : ""}`}>
            <FormType 
                formType={formType}
                isActivePassView={isActivePassView}
                setIsActivePassView={setIsActivePassView}
                enterBtn={enterBtn}
            />
        </div>
    )
}