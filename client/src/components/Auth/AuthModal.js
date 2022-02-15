/**
 * Компонент является модальным окном авторизации
 */

import React, { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#render");

import AuthForm from "./AuthForm";
import AuthHeader from "./AuthHeader";
import { activate, restore_psw } from "constants/pages";

import "./Auth.scss";
import "bootstrap/dist/css/bootstrap.min.css";

//Родительский компонент: Sidebar.js
function AuthModal(props) {

    const [formType, setFormType] = useState("LOGIN");

    return ( 
        <Modal 
            isOpen={props.show}
            onRequestClose={props.close}
            className="authModal"
            overlayClassName="bckgrAuthModal"
        >
            <AuthHeader 
                closeModal={props.close}
                formType={formType}
            />
            <AuthForm    
                setNotice={props.setNotice}
                notice={props.notice}
                closeModal={props.close}
                formType={formType}
                setFormRestorePassword={() => setFormType("RESTORE_PASSWORD")}
                setFormRestoreAccount={() => setFormType("RESTORE_ACCOUNT")}
                setFormRegistration={() => setFormType("REGISTRATION")}
                setFormLogin={() => setFormType("LOGIN")}
                redirectOnMain={location.pathname === activate || location.pathname === restore_psw}
            />
        </Modal>
    )
}

export default AuthModal;