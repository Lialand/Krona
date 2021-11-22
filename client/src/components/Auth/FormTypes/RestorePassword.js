import React from "react";

export default function RestorePassword(props) {

    const {
        enterBtn
    } = props;

    return (
        <div className="inputGroup">
            <p className="inputInfo">E-mail *</p>
            <input
                name="email"
                className="inputfield necessarily"
                type="e-mail"
                onKeyDown={enterBtn}
            />
        </div>
    )
}