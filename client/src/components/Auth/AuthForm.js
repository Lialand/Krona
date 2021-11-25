/**
 * Данный компонент является частью модального окна авторизации. Здесь располагаются
 * поля ввода логина и пароля при входе или логина, пароля и е-мейла при регистрации.
 *
 * Также отсюда посылается запрос на вход/регистрацию.
 */

import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
    setStoreAuth,
} from "reduxFolder/actions/Actions";

import { sendForm } from "utils/authUtils";

import AuthInputs from "./AuthInputs/AuthInputs";
import AuthFormLow from "./AuthFormLow";
import ConfirmEnter from "./ConfirmEnter";
import Notice from "./Notice/Notice";

function AuthForm(props) {

    const [isActivePassView, setIsActivePassView] = useState(false);
    const [notice, setNotice] = useState({
        isError: false,
        type: "",
        show: false,
        text: ""
    });

    const form = useRef(null);

    function enterBtn(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            sendForm(form, props, setNotice);
        }
    }

    useEffect(() => {

        form.current.reset();
        setNotice({
            isError: false,
            show: false,
            text: ""
        });
    },
    [props.formType]);

    return (
        <form
            ref={form}
            onSubmit={() => false}
            className="authForm"
        >
            <AuthInputs 
                setIsActivePassView={() => setIsActivePassView(state => !state)}
                isActivePassView={isActivePassView}
                enterBtn={(e) => enterBtn(e)}
                formType={props.formType}
                error={notice}
            />
            <div className="flexcolumn">
                {notice.show && 
                    <Notice 
                        text={notice.text} 
                        isError={notice.isError} 
                        closeNotice={() => setNotice({show: false})} 
                    />
                }
                {/* {auth[2] && <p id="activationKey" className="unvisible"></p>}
                <div id={auth[1]} className={vision}>
                    <p>{description}</p>
                </div> */}
                <ConfirmEnter 
                    formType={props.formType}
                    sendForm={() => sendForm(form, props, setNotice)}
                />
            </div>
            {!props.redirectOnMain &&
            <AuthFormLow 
                formType={props.formType}
                setFormRestorePassword={props.setFormRestorePassword}
                setFormRestoreAccount={props.setFormRestoreAccount}
                setFormRegistration={props.setFormRegistration}
                setFormLogin={props.setFormLogin}
            />
            }
        </form>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setStoreAuth: (auth) => dispatch(setStoreAuth(auth)),
});

export default connect(null, mapDispatchToProps)(AuthForm);
