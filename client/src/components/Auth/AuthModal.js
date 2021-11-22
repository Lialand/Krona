/**
 * Компонент является модальным окном авторизации
 */

import React, { useState, useEffect } from 'react';

import AuthForm from './AuthForm';
import AuthHeader from './AuthHeader';
import withReactPortal from '../HOC/withReactPortal';
import { activate, restore_psw } from '../../shared/constants/pages';
import setCloseOnEsc from "../../shared/utils/setCloseOnEsc";

import "./Auth.scss";

//Родительский компонент: Sidebar.js
function AuthModal(props) {

    const [formType, setFormType] = useState("LOGIN");

    useEffect(() => {

        let y = window.scrollY;

        setCloseOnEsc(props.close);
        window.onscroll = () => window.scrollTo(0, y);

        return () => window.onscroll = () => {};
    }, []);

    return ( 
        <section className="bckgrAuthModal" onClick={props.outSideClose}>
            <div className="authModal">
                <AuthHeader 
                    closeModal={props.close}
                    formType={formType}
                />
                <AuthForm    
                    closeModal={props.close}
                    formType={formType}
                    setFormRestorePassword={() => setFormType("RESTORE_PASSWORD")}
                    setFormRestoreAccount={() => setFormType("RESTORE_ACCOUNT")}
                    setFormRegistration={() => setFormType("REGISTRATION")}
                    setFormLogin={() => setFormType("LOGIN")}
                    redirectOnMain={location.pathname === activate || location.pathname === restore_psw}
                />
            </div>
        </section>
    )
}

export default withReactPortal(AuthModal);