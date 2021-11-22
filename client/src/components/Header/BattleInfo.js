import React from "react";

function BattleInfo(props) {

    return (
        <div className="battleInfo" style={props.isMobile ? {backgroundImage: `url(${props.headerImage})`} : null}>
            <h1 className="name">
                {props.isMobile ? props.name : `Баттл "${props.name}"`}
            </h1>
            <div className="dateStatus">
                {props.startDate}-{props.finishDate}
                <div className="status">{props.status}</div>
            </div>
        </div>
    )
}

export default BattleInfo;
