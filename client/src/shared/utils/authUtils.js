import axios from "axios";

import store from "reduxFolder/store/Store";
import { getAuth } from "reduxFolder/actions/AjaxActions";

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

export function isValidSite(site) {

    let validSites = [/^https:\/\/vk.com\/[\w]/, /^https:\/\/instagram.com\/[\w]/];

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
    }  

    if (props.formType === "LOGIN") {

        axios({
            url: loginURL,
            data: formData,
            method: "POST",
        }).then(
            (res) => {
                if (res.status === 200) {
                    store.dispatch(getAuth());
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

        let prevSite = formData.get("site");
        let protocol = "https://";

        if (prevSite.match(/^http:\/\//)) 
            formData.set("site", prevSite.replace(/^http:\/\//, protocol));
        else if (!prevSite.match(/^https:\/\//))
            formData.set("site", protocol + prevSite);

        let site = formData.get("site");

        if (!isValidSite(site)) {

            setNotice({
                show: true,
                isError: true,
                text: "Введён некорректный адрес соцсети. Пример: vk.com/имя_пользователя"
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