import React from "react";
import "./PrizeElement.scss";

export default function PrizeElement(props) {
    return (
        <div className="containerPrize">
            <div className="placeCircle">
                <div className="placeCircleNumber">{props.place}</div>
                <div className="place">место</div>
            </div>
            <div className="placeText">{props.text}</div>
        </div>
    );
}
