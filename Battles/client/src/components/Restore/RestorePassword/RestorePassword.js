import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import { restorePassword } from "reduxFolder/actions/AjaxActions";
import AuthModal from "../../Auth/AuthModal";
import Notice from "../../Auth/Notice/Notice";
import MessageModal from "../MessageModal/MessageModal";

import "./RestorePassword.scss";

function RestorePassword({ restorePassword }) {

    const { search } = useLocation(); //Гет-параметры: е-мейл и ключ активации

    const [isSuccess, setIsSuccess] = useState(undefined); 
    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [isActivePassView, setIsActivePassView] = useState(false);
    const [firstFieldPsw, setFirstFieldPsw] = useState("");
    const [secondFieldPsw, setSecondFieldPsw] = useState("");
    const [notice, setNotice] = useState({
        isError: false,
        type: "",
        show: false,
        text: ""
    });
    const [params, setParams] = useState({
        email: search?.split("email=")[1]?.split("&")[0],
        password: "",
        activationKey: search?.split("activationKey=")[1]
    });

    function checkFields() {

        if (firstFieldPsw.length === 0 || secondFieldPsw.length === 0) {
            setPrompt("Заполните поля");
        } else if (firstFieldPsw !== secondFieldPsw) {
            setPrompt("Пароли не совпадают");
        } else {
            setParams(state => ({...state, password: secondFieldPsw}));
        }
    }

    useEffect(() => {
        if (params.password !== "")
            restorePassword(params, setIsSuccess);
    }, [params]);

    if (search === "")
        return (
            <section className="restore">
                <h1 className="restoreHeading">Неверный URL</h1>
            </section>
        )
    else if (isSuccess === undefined || isSuccess === "error") 
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
                {isSuccess === "error" && 
                    <MessageModal 
                        text="Произошла ошибка при смене пароля"
                        closeModal={() => setIsSuccess(undefined)} 
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
            <AuthModal 
                close={() => setIsOpenAuthModal(false)}
                show={isOpenAuthModal}
                notice={notice}
                setNotice={setNotice}
            />
        </section>
    )
}

const mapDispatchToProps = (dispatch) => ({
    restorePassword: (params, immediatlySetData) => dispatch(restorePassword(params, immediatlySetData))
})

export default connect(null, mapDispatchToProps)(RestorePassword);