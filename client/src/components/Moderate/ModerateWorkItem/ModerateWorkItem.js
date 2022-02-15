import React, { useState } from "react";

import "./ModerateWorkItem.scss";

export default function ModerateWorkItem(props) {

    const [activeBtn, setActiveBtn] = useState({
        acceptWork: false,
        rejectWork: false
    });

    const {
        image,
        chooseWork,
        acceptWork,
        rejectWork
    } = props;

    return (
        <div className="contentBlock">
            <div
                className="workLink"
                onClick={chooseWork}
            >
                <img 
                    src={image} 
                    className="image"
                />
            </div>
            <div className="moderBtns">
                <button 
                    className={activeBtn.acceptWork ? "acceptWork active" : "acceptWork"} 
                    onClick={() => {acceptWork(); setActiveBtn({acceptWork: true})}}
                >Принять работу
                </button>
                <button 
                    className={activeBtn.rejectWork ? "rejectWork active" : "rejectWork"} 
                    onClick={() => {rejectWork(); setActiveBtn({rejectWork: true})}}
                >Отклонить работу
                </button>
            </div>
        </div>
    )
}