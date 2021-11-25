import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { connect } from "react-redux";

import AuthModal from "../Auth/AuthModal";
import MessageModal from "../Restore/MessageModal/MessageModal";
import { restore } from "constants/pages";
import { activateURL } from "constants/URLs";
import { getActivation } from "reduxFolder/actions/AjaxActions";

import "./Activate.scss";

function Activate(props) {

    const {
        getActivation,
        activationData,
        activationError
    } = props;

    const { search, state } = useLocation(); //Гет-параметры: емейл и ключ активации

    //Блок кода нужен для контроля открыть/закрыть модального окна авторизации 
    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
    function closeModal(e) {

        if (e.target.tagName !== "SECTION") 
            return;

        setIsOpenAuthModal(false);
    }
    /////////////////////////////////

    useEffect(() => {

        console.log(123);
        if (state?.prevPath !== restore) {
            getActivation(activateURL+search);
        }

    }, []);

    if (search === "")
        return (
            <section className="activate">
                <h1 className="activateHeading">Нет параметров в url</h1>
            </section>
        )
    else if (activationError !== "")
        return (
            <section className="activate">
                <MessageModal 
                    text="Произошла ошибка активации аккаунта"
                    description={activationError}
                    canReturnOnPage={false}
                />
            </section>
        )
    return (
        <section className="activate">
            <img src="/assets/images/activate-pic.png" />
            <h1 className="activateHeading">Ваш аккаунт успешно активирован</h1>
            <p className="accountInfo">Для вашего аккаунта установлен e-mail: <b>{activationData.email}</b></p>
            <p className="accountInfo">Вы можете войти в личный кабинет по логину: <b>{activationData.login}</b></p>
            <button type="button" className="enterbutton" onClick={() => setIsOpenAuthModal(true)}>
                Войти в личный кабинет
            </button>
            {isOpenAuthModal && 
            <AuthModal 
                close={() => setIsOpenAuthModal(false)}
                outSideClose={e => closeModal(e)}
            />
            }
        </section>
    )
}

const mapStateToProps = (state) => ({
    activationData: state.ajaxReducer.activationData,
    activationError: state.ajaxReducer.activationError,
});

const mapDispatchToProps = (dispatch) => ({
    getActivation: (activateUrl) => dispatch(getActivation(activateUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activate);