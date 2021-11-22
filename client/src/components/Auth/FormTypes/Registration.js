import React from "react";

export default function Registration(props) {

    const {
        isActivePassView,
        setIsActivePassView,
        enterBtn
    } = props;

    return (
        <>
        <div className="inputGroup">
            <p className="inputInfo">Введите email *</p>
            <input
                name="email"
                className="inputfield necessarily"
                type="e-mail"
                onKeyDown={enterBtn}
            />
        </div>
        <div className="inputGroup">
            <p className="inputInfo">Введите пароль *</p>
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
        <div className="inputGroup">
            <p className="inputInfo">Логин *</p>
            <input
                name="login"
                className="inputfield necessarily"
                type="text"
                onKeyDown={enterBtn}
            />
        </div>
        <div className="inputGroup">
            <p className="inputInfo">Ссылка на вашу соцсеть *</p>
            <input
                name="site"
                className="inputfield necessarily"
                type="text"
                onKeyDown={enterBtn}
            />
        </div>
        <div className="inputGroup">
            <p className="inputInfo">Ваше имя</p>
            <input
                name="name"
                className="inputfield"
                type="text"
                onKeyDown={enterBtn}
            />
        </div>
        </>
    )
}