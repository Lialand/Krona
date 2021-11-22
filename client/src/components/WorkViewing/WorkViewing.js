/**
 * Компонент получает данные работы, на которую перешёл
 * пользователь, и её оценки.
 */

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";

import {
    getPreviewImageURL,
    getWorkImageURL,
} from "../../shared/utils/userImageUtils";
import getWinner from "../../shared/utils/getWinner";
import findWorkWithId from "../../shared/utils/findWorkWithIdUtils";
import { work_viewing } from "../../shared/constants/pages"

import WorkViewingItem from './WorkViewingItem';
import WorkNotFoundError from "../Errors/WorkNotFoundError";
import { 
    setStoreWorksViewing,
    setStoreWorkId
} from '../../redux/actions/Actions';

import "./WorkViewing.scss";

function WorkViewing(props) {

    const { 
        storeWorksViewing,
        storeWorkId,
        setStoreWorksViewing,
        setStoreWorkId,
        storeBattle,

        worksData,
        worksStart,
        resultsData,
    } = props;

    const [work, setWork] = useState(null);
    const [workArrNumber, setWorkArrNumber] = useState(null);
    const [oldVersion, setOldVersion] = useState(false);
    const [isLoadedImage, setIsLoadedImage] = useState(false);
    const [workNotFound, setWorkNotFound] = useState(false);

    const { workId } = useParams();
    const history = createBrowserHistory();
    const { pathname } = useLocation();

    //Функция для пролистывания работ назад
    function goPrevious() {

        setOldVersion(false);
        setIsLoadedImage(false);
        setWork(storeWorksViewing[workArrNumber - 1]);
        setStoreWorkId(storeWorksViewing[workArrNumber - 1].id);
        if (workArrNumber !== 0) {
            setWorkArrNumber(workArrNumber - 1);
        }
    }

    //Функция для пролистывания работ вперёд
    function goNext() {

        setOldVersion(false);
        setIsLoadedImage(false);
        setWork(storeWorksViewing[workArrNumber + 1]);
        setStoreWorkId(storeWorksViewing[workArrNumber + 1].id);
        if (workArrNumber !== storeWorksViewing.length) {
            setWorkArrNumber(workArrNumber + 1);
        }
    }
    
    //Функция для переключения работ при помощи стрелок на клавиатуре
    function keyLeaf(e) {

        if ((e.code === "ArrowLeft" || e === "touchPrevious") && workArrNumber > 0) 
            goPrevious();
        else if ((e.code === "ArrowRight" || e === "touchNext") && workArrNumber < storeWorksViewing.length - 1) 
            goNext();
    }

    //Здесь устанавливаются работы для просмотра, если они не были 
    //установлены ранее
    useEffect(() => {

        if (storeWorksViewing.length === 0 && worksData.length !== 0) {
            setStoreWorksViewing(
                worksData.filter(
                    (param) => param.versions.length !== 0
                ),
            );
            setStoreWorkId(+workId);
        }
    }, [worksStart]);

    //Здесь устанавливается просматриваемая работа
    useEffect(() => {

        if (storeWorkId !== null) {
            history.replace(pathname.replace(work_viewing+workId, work_viewing+(storeWorkId)));//Выставляет в адресной строке id просматриваемой работы
        }
        if (!workArrNumber && storeWorksViewing.length !== 0 && storeWorkId) {
            if (!findWorkWithId(storeWorksViewing, storeWorkId)?.work) {
                setWorkNotFound(true);
            } else {
                setWork(findWorkWithId(storeWorksViewing, storeWorkId)?.work);
                setWorkArrNumber(findWorkWithId(storeWorksViewing, storeWorkId)?.workArrNumber);
            }
        }
    }, [storeWorkId]);

    useEffect(() => {

        //Для корректной работы пролистывания работ с клавиатуры
        if (workArrNumber !== null && window.onkeydown !== "function") 
            window.onkeydown = e => keyLeaf(e);

        //Для сброса скролла при перелистывании работ
        setIsLoadedImage(true);
        if (isLoadedImage) {
            scrollTo(0, 0);
        }

        return () => window.onkeydown = null;
    }, [workArrNumber]);

    //Блок кода для работы перелистывания работ
    let startEvent = null;
    let moveEvent = null;
    
    function leafTouch() {

        let touchValue = moveEvent.touches[0].pageX - startEvent.touches[0].pageX;

        if (touchValue > 80) keyLeaf("touchPrevious");
        else if (touchValue < -80) keyLeaf("touchNext");

        startEvent, moveEvent = null;

    }
    function handleTouchStart(e) {
        startEvent = e;
    }
    function handleTouchMove(e) {
        if (startEvent) 
            moveEvent = e;
    }
    function handleTouchEnd(e) {
        if (moveEvent) 
            leafTouch();
    }
    ///////////////////////

    if (workNotFound) 
        return <WorkNotFoundError />
    else if (!work) 
        return <></>
    return (
        <WorkViewingItem 
            image = {(isLoadedImage || scrollY === 0) 
                ?
                getWorkImageURL(
                oldVersion
                    ? work.versions[work.versions.length - 1]?.authorMockupURL 
                    : work.versions[0]?.authorMockupURL
                )
                :
                ""}
            startImageTouch = {e => handleTouchStart(e)}
            moveImageTouch = {e => handleTouchMove(e)}
            endImageTouch = {e => handleTouchEnd(e)}
            oldVersion={() => {setOldVersion(true); setIsLoadedImage(true);}}
            newVersion={() => {setOldVersion(false); setIsLoadedImage(true);}}
            buttonOldChanged={oldVersion}
            work={work}
            isItFirstWork={workArrNumber === 0}
            isItLastWork={workArrNumber === storeWorksViewing.length - 1}
            previousWork={goPrevious}
            nextWork={goNext}
            onlyVersion={work.versions.length === 1}
            isBest={getWinner(resultsData.prizes, work.id).isWinner}
            keyLeaf={e => keyLeaf(e)}
            
            place={getWinner(resultsData.prizes, work.id)?.prizeName()}
            placeImage={"/"+getWinner(resultsData.prizes, work.id)?.prizeImage()}
            placeValue={resultsData?.worksMap?.get(work.id)}
            placeMaxValue={resultsData?.works?.length}
            workId={storeWorkId}
            authorComment={
                oldVersion
                    ? work.versions[work.versions.length - 1]?.authorComment 
                    : work.versions[0]?.authorComment
            }

            battleName={storeBattle.name}
            battleDate={storeBattle.startDate}
        />
    )
        
}

const mapStateToProps = (state) => ({
    storeWorkId: state.reducer.storeWorkId,
    storeWorksViewing: state.reducer.storeWorksViewing,
    storeBattle: state.reducer.storeBattle,

    worksData: state.ajaxReducer.worksData,
    worksStart: state.ajaxReducer.worksStart,
    resultsData: state.ajaxReducer.resultsData,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreWorksViewing: (works) => dispatch(setStoreWorksViewing(works)),
    setStoreWorkId: (workId) => dispatch(setStoreWorkId(workId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkViewing);