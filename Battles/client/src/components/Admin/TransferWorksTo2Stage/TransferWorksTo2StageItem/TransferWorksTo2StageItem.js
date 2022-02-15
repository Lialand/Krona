import React, { useState } from "react";

import "./TransferWorksTo2StageItem.scss";

function TransferWorksTo2StageItem(props) {

    const {
        image,
        chooseWork,
        acceptWork,
        isAcceptWork
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
            <div className="transferWorksBtns">
                <button 
                    className={isAcceptWork ? "acceptWork active" : "acceptWork"} 
                    onClick={acceptWork}
                >Перевести на второй этап
                </button>
            </div>
        </div>
    )
}

export default TransferWorksTo2StageItem;