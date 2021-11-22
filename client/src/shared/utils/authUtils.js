import axios from "axios";

import { 
    loginURL, 
    registerURL, 
    startRestorePswURL, 
    restoreAccountURL 
} from "../constants/URLs";

export function isEmptyFields(formData) {

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

export function isValidSite(formData) {

    let site = formData.get("site");
    let validSites = ["vk.com", "instagram.com"];

    return !!validSites.filter(item => site.match(item)).length;
}

export function sendForm(form, props, setNotice) {

    let formData = new FormData(form.current);
    if (isEmptyFields(formData)) {
        setNotice({
            show: true,
            isError: true,
            text: "Заполните поля"
        });
        return;
    } else if (formData.get("site") && !isValidSite(formData)) {
        setNotice({
            show: true,
            isError: true,
            text: "Введён некорректный адрес соцсети"
        });
        return;
    } 

    if (props.formType === "LOGIN") {

        axios({
            url: loginURL,
            data: formData,
            method: "POST",
        }).then(
            (res) => {
                if (res.status === 200) {
                    props.setStoreAuth({isLogged: true});
                    if (props.redirectOnMain) {
                        window.location.href = window.location.origin;
                    }
                    props.closeModal();
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

    } else if (props.formType === "REGISTRATION") {

        axios({
            url: registerURL,
            data: formData,
            method: "POST",
        }).then(
            (res) => {
                setNotice({
                    show: true,
                    isError: false,
                    text: "Письмо с ссылкой на активацию отправлено вам на почту"
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

    } else if (props.formType === "RESTORE_PASSWORD") {

        axios({
            url: startRestorePswURL,
            data: formData,
            method: "POST",
        }).then(
            (res) => {
                setNotice({
                    show: true,
                    isError: false,
                    text: "Письмо с ссылкой на восстановление пароля отправлено вам на почту"
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

    } else if (props.formType === "RESTORE_ACCOUNT") {

        axios({
            url: restoreAccountURL,
            data: formData,
            method: "POST",
        }).then(
            (res) => {
                setNotice({
                    show: true,
                    isError: false,
                    text: "Вам отправлено письмо на почту. Ожидайте сообщения от администратора в соцсети"
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