import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { connect } from "react-redux";

import Notice from "../../Auth/Notice/Notice";
import MessageModal from "../MessageModal/MessageModal";
import { activate, restore } from "../../../shared/constants/pages";
import { activateAccountURL } from "../../../shared/constants/URLs";
import { getActivation } from "../../../redux/actions/AjaxActions";

import "./RestoreAccount.scss";

function RestoreAccount(props) {

    const { 
        activationError,
        getActivation
    } = props;

    //Гет-параметры: логин и вторая часть ключа активации
    const { search, pathname } = useLocation(); 

    const [valueInput, setValueInput] = useState("");
    const [prompt, setPrompt] = useState("");
    const [urlParams, setUrlParams] = useState(restore);
    const [isError, setIsError] = useState(false);
    const [params, ] = useState({
        login: search?.split("login=")[1]?.split("&")[0],
        keyPart2: search?.split("part2=")[1]
    });

    //Блок кода нужен для закрытия сообщения об ошибке
    function closeModal(e) {

        if (e.target.tagName !== "SECTION") 
            return;

        setIsError(false);
    }
    /////////////////////////////////

    function checkFields() {

        if (valueInput.length === 0) {
            setPrompt("Заполните поля");
        } else {
            getActivation(activateAccountURL);

            if (activationError !== "")
                setIsError(true);
            else
                setUrlParams({
                    pathname: activate, 
                    search: `email=${params.login}&activationKey=${valueInput+params.keyPart2}`, 
                    state: {prevPath: pathname}
                })
        }
    }

    if (search === "")
        return (
            <section className="restore">
                <h1 className="restoreHeading">Нет параметров в url</h1>
            </section>
        )
    return (
        <section className="restore">
            <img src="/assets/images/restore-pic.png" />
            <h1 className="restoreHeading">Активация страницы через соц сети</h1>
            <div className="inputGroup">
                <p className="prompt">Введите ключ активации *</p>
                <input required name="text" type="text" className="inputKey" onChange={e => setValueInput(e.target.value)} value={valueInput} />
                {prompt !== "" && 
                    <Notice 
                        text={prompt} 
                        closeNotice={() => setPrompt("")}
                        isError={true}
                    />
                }
            </div>
            <Link className="enterbutton" onClick={checkFields} to={urlParams}>
                Активировать
            </Link>
            {isError && 
                <MessageModal 
                    text="Произошла ошибка активации аккаунта"
                    description="Скорее всего вы ввели некорректный код активации."
                    closeModal={() => setIsError(false)} 
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

export default connect(mapStateToProps, mapDispatchToProps)(RestoreAccount);