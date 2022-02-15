import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Redirect, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import ModalResults from "../ModalResults/ModalResults";
import ReactHelmet from "../SEO/ReactHelmet";

import {
    getPreviewImageURL,
    getWorkImageURL,
} from "utils/userImageUtils";
import { work_viewing, works, battleWithParamURL } from "constants/pages";
import getWinner from "utils/getWinner";
import { getResults } from "reduxFolder/actions/AjaxActions";

import {
    setStoreWorkId,
    setStoreWorksViewing,
    setStoreScrollResultsValue,
} from "reduxFolder/actions/Actions";

import "./Results.scss";

function getProgress(value, maxValue) {
    return Math.round(value / maxValue * 87);
}

function Results(props) {

    const [openModal, setOpenModal] = useState({
        isOpen: false, 
        workId: null,
        placeValue: null,
        placeMaxValue: null
    });

    const { 
        setStoreWorkId,
        setStoreWorksViewing,
        storeBattle,
        setStoreScrollResultsValue,
        storeScrollResultsValue,

        getResults,
        resultsData,
        resultsError,
        resultsStart
    } = props;

    const isMobile = useMediaQuery({ maxWidth: 780 })
    const { battleId } = useParams();
    const { pathname } = useLocation();

    useEffect(() => {

        if (resultsData.length === 0 && storeBattle.id) 
            getResults(storeBattle.id);

    }, [storeBattle]);

    useEffect(() => {

        if (storeScrollResultsValue && !resultsStart) 
            window.scrollBy(0, storeScrollResultsValue - 75);

    }, [storeScrollResultsValue, resultsStart]);

    function closeModal(e) {
        if (e?.target.tagName !== "SECTION") 
            return;

        setOpenModal({
            isOpen: false, 
            workId: null,
            placeValue: null,
            placeMaxValue: null
        });
    }

    if (storeBattle?.name && storeBattle?.battleStageId !== 6) 
        return <Redirect to={battleWithParamURL(battleId)+works} />;
    else if (resultsStart || resultsError !== "") 
        return <></>;
    return (
        <table className="resultsTable">
            <ReactHelmet isResultsPage={true} battleName={storeBattle.name} battleDate={storeBattle.startDate} />
            <thead>
                <tr>
                    <th className="resultsTHead username">Участник</th>
                    <th className="resultsTHead work">Работа</th>
                    <th className="resultsTHead place">Место</th>
                    <th className="resultsTHead score">Общий итоговый балл</th>
                </tr>
            </thead>
            <tbody>
                {
                resultsData?.works?.map((param, key) => 
                param?.grade !== 0 && param?.grade !== null &&
                <tr key={`Table_of_results_stroke:_${key}`}>
                    <td className="resultsTBody username">
                        <a
                            className="thumbnailLink" 
                            href={param?.author?.site} 
                            target="_blank"
                        >
                            <img
                                src={"/"+param?.author?.avatar}
                                className="thumbnail"
                            />
                        </a>
                        <span className="resultsNumber">
                            {key+1}
                        </span>
                        <a 
                            className="userLink" 
                            href={param?.author?.site}
                            target="_blank"
                        >{param?.author?.name || param?.author?.login}</a>
                    </td>
                    {isMobile && 
                    <td className="resultsTBody place">
                        {getWinner(resultsData.prizes, param.id).isWinner && 
                        getWinner(resultsData.prizes, param.id).prizeImage() !== null && 
                        <>
                            <img className="placeImage" src={"/"+getWinner(resultsData.prizes, param.id)?.prizeImage()} />
                            <p className="placeText">{getWinner(resultsData.prizes, param.id)?.prizeName()}</p>
                        </>}
                    </td>
                    }
                    <td className="resultsTBody work">
                        <Link
                            to={{pathname: battleWithParamURL(+battleId)+work_viewing+param?.id+"/", state: {prevPath: pathname}}} 
                            onClick={() => {
                                setStoreScrollResultsValue(scrollY);
                                setStoreWorkId(param?.id); 
                                setStoreWorksViewing(
                                    resultsData?.works?.filter(
                                        (param) => param.versions.length !== 0
                                    )
                                );
                            }}
                            className="workItem" style={{
                                backgroundImage: `url(${getPreviewImageURL(param?.versions[0]?.authorMockupURL)}`
                            }}
                        >
                        </Link>
                    </td>
                    {!isMobile && 
                    <td className="resultsTBody place">
                        {getWinner(resultsData.prizes, param.id).isWinner && 
                        getWinner(resultsData.prizes, param.id).prizeImage() !== null && 
                        <>
                            <img className="placeImage" src={"/"+getWinner(resultsData.prizes, param.id)?.prizeImage()} />
                            <p className="placeText">{getWinner(resultsData.prizes, param.id)?.prizeName()}</p>
                        </>}
                    </td>
                    }
                    <td className="resultsTBody score">
                        <div 
                            className="scoreItem"
                            onClick={() => setOpenModal({
                                isOpen: true, 
                                workId: param?.id,
                                placeValue: resultsData?.worksMap?.get(param.id),
                                placeMaxValue: resultsData?.works?.length
                            })}
                        >
                            <div className="scoreItemProgress" style={{transform: `rotate(${20+getProgress(10, 10)}deg)`}} />
                            <div className="scoreItemIn">
                                {param?.grade}
                            </div>
                        </div>
                    </td>
                </tr>
                )
            }
            <ModalResults 
                workId={openModal.workId} 
                outSideClose={e => closeModal(e)}
                placeValue={openModal.placeValue}
                placeMaxValue={openModal.placeMaxValue}
                show={openModal.isOpen}
                closeModal={() => setOpenModal({
                    isOpen: false, 
                    workId: null,
                    placeValue: null,
                    placeMaxValue: null
                })}
            />
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => ({
    storeWorks: state.reducer.storeWorks,
    storeBattle: state.reducer.storeBattle,
    storeScrollResultsValue: state.reducer.storeScrollResultsValue,

    resultsData: state.ajaxReducer.resultsData,
    resultsError: state.ajaxReducer.resultsError,
    resultsStart: state.ajaxReducer.resultsStart,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreWorksViewing: (works) => dispatch(setStoreWorksViewing(works)),
    setStoreWorkId: (workId) => dispatch(setStoreWorkId(workId)),
    setStoreScrollResultsValue: (scrollResultsValue) => 
        dispatch(setStoreScrollResultsValue(scrollResultsValue)),

    getResults: (battleId) => dispatch(getResults(battleId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Results);