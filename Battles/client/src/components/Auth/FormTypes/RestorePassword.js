import React from "react";

export default function RestorePassword(props) {

    const {
        handleOnKeyDown
    } = props;

    return (
        <div className="inputGroup">
            <p className="inputInfo">E-mail *</p>
            <input
                name="email"
                className="inputfield necessarily"
                type="e-mail"
                onKeyDown={handleOnKeyDown}
            />
        </div>
    )
}