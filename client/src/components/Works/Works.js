/**
 * Данный компонент отображает "все работы".
 */

import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";

import { getPreviewImageURL } from "../../shared/utils/userImageUtils";
import getGridColumns from "../../shared/utils/getGridColumns";
import getWinner from "../../shared/utils/getWinner";
import { battleWithParamURL, mission } from "../../shared/constants/pages";
import {
    setStoreBattle,
    setStoreWorkId,
    setStoreWorksViewing,
    setStoreScrollWorksValue,
} from "../../redux/actions/Actions";

import "./Works.scss";
import ItemWork from "./ItemWork";
import ReactHelmet from "../SEO/ReactHelmet"

function Works(props) {

    const [isLoadedAllWorks, setIsLoadedAllWorks] = useState(false);
    const [redirect, setRedirect] = useState("");
    const [works, setWorks] = useState([]);
    const [gridWidth, setGridWidth] = useState(0);

    const gridWorks = useRef(null);

    const { battleId } = useParams();

    const {
        storeScrollWorksValue,
        setStoreWorkId,
        setStoreWorksViewing,
        setStoreScrollWorksValue,
        storeBattle,
        storeBattleSwitch,
        storeFilteredWorks,

        worksData,
        worksError,
        resultsData
    } = props;

    useEffect(() => { 
        if (storeBattleSwitch) { //Устанавливается редирект, если произошёл клик на баттл или на строчку "текущий баттл" в сайдбаре
            if (worksData.length === 0 || worksError !== "")
                setRedirect("mission");
            else
                setRedirect("no");
        }
        else {
            setRedirect("no");
        }
    }, [storeBattleSwitch]);

    useEffect(() => {
        if (storeFilteredWorks.length !== 0) {
            setWorks(storeFilteredWorks);
        } else if (worksData.length !== 0) {
            setWorks(worksData);
        }
    }, [worksData, storeFilteredWorks]);

    useEffect(() => {
        if (redirect !== "") 
            setIsLoadedAllWorks(true);
    }, [redirect]);

    useEffect(() => {
        if (storeScrollWorksValue && isLoadedAllWorks) {
            window.scrollBy(0, storeScrollWorksValue - 75);
        }
    }, [storeScrollWorksValue, isLoadedAllWorks]);

    //Блок кода ниже используется для получения ширины грид-области
    const getWidth = () => {
        if (gridWorks.current) {
            setGridWidth(gridWorks.current?.offsetWidth);
        }
    }
    useEffect(() => getWidth)
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

    if (!isLoadedAllWorks || (resultsData.length === 0 && storeBattle.battleStageId === 6)) 
        return <></>;
    else if (redirect === "mission") 
        return <Redirect to={battleWithParamURL(battleId)+mission} />;
    return (
        <section className="contentBattleWorks" ref={gridWorks} style={{gridTemplateColumns: getGridColumns(gridWidth, works)}}>
            <ReactHelmet isWorksPage={true} battleName={storeBattle.name} battleDate={storeBattle.startDate} />
            {
            works.map(
                param =>
                    param.versions[0] && (
                        <ItemWork
                            key={`Work_${param.id}`}
                            workId={param.id}
                            images={getPreviewImageURL(
                                param.versions[0].authorMockupURL
                            )}
                            avatar={"/"+param?.author?.avatar}
                            name={param.author?.name}
                            site={param.author?.site}
                            score={param.grade}
                            likes={param.userLike[0]?.count}
                            versions={param.versions.length}
                            isBest={getWinner(resultsData.prizes, param.id).isWinner}
                            place={getWinner(resultsData.prizes, param.id)?.prizeName()}
                            placeImage={"/"+getWinner(resultsData.prizes, param.id)?.prizeImage()}
                            chooseWork={() => {
                                setStoreScrollWorksValue(scrollY);
                                setStoreWorkId(param.id);
                                setStoreWorksViewing(
                                    works.filter(
                                        (param) => param.versions.length !== 0
                                    )
                                );
                            }}
                        />
                    )
                )
            }
        </section>
    );

}

const mapStateToProps = (state) => ({
    storeWorkChanged: state.reducer.storeWorkChanged,
    storeBattle: state.reducer.storeBattle,
    storeScrollWorksValue: state.reducer.storeScrollWorksValue,
    storeSecondStageWorks: state.reducer.storeSecondStageWorks,
    storeBattleSwitch: state.reducer.storeBattleSwitch,
    storeFilteredWorks: state.reducer.storeFilteredWorks,

    worksData: state.ajaxReducer.worksData,
    worksError: state.ajaxReducer.worksError,
    resultsData: state.ajaxReducer.resultsData,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreBattle: (battle) => dispatch(setStoreBattle(battle)),
    setStoreWorksViewing: (works) => dispatch(setStoreWorksViewing(works)),
    setStoreWorkId: (workId) => dispatch(setStoreWorkId(workId)),
    setStoreScrollWorksValue: (scrollWorksValue) =>
        dispatch(setStoreScrollWorksValue(scrollWorksValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Works);


    // function setLike(num) {
    //     //Здесь посылается запрос на выставление лайка,
    //     //если пользователь авторизован и ещё не
    //     //ставился/был успешно поставлен лайк.
    //     if (accessLike && storeAuth.status === "Logged") {
    //         accessLike = false;

    //         axios
    //             .get(`api/user/work/like/${storeWorks[num].id}`)
    //             .then((response) => response.data)
    //             .then(
    //                 (data) => {
    //                     setWorkForLike(num);
    //                     data.likes ? setLikesCount(data.likes) : setLikesCount(null);
    //                     accessLike = true;
    //                 },
    //                 (err) => {
    //                     if (
    //                         err.response.data.message === "Error: cannot like your own work"
    //                     ) {
    //                         setLikeError("Вы не можете поставить лайк своей работе");
    //                         setTimeout(() => setLikeError(false), 1000);
    //                     } else if (
    //                         err.response.data.message ===
    //                         "Error: battle should be in grade stage"
    //                     ) {
    //                         setLikeError("Баттл должен находиться в стадии оценки");
    //                         setTimeout(() => setLikeError(false), 1000);
    //                     }
    //                 }
    //             );
    //     } else if (!storeAuth) {
    //         setLikeError("Авторизуйтесь, чтобы поставить лайк");
    //         setTimeout(() => setLikeError(false), 2000);
    //     }
    // }