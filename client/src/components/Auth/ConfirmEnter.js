import React from "react";

const buttonTextType = formType => {
    
    if (formType === "RESTORE_PASSWORD" || formType === "RESTORE_ACCOUNT") {
        return "Отправить"
    } else if (formType === "REGISTRATION") {
        return "Зарегистрироваться"
    } else {
        return "Войти"
    }

}

export default function ConfirmEnter(props) {

    return (
        <div className={props.formType === "REGISTRATION" ? "confirmEnter registration" : "confirmEnter"}>
            <button type="button" onClick={props.sendForm} className={props.agreement || props.formType !== "REGISTRATION" ? "enterbutton" : "enterbutton blocked"} id="login">
                {buttonTextType(props.formType)}
            </button>
            {props.formType === "LOGIN" && 
            <div className="checkbox">
                <input className="checkboxInput" type="checkbox" name="rememberme" id="rememberme" />
                <label htmlFor="rememberme">
                    <p className="checkboxText">Запомнить меня</p>
                </label>
            </div>
            }
            {props.formType === "REGISTRATION" && 
            <div className="checkbox">
                <input name="agreement" id="agreement" type="checkbox" onChange={props.setAgreement} className="checkboxInput" defaultChecked />
                <label htmlFor="agreement">
                    <p className="checkboxText">
                        Согласен с публикацией моих работ на сайте и с&nbsp;
                        <a target="_blank" className="agreementLink" href="https://drive.google.com/file/d/1JNeVQZmckk6fI3QL990PNWDKe2dlKw-T/view">
                            политикой обработки персональных данных
                        </a>
                        , ознакомлен с&nbsp;
                        <a target="_blank" className="agreementLink" href="https://drive.google.com/file/d/14i9Dj_nYHYseD6K2P971QCQcRQUhW5gZ/view">
                            условиями проведения конкурса
                        </a>
                    </p>
                </label>
            </div>
            }
        </div>
    )
}