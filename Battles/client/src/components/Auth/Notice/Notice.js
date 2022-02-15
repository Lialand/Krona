import React from "react";

import "./Notice.scss";

export default function Notice(props) {
    return (
        <div className={props.isError ? "noticeBlock error" : "noticeBlock success"}>
            <div className="noticeMessage">{props.text}</div>
            <img src="/assets/images/cross-black.svg" onClick={props.closeNotice} className="closeNotice" />
        </div>
    )
}