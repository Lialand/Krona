import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

import AuthModal from "../../Auth/AuthModal";
import Notice from "../../Auth/Notice/Notice";
import MessageModal from "../MessageModal/MessageModal";
import { battles } from "../../../shared/constants/pages";
import { restorePasswordURL } from "../../../shared/constants/URLs";

import "./RestorePassword.scss";

export default function RestoreAccount() {

    const { search } = useLocation(); //Гет-параметры: е-мейл и ключ активации

    const [isSuccess, setIsSuccess] = useState(false); 
    const [isError, setIsError] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [isActivePassView, setIsActivePassView] = useState(false);
    const [firstFieldPsw, setFirstFieldPsw] = useState("");
    const [secondFieldPsw, setSecondFieldPsw] = useState("");
    const [params, setParams] = useState({
        email: search?.split("email=")[1]?.split("&")[0],
        password: "",
        activationKey: search?.split("activationKey=")[1]
    });

    //Блок кода нужен для контроля открыть/закрыть модального окна авторизации и сообщения об ошибке
    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
    function closeModal(e) {

        if (e.target.tagName !== "SECTION") 
            return;

        setIsOpenAuthModal(false);
        setIsError(false);
    }
    /////////////////////////////////

    function sendParams() {

        axios({
            url: restorePasswordURL,
            method: "POST",
            data: params
        }).then(
            res => {
                setIsSuccess(true);
            }, 
            err => {
                setIsError(true);
            }
        )

    };

    function checkFields() {

        if (firstFieldPsw.length === 0 || secondFieldPsw.length === 0) {
            setPrompt("Заполните поля");
        } else if (firstFieldPsw !== secondFieldPsw) {
            setPrompt("Пароли не совпадают");
        } else {
            setParams(state => ({...state, password: secondFieldPsw}));
            sendParams();
        }
    }

    if (search === "")
        return (
            <section className="restore">
                <h1 className="restoreHeading">Нет параметров в url</h1>
            </section>
        )
    if (!isSuccess) 
        return (
            <section className="restorePsw">
                <img src="/assets/images/restorepsw-pic.png" />
                <h1 className="restorePswHeading">Восстановление пароля</h1>
                <div>
                    <div className="inputs">
                        <div className="inputGroup">
                            <p className="prompt">Введите новый пароль *</p>
                            <input
                                name="password"
                                className="inputfield necessarily"
                                type={isActivePassView ? "text" : "password"}
                                onChange={e => setFirstFieldPsw(e.target.value)} 
                                value={firstFieldPsw}
                            />
                            <img 
                                className={`showPass ${isActivePassView ? "active" : ""}`} 
                                src="/assets/images/show-pass.svg" 
                                alt="Показать пароль" 
                                onClick={() => setIsActivePassView(state => !state)}
                            />
                        </div>
                        <div className="inputGroup">
                            <p className="prompt">Повторите новый пароль *</p>
                            <input
                                name="password"
                                className="inputfield necessarily"
                                type={isActivePassView ? "text" : "password"}
                                onChange={e => setSecondFieldPsw(e.target.value)} 
                                value={secondFieldPsw}
                            />
                            <img 
                                className={`showPass ${isActivePassView ? "active" : ""}`} 
                                src="/assets/images/show-pass.svg" 
                                alt="Показать пароль" 
                                onClick={() => setIsActivePassView(state => !state)}
                            />
                        </div>
                    </div>
                    {prompt !== "" && 
                        <Notice 
                            text={prompt} 
                            closeNotice={() => setPrompt("")}
                            isError={true}
                        />
                    }
                </div>
                <button onClick={checkFields} className="enterbutton">
                    Сменить пароль
                </button>
                {isError && 
                    <MessageModal 
                        text="Произошла ошибка при смене пароля"
                        closeModal={() => setIsError(false)} 
                        outSideClose={e => closeModal(e)}
                    />
                }
            </section>
        )
    return (
        <section className="restorePsw">
            <section className="restorePsw">
                <img src="/assets/images/restorepsw-pic.png" />
                <h1 className="restorePswHeading">Пароль успешно изменён!</h1>
                <button onClick={() => setIsOpenAuthModal(true)} className="enterbutton">
                    Войти
                </button>
            </section>
            {isOpenAuthModal && 
                <AuthModal 
                    close={() => setIsOpenAuthModal(false)}
                    outSideClose={e => closeModal(e)}
                />
            }
        </section>
    )
}