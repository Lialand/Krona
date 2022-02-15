import axios from "axios";

import store from "reduxFolder/store/Store";
import { getAuth } from "reduxFolder/actions/AjaxActions";

import { 
    loginURL, 
    registerURL, 
    startRestorePswURL
} from "../constants/URLs";
import { 
    success, 
    error 
} from "../constants/texts";
import { loginValid } from "../constants/validValues";

function isValidSymbols(formData, setHint) {

    for (let field of formData.entries()) {

        if (/\s/.test(field[1]) || field[0] === "login" && !loginValid.test(field[1])) {
            setHint(field[0]);
            return false;
        } 
    }
    return true;
}

function isEmptyFields(formData) {

    for (let field of formData.entries()) {

        if (
            field[1].length === 0 &&
            field[0] !== "name" 
        ) {
            return true;
        }
    }
    
    return false;
}

export function isValidSite(site) {

    let validSites = [/^https:\/\/vk.com\/[\w]/, /^https:\/\/instagram.com\/[\w]/];

    return !!validSites.filter(item => site.match(item)).length;
}

export function sendForm(form, props, setHint) {

    let formData = new FormData(form.current);
    let login = formData.get("login");
    if (login) 
        formData.set("login", login.trim().toLowerCase());
    let username = formData.get("username");
    if (username)
        formData.set("username", username.trim().toLowerCase());

    const { 
        setNotice, 
        formType,
        closeModal,
        redirectOnMain
    } = props;

    if (isEmptyFields(formData)) {
        setNotice({
            show: true,
            isError: true,
            text: error.emptyFields
        });
        return;
    }  

    if (formType === "LOGIN") {

        axios({
            url: loginURL,
            data: formData,
            method: "POST",
        }).then(
            (res) => {
                if (res.status === 200) {
                    store.dispatch(getAuth());
                    if (redirectOnMain) {
                        window.location.href = window.location.origin;
                    }
                    closeModal();
                }
                else {
                    console.log(res);
                }
            },
            (err) => {
                setNotice({
                    show: true,
                    isError: true,
                    text: err.response.data.message
                });
            }
        );  

    } else if (formType === "REGISTRATION") {

        let prevSite = formData.get("site");
        let protocol = "https://";

        if (prevSite.match(/^http:\/\//)) 
            formData.set("site", prevSite.replace(/^http:\/\//, protocol));
        else if (!prevSite.match(/^https:\/\//))
            formData.set("site", protocol + prevSite);

        let site = formData.get("site");

        if (!isValidSymbols(formData, setHint))
            return;
        if (!isValidSite(site)) {

            setNotice({
                show: true,
                isError: true,
                text: error.social
            });
            return;
        }

        axios({
            url: registerURL,
            data: formData,
            method: "POST",
        }).then(
            (res) => {
                setNotice({
                    show: true,
                    isError: false,
                    text: success.reg
                });
            },
            (err) => {
                setNotice({
                    show: true,
                    isError: true,
                    text: err.response.data.message
                });
            }
        );

    } else if (formType === "RESTORE_PASSWORD") {

        axios({
            url: startRestorePswURL,
            data: formData,
            method: "POST",
        }).then(
            (res) => {
                setNotice({
                    show: true,
                    isError: false,
                    text: success.restore_psw
                });
            },
            (err) => {
                setNotice({
                    show: true,
                    isError: true,
                    text: err.response.data.message
                });
            }
        );

    }
}