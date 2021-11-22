/**
 * Компонент отображает все баттлы, получив данные с сервера.
 */

import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import ItemBattle from "./ItemBattle";
import ReactHelmet from "../SEO/ReactHelmet";

import getGridColumns from "../../shared/utils/getGridColumns";
import checkBattleStage from "../../shared/utils/checkBattleStage";
import formatDate from "../../shared/utils/formatDateUtils";
import declentionWord from "../../shared/utils/declensionWordUtil";
import {
    setStoreBattle,
    setStoreScrollWorksValue,
    setStoreScrollResultsValue,
    setStoreFilteredWorks,
} from "../../redux/actions/Actions";
import { getBattles, getResults } from "../../redux/actions/AjaxActions";

import "./Battles.scss";

function Battles(props) {

    const [battles, setBattles] = useState([]);
    const [gridWidth, setGridWidth] = useState(0);

    const gridBattles = useRef(null);

    const {
        storeFilteredBattles,
        setStoreBattle,
        setStoreScrollWorksValue,
        setStoreScrollResultsValue,
        setStoreFilteredWorks,

        getBattles,
        battlesData,
        battlesError,
        getResults
    } = props;

    //Функция сбрасывает все скроллы и фильтр
    useEffect(() => {

        setStoreScrollWorksValue(0);
        setStoreScrollResultsValue(0);
        // getResults("zeroing");
        setStoreFilteredWorks([]);
        
    }, []);

    //Функция устанавливает необходимые для просмотра баттлы
    useEffect(() => {
        if (storeFilteredBattles.length !== 0) {
            setBattles(storeFilteredBattles);
        } else if (battlesData.length !== 0) {
            setBattles(battlesData);
        }
    }, [battlesData, storeFilteredBattles]);

    //Блок кода ниже используется для получения ширины грид-области
    const getWidth = () => {
        if (gridBattles.current !== null) {
            setGridWidth(gridBattles.current?.offsetWidth);
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

    if (battles.length === 0) 
        return <></>;
    else if (battlesError !== "")
        return <h4 style={{ color: "red" }}>Ошибка при загрузке баттлов</h4>;
    return (
        <section className="contentBattles" ref={gridBattles} style={{gridTemplateColumns: getGridColumns(gridWidth, battles)}}>
            <ReactHelmet isBattlesPage={true} />
            {battles.length !== 0 &&
                battles.map((param) => {
                    let date = formatDate(param.startDate, param.finishDate, true);

                    return (
                        <ItemBattle
                            name={param.name}
                            key={"Battle_" + param.id}
                            cover={"/"+param.battleImageURL}
                            startDate={date.startDate}
                            finishDate={date.finishDate}
                            status={checkBattleStage(param.battleStageId)}
                            stageID={param.battleStageId}
                            worksCount={declentionWord(param.worksCount)}
                            category={param.category.name}
                            battleId={param.id}
                            clickBattle={() => {
                                setStoreBattle(param);
                            }}
                            
                            users={param.users.top} 
                            usersCount={param.users.count}
                        />
                    );
                })}
        </section>
    );
}

const mapStateToProps = (state) => ({
    storeBattle: state.reducer.storeBattle,
    storeFilteredBattles: state.reducer.storeFilteredBattles,

    battlesData: state.ajaxReducer.battlesData,
    battlesStart: state.ajaxReducer.battlesStart,
    battlesError: state.ajaxReducer.battlesError,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreBattle: (battle) => dispatch(setStoreBattle(battle)),
    setStoreFilteredWorks: (filteredWorks) => dispatch(setStoreFilteredWorks(filteredWorks)),
    setStoreScrollWorksValue: (scrollWorksValue) =>
        dispatch(setStoreScrollWorksValue(scrollWorksValue)),
    setStoreScrollResultsValue: (scrollResultsValue) =>
        dispatch(setStoreScrollResultsValue(scrollResultsValue)),

    getBattles: (battle) => dispatch(getBattles(battle)),
    getResults: (results) => dispatch(getResults(results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Battles);
