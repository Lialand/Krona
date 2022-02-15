import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { connect } from "react-redux";

import AuthModal from "../Auth/AuthModal";
import MessageModal from "../Restore/MessageModal/MessageModal";
import { activateURL } from "constants/URLs";
import { getActivation } from "reduxFolder/actions/AjaxActions";

import "./Activate.scss";

function Activate(props) {

    const {
        getActivation,
        activationData,
        activationError
    } = props;
    const [notice, setNotice] = useState({
        isError: false,
        type: "",
        show: false,
        text: ""
    });

    const { search, state } = useLocation(); //Гет-параметры: емейл и ключ активации
    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);

    useEffect(() => {

        if (search !== "") {
            getActivation(activateURL+search);
        }

    }, []);

    if (search === "")
        return (
            <section className="activate">
                <h1 className="activateHeading">Неверный URL</h1>
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
            <AuthModal 
                close={() => setIsOpenAuthModal(false)}
                show={isOpenAuthModal}
                notice={notice}
                setNotice={setNotice}
            />
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