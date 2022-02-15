/**
 * Данный компонент проверяет путь url с помощью React Router,
 * в зависимости от него загружается тот или иной компонент.
 */

import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router";
import { connect } from "react-redux";

import HeaderNav from "../HeaderNav/HeaderNav";
import BattleNotFoundError from "../Errors/BattleNotFoundError"
import {
    battleWithParamURL,
    work_viewing
} from "constants/pages";
import { routes } from "constants/routes";

import { startGoToBattle } from "reduxFolder/actions/MainActions";
import { getLastBattle } from "reduxFolder/actions/AjaxActions";

function Routes(props) {

    const {
        storeBattle,
        worksStart,
        storeAuth,

        startGoToBattle,
        lastBattleData,
        getLastBattle
    } = props;

    const [isWorks, setIsWorks] = useState(false);

    const { pathname } = useLocation(); 

    useEffect(() => storeBattle.name && startGoToBattle(storeBattle), [storeBattle]);
    useEffect(() => {

        if (storeBattle.name && storeBattle.name === lastBattleData.name && lastBattleData.battleStageId !== 6) {
            getLastBattle(true);
        }
    }, [pathname]);

    useEffect(() => {
        if (!worksStart) 
            setIsWorks(true);

        return () => {
            setIsWorks(false);
        }
    }, [worksStart]);

    if (storeBattle?.battleNotFound)
        return <BattleNotFoundError />;
    return (
        <>
        {!pathname.match(work_viewing) && <Route path={battleWithParamURL()} component={HeaderNav} />}
        <Switch>
            {routes.map((route, index) => (
                <Route 
                    path={route.path} 
                    children={<route.children worksConditions={!worksStart && isWorks} />} 
                    key={index}
                />
            ))}
        </Switch>
        </>
    );
    
}

const mapStateToProps = (state) => ({
    storeBattle: state.reducer.storeBattle,
    storeAuth: state.reducer.storeAuth,
    worksStart: state.ajaxReducer.worksStart,
    lastBattleData: state.ajaxReducer.lastBattleData,
});

const mapDispatchToProps = (dispatch) => ({
    startGoToBattle: (storeBattle) => dispatch(startGoToBattle(storeBattle)),
    getLastBattle: (boolean) => dispatch(getLastBattle(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
