import React, { useRef, useState } from "react";
import { connect } from "react-redux";

import Notice from "components/Auth/Notice/Notice";
import { getApproveUserSite } from "reduxFolder/actions/AjaxActions";

function ApproveUserSite(props) {

    const { getApproveUserSite } = props;
    const [prompt, setPrompt] = useState({
        isError: false,
        text: "",
        show: false
    });
    const form = useRef(null);

    function sendForm() {

        let formData = new FormData(form.current);
        getApproveUserSite(formData, setPrompt);
    }

    return (
        <>
        <h1 className="adminHeading">Подтверждение соцсети</h1>
        <div>
            <form className="inputs" ref={form}>
                <div className="inputGroup">
                    <p className="prompt">Логин</p>
                    <input
                        name="login"
                        className="inputfield necessarily"
                        type="text"
                    />
                </div>
                <div className="inputGroup">
                    <p className="prompt">Соцсеть</p>
                    <input
                        name="site"
                        className="inputfield necessarily"
                        type="text"
                    />
                </div>
            </form>
            {prompt.show && 
                <Notice 
                    text={prompt.text} 
                    closeNotice={() => setPrompt({
                        isError: false,
                        text: ""
                    })}
                    isError={prompt.isError}
                />
            }
        </div>
        <button onClick={sendForm} className="enterbutton">
            Подтвердить
        </button>
        </>
    )
} 

const mapDispatchToProps = (dispatch) => ({
    getApproveUserSite: (formData, setPrompt) => dispatch(getApproveUserSite(formData, setPrompt)),
})

export default connect(null, mapDispatchToProps)(ApproveUserSite);