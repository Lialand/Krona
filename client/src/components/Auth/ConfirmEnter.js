import React from "react";

const buttonTextType = formType => {
    
    if (formType === "RESTORE_PASSWORD" || formType === "RESTORE_ACCOUNT") {
        return "Отправить"
    } else if (formType === "REGISTRATION") {
        return "Зарегистрироваться"
    } else {
        return "Войти"
    }

}

export default function ConfirmEnter(props) {

    return (
        <div className="confirmEnter">
            <button type="button" onClick={props.sendForm} className="enterbutton" id="login">
                {buttonTextType(props.formType)}
            </button>
            {props.formType === "LOGIN" && 
            <div className="rememberme">
                <input className="remembermeInput" type="checkbox" name="rememberme" id="rememberme" />
                <label htmlFor="rememberme">
                    <p className="remembermeText">Запомнить меня</p>
                </label>
            </div>
            }
        </div>
    )
}