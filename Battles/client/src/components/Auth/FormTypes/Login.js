import React from "react";

export default function Login(props) {

    const {
        isActivePassView,
        setIsActivePassView,
        handleOnKeyDown
    } = props;

    return (
        <>
        <div className="inputGroup">
            <p className="inputInfo">
                Введите логин *
            </p>
            <input
                name="username"
                className="inputfield necessarily"
                type="text"
                onKeyDown={handleOnKeyDown}
            />
        </div>
        <div className="inputGroup">
            <p className="inputInfo">Введите пароль *</p>
            <input
                name="password"
                className="inputfield necessarily"
                type={isActivePassView ? "text" : "password"}
                onKeyDown={handleOnKeyDown}
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