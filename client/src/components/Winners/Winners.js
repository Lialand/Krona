import React, { useEffect, useState, useRef } from 'react';
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";

import {
    getPreviewImageURL,
    getWorkImageURL,
} from "utils/userImageUtils";
import getGridColumns from "utils/getGridColumns"

import WorkItem from "../Works/WorkItem";
import {
    setStoreWorksViewing,
    setStoreWorkId,
} from "reduxFolder/actions/Actions";
import { getResults } from "reduxFolder/actions/AjaxActions";
import { works, battleWithParamURL } from "constants/pages";
import getWinner from "utils/getWinner";

import "./Winners.scss";

function Winners(props) {

    const {
        storeBattle,
        setStoreWorksViewing,
        setStoreWorkId,

        resultsData,
        resultsError,
        resultsStart,
        getResults,
    } = props;
    
    const [gridWidth, setGridWidth] = useState(0);
    const gridWinners = useRef(null);

    const { battleId } = useParams();

    let scrollY;
    window.onscroll = () => (scrollY = pageYOffset);

    useEffect(() => {
        if (resultsData.length === 0) 
            getResults(storeBattle?.id);

        if (resultsError !== "") 
            console.log(resultsError);
        
    }, [storeBattle]);

    //Блок кода ниже используется для получения ширины грид-области
    const getWidth = () => {
        if (gridWinners.current !== null) {
            setGridWidth(gridWinners.current?.offsetWidth);
        }
    }
    useEffect(() => {
        getWidth();
    }, [resultsData])
    useEffect(() => {
        
        window.addEventListener("resize", () => {
            getWidth();
        });

        return () => { 
            window.removeEventListener("resize", () => {
                getWidth();
            });
        }
    }, [])
    //////////////////////

    if (storeBattle?.battleStageId !== 6 && storeBattle.battleStageId) 
        return <Redirect to={battleWithParamURL(battleId)+works} />;
    else if (resultsStart || resultsError !== "" || !storeBattle.battleStageId) 
        return <></>;
    return (
        <section className="results">
            <div className="winnersWorks" ref={gridWinners} style={{gridTemplateColumns: getGridColumns(gridWidth, resultsData?.prizes)}}>
            {
            resultsData?.prizes?.map(
                param =>
                    <div key={param.id} className="winnersWork">
                        <p className="winnerPlace">{`${param?.prizeWork[0]?.battlePrize?.prize?.name} 
                            / ${param?.prizeWork[0]?.battlePrize?.name}`}</p>
                        <WorkItem
                            param={param}
                            image={getPreviewImageURL(param?.versions[0]?.authorMockupURL)}
                            isBest={true}
                            place={getWinner(resultsData.prizes, param.id)?.prizeName()}
                            placeImage={"/"+getWinner(resultsData.prizes, param.id)?.prizeImage()}
                            chooseWork={() => {
                                setStoreWorkId(param.id);
                                setStoreWorksViewing(
                                    resultsData?.prizes?.filter(
                                        (param) => param.versions.length !== 0
                                    )
                                );
                            }}
                        />
                    </div>
            )}
            </div>  
        </section>
    );
};

const mapStateToProps = (state) => ({
    storeBattle: state.reducer.storeBattle,

    resultsData: state.ajaxReducer.resultsData,
    resultsError: state.ajaxReducer.resultsError,
    resultsStart: state.ajaxReducer.resultsStart,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreWorksViewing: (works) => dispatch(setStoreWorksViewing(works)),
    setStoreWorkId: (workId) => dispatch(setStoreWorkId(workId)),

    getResults: (battleId) => dispatch(getResults(battleId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Winners);