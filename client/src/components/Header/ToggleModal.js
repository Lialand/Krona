/**
 * Этот компонент является описанием функционала кнопки "отправить
 * работу". Если пользователь авторизован, то кнопка откроет модальное
 * окно загрузки работы, если нет, то модальное окно авторизации.
 */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import AuthModal from "../Auth/AuthModal";
import UploadWizard from "../Upload/UploadWizard";

import { works, battles } from "../../shared/constants/pages";
import { connect } from "react-redux";
import { setStoreWorkChanged } from "./../../redux/actions/Actions";

function ToggleModal(props) {
    const {
        storeAuth,
        setStoreWorkChanged,
        storeWorkChanged,
        storeBattle
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [loggBtn, setLoggBtn] = useState(true);
    const [successUploaded, setSuccessUploaded] = useState(false);

    if (isOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body?.style.removeProperty("overflow");;
    }

    useEffect(() => {
        if (loggBtn) {
            //Если была нажата кнопка "вход" и успешно проведена
            //авторизация, то после неё не будет появляться визард
            //загрузки работы.
            setIsOpen(false);
        }
    }, [storeAuth]);

    function closeModal(e) {
        if (e.target.tagName !== "SECTION") return;

        setIsOpen(false);
    }

    return (
        <div className="headerButtons">
            {storeAuth.status === "Logged" &&
                <div className="userInfo flexrow">
                    <a href={storeAuth?.user?.site} target="_blank">
                        <img
                            src={storeAuth?.user?.avatar}
                            className="thumbnail"
                        />
                    </a>
                    <a target="_blank" href={storeAuth?.user?.site} className="username">
                        {storeAuth?.user?.name}
                    </a>
                </div>
            }
            {!props.battlesPage &&
                props.isHeader &&
                (storeBattle.battleStageId === 2 || 
                storeBattle.battleStageId === 4) &&
                (
                    <a
                        className="button sendButton"
                        onClick={() => {
                            setIsOpen(true);
                            setLoggBtn(false);
                        }}
                    >
                        <span>Отправить работу</span>
                    </a>
                )}
            {!props.isHeader && ( //этот случай рассматривается, если кнопка находится в компоненте Battles
                <Link
                    to={props.battleStageId === 6 ? works : battles}
                    onClick={
                        props.battleStageId === 6
                            ? props.clickBattle
                            : () => {
                                props.clickBattle();
                                setIsOpen(true);
                                setLoggBtn(false);
                            }
                    }
                    className={`button ${props.battleStageId === 6 
                        ? "battleEnd" 
                        : "battleNotEnd"
                        }`}
                >
                    <p>
                        {props.battleStageId === 6
                            ? "Смотреть результаты"
                            : "Отправить работу"}
                    </p>
                </Link>
            )}
            {props.isHeader && (
                <a
                    className="button logButton"
                    onClick={
                        storeAuth.status === "Logged"
                            ? props.logout
                            : () => {
                                setIsOpen(true);
                                setLoggBtn(true);
                            }
                    }
                >
                    {storeAuth.status === "Logged" 
                        ? "Выйти" 
                        : "Войти"
                    }
                </a>
            )}
            {storeAuth.status === "Logged" ? (
                !successUploaded
                    ?
                    <UploadWizard
                        outSideClose={(e) => closeModal(e)}
                        isOpen={isOpen}
                        closeBtn={
                            <button
                                className="exitBtn"
                                onClick={() => setIsOpen(false)}
                            ></button>
                        }
                        successUploaded={() => setSuccessUploaded(true)}
                    />
                    :
                    ReactDOM.createPortal(
                        <section className="wizardWrapper">
                            <div className="successModal">
                                Работа успешно отправлена!
                                <button
                                    onClick={() => {
                                        setStoreWorkChanged(!storeWorkChanged);
                                        setIsOpen(false);
                                        setSuccessUploaded(false);
                                    }}
                                >
                                    Ок
                                </button>
                            </div>
                        </section>,
                        document.body
                    )
            ) : (
                <AuthModal
                    outSideClose={(e) => closeModal(e)}
                    isItBtnSend={true}
                    isOpen={isOpen}
                    loggBtn={loggBtn}
                />
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    storeAuth: state.reducer.storeAuth,
    storeWorkChanged: state.reducer.storeWorkChanged,
    storeBattle: state.reducer.storeBattle,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreWorkChanged: (workChanged) =>
        dispatch(setStoreWorkChanged(workChanged)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleModal);
