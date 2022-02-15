/**
 * Данный компонент является частью модального окна авторизации. Здесь располагаются
 * поля ввода логина и пароля при входе или логина, пароля и е-мейла при регистрации.
 *
 * Также отсюда посылается запрос на вход/регистрацию.
 */

import React, { useState, useRef, useEffect } from "react";

import { sendForm } from "utils/authUtils";
import { loginValid } from "constants/validValues";

import AuthInputs from "./AuthInputs/AuthInputs";
import AuthFormLow from "./AuthFormLow";
import ConfirmEnter from "./ConfirmEnter";
import Notice from "./Notice/Notice";

function blockInput(e, formType, setHint) {

    if (formType === "REGISTRATION") {
        if (/\s/.test(e.key) || e.target.name === "login" && !loginValid.test(e.key)) {
            e.preventDefault();
            setHint(e.target.name);
        } else {
            setHint("");
        }
    }
}

export default function AuthForm(props) {

    const [isActivePassView, setIsActivePassView] = useState(false);
    const [agreement, setAgreement] = useState(true);
    const [hint, setHint] = useState("");

    const form = useRef(null);

    const {
        notice,
        setNotice
    } = props;

    function handleOnKeyDown(e) {

        if (e.keyCode === 13) {
            e.preventDefault();
            sendForm(form, props, setHint);
        } else {
            blockInput(e, props.formType, setHint);
        }
    }

    useEffect(() => {

        setAgreement(true);
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
                handleOnKeyDown={(e) => handleOnKeyDown(e)}
                formType={props.formType}
                error={notice}
                hint={hint}
            />
            <div className="flexcolumn">
                {notice?.show && 
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
                    sendForm={() => agreement || props.formType !== "REGISTRATION" ? sendForm(form, props, setHint) : {}}
                    agreement={agreement}
                    setAgreement={e => setAgreement(e.target.checked)}
                />
            </div>
            {!props.redirectOnMain &&
            <AuthFormLow 
                formType={props.formType}
                setFormRestorePassword={props.setFormRestorePassword}
                setFormRegistration={props.setFormRegistration}
                setFormLogin={props.setFormLogin}
            />
            }
        </form>
    );
}
