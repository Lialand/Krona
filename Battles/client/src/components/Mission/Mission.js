import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import ReactHelmet from "../SEO/ReactHelmet";

import "./Mission.scss";

function Mission(props) {

    const { 
        battleDetailedData,
        storeBattle
    } = props;

    const mission = useRef(null);
    const terms   = useRef(null); 
    const prizes  = useRef(null);

    useEffect(() => {
        if (typeof battleDetailedData?.target === "string") {
            mission.current.innerHTML = battleDetailedData.target;
            terms.current.innerHTML = battleDetailedData.conditions;
            prizes.current.innerHTML = battleDetailedData.prizes;
        }
    }, [battleDetailedData]);

    if (!storeBattle.name)
        return <></>
    return (
        <section className="contentText">
            <ReactHelmet isMissionPage={true} battleName={storeBattle.name} battleDate={storeBattle.startDate} />
            <section className="mission" id="mission" ref={mission} />
            <section className="terms" id="terms" ref={terms} />
            <section className="prizes" id="prizes" ref={prizes} />
        </section>
    );

}

const mapStateToProps = (state) => ({
    battleDetailedData: state.ajaxReducer.battleDetailedData,
    storeBattle: state.reducer.storeBattle
});

export default connect(mapStateToProps, null)(Mission);
