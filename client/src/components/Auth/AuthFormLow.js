import React from "react";

export default function AuthFormLow(props) {

    return (
        <div className="authFormLow">
            {props.formType === "LOGIN" && 
            <>
                <p onClick={props.setFormRestorePassword} className="authFormLowItem">Забыли свой пароль?</p>
                <p className="slash">/</p>
            </>
            }
            {props.formType === "LOGIN"
                ?
                <p className="authFormLowItem" onClick={props.setFormRegistration}>
                    Регистрация
                </p>
                :
                <p className="authFormLowItem" onClick={props.setFormLogin}>
                    Войти
                </p>
            }
            {/* <p className="slash">/</p>
            <p className="authFormLowItem" onClick={props.setFormRestoreAccount}>
                Восстановление аккаунта
            </p> */}
        </div>
    )
}