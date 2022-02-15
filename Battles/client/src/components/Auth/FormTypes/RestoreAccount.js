import React from "react";

export default function RestoreAccount(props) {

    const {
        isActivePassView,
        setIsActivePassView,
        enterBtn
    } = props;

    return (
        <>
        <div className="inputGroup">
            <p className="inputInfo">Аккаунт в соцсети *</p>
            <input
                name="login"
                className="inputfield necessarily"
                type="text"
                onKeyDown={enterBtn}
            />
        </div>
        <div className="inputGroup">
            <p className="inputInfo">Почтовый адрес *</p>
            <input
                name="email"
                className="inputfield necessarily"
                type="e-mail"
                onKeyDown={enterBtn}
            />
        </div>
        <div className="inputGroup">
            <p className="inputInfo">Пароль *</p>
            <input
                name="password"
                className="inputfield necessarily"
                type={isActivePassView ? "text" : "password"}
                onKeyDown={enterBtn}
            />
            <img 
                className={`showPass ${isActivePassView ? "active" : ""}`} 
                src="/assets/images/show-pass.svg" 
                alt="Показать пароль" 
                onClick={setIsActivePassView}
            />
        </div>
        </>
    )
}