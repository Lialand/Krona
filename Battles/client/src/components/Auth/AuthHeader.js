import React from "react";

const headingType = formType => {

    if (formType === "RESTORE_PASSWORD") {
        return "Восстановление пароля"
    } else if (formType === "RESTORE_ACCOUNT") {
        return "Восстановление аккаунта"
    } else if (formType === "REGISTRATION") {
        return "Зарегистрируйтесь, чтобы участвовать в баттле"
    } else {
        return "Войдите, чтобы участвовать в баттле"
    }
}

export default function AuthHeader(props) {

    return (
        <>
            <div onClick={props.closeModal} className="closeModal">
                <img src="/assets/images/cross-white.svg" alt="Закрыть" className="closeModalImage" />
            </div>
            <h1 className="authModalHeading">
                {headingType(props.formType)}
            </h1>
        </>
    )
}