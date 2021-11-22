/**
 * Данный компонент отображает меню под хедером,
 * в котором при переключении пунктов задаётся Route
 * при помощи Link. Далее, в зависимости от этих Route,
 * загружаются компоненты в Content.js.
 */

import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import {
    works,
    works_stage2,
    mission,
    results,
    materials,
    winners,
    battleWithParamURL
} from "../../shared/constants/pages";
import { 
    setStoreScrollWorksValue,  
    setStoreScrollResultsValue 
} from "../../redux/actions/Actions";
import { connect } from "react-redux";
import FilterWorks from "./Filters/FilterWorks";

import "./HeaderNav.scss";

function resetScroll(props) {
    const { 
        setStoreScrollWorksValue,
        setStoreScrollResultsValue,
        storeScrollWorksValue,
        storeScrollResultsValue
    } = props;

    if (storeScrollWorksValue !== 0)
        setStoreScrollWorksValue(0);
    if (storeScrollResultsValue !== 0)
        setStoreScrollResultsValue(0);

    scrollTo(0, 0);
    
}

function UserNavigation(props) {
    
    const { pathname } = useLocation();
    const { battleId } = useParams();

    const isMobile = useMediaQuery({maxWidth: 640});

    const {
        storeHideNavigation,
        worksData,
        storeBattle,
        battleDetailedData
    } = props;

    return (
        !storeHideNavigation && (
            <>
                <div className={(pathname === battleWithParamURL(battleId)+works || pathname === battleWithParamURL(battleId)+winners || pathname === battleWithParamURL(battleId)+works_stage2) ? "emptyNav works" : "emptyNav main"} />
                <nav id="headerNav" className={(pathname === battleWithParamURL(battleId)+works || pathname === battleWithParamURL(battleId)+winners) ? "headerNav moveSidebar works" : "headerNav moveSidebar"}>
                    <ul className={`headerNavUl`}>
                        <li><NavLink to={battleWithParamURL(battleId)+mission} onClick={() => resetScroll(props)} activeClassName="active">Задание</NavLink ></li>
                        {battleDetailedData.materials !== null && 
                            <li><NavLink to={battleWithParamURL(battleId)+materials} onClick={() => resetScroll(props)} activeClassName="active">Материалы</NavLink ></li>}
                        {worksData.length !== 0 && 
                            <li><NavLink to={battleWithParamURL(battleId)+works} className={pathname === battleWithParamURL(battleId)+works_stage2 || pathname === battleWithParamURL(battleId)+winners ? "active" : ""} onClick={() => resetScroll(props)} activeClassName="active">{isMobile ? "Работы" : `Работы (${worksData?.length})`}</NavLink ></li>}
                        {storeBattle.battleStageId === 6 &&
                            <li><NavLink to={battleWithParamURL(battleId)+results} onClick={() => resetScroll(props)} activeClassName="active">Итоги</NavLink ></li>}
                    </ul>
                    {(pathname === battleWithParamURL(battleId)+works || pathname === battleWithParamURL(battleId)+winners || pathname === battleWithParamURL(battleId)+works_stage2) && <FilterWorks />}
                </nav>
            </>
        )
    );
}

const mapStateToProps = (state) => ({
    storeHideNavigation: state.reducer.storeHideNavigation,
    dataMyWorks: state.reducer.dataMyWorks,
    storeBattle: state.reducer.storeBattle,
    storeSecondStageWorks: state.reducer.storeSecondStageWorks,
    storeScrollWorksValue: state.reducer.storeScrollWorksValue,
    storeScrollResultsValue: state.reducer.storeScrollResultsValue,

    worksData: state.ajaxReducer.worksData,
    battleDetailedData: state.ajaxReducer.battleDetailedData,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreScrollWorksValue: (value) => dispatch(setStoreScrollWorksValue(value)),
    setStoreScrollResultsValue: (value) => dispatch(setStoreScrollResultsValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNavigation);
