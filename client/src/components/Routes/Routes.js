/**
 * Данный компонент проверяет путь url с помощью React Router,
 * в зависимости от него загружается тот или иной компонент.
 */

import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router";
import { connect } from "react-redux";

import Works from "../Works/Works";
import HeaderNav from "../HeaderNav/HeaderNav";
import {
    works,
    works_stage2,
    battleWithParamURL
} from "../../shared/constants/pages";
import { routes } from "../../shared/constants/routes";

import { 
    getWorks, 
    getMyWorks,
    getResults 
} from "../../redux/actions/AjaxActions";
import {
    setStoreBattle, setStoreFilteredWorks,
} from "../../redux/actions/Actions";

function Routes(props) {

    const {
        storeAuth,
        storeBattle,
        storeWorkChanged,
        setStoreFilteredWorks,

        getWorks,
        worksStart,
        worksError,
        getMyWorks,
        myWorksStart,
        myWorksError,
        getResults,
        resultsError,
    } = props;

    const [isWorks, setIsWorks] = useState(false);

    useEffect(() => {
        if (storeAuth.isLogged && storeBattle?.id) {
            //Если пользователь авторизован и загружены данные баттла, то
            //отправляется запрос на получение собственных работ заданного
            //баттла.
            getMyWorks(storeBattle.id);
            if (myWorksError) {
                console.log(myWorksError);
            }
        } 
    }, [storeWorkChanged, storeAuth.isLogged, storeBattle]);

    useEffect(() => { 
        if (storeBattle?.name) {
            //Обнуление отфильтрованных работ
            setStoreFilteredWorks([]);
            //Если данные баттла загружены, то запрос отправляется на
            //получение всех работ по id баттла.
            getWorks(storeBattle.id);
            if (worksError !== "") {
                console.log(worksError);
            }

            if (storeBattle.battleStageId === 6) {
                getResults(storeBattle.id);
                if (resultsError !== "") {
                    console.log(resultsError);
                }
            }
            
        }
    }, [storeBattle]);

    useEffect(() => {
        if (!worksStart) 
            setIsWorks(true);

        return () => {
            setIsWorks(false);
        }
    }, [worksStart]);

    return (
        <>
        <Route path={battleWithParamURL()} component={HeaderNav} />
        <Switch>
            <Route path={[battleWithParamURL()+works, battleWithParamURL()+works_stage2]}>
                {!worksStart && isWorks && <Works />}
            </Route>
            {routes.map((route, index) => (
                <Route 
                    path={route.path} 
                    children={<route.children />} 
                    key={index}
                    exact={route.exact} 
                />
            ))}
        </Switch>
        </>
    );
    
}

const mapStateToProps = (state) => ({
    storeAuth: state.reducer.storeAuth,
    storeBattle: state.reducer.storeBattle,
    storeWorkChanged: state.reducer.storeWorkChanged,

    worksStart: state.ajaxReducer.worksStart,
    worksError: state.ajaxReducer.worksError,
    myWorksStart: state.ajaxReducer.myWorksStart,
    myWorksError: state.ajaxReducer.myWorksError,
    resultsError: state.ajaxReducer.resultsError,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreBattle: (battle) => dispatch(setStoreBattle(battle)),
    setStoreWorkId: (workId) => dispatch(setStoreWorkId(workId)),
    setStoreFilteredWorks: (filteredWorks) => dispatch(setStoreFilteredWorks(filteredWorks)),

    getWorks: (works) => dispatch(getWorks(works)),
    getMyWorks: (myWorks) => dispatch(getMyWorks(myWorks)),
    getResults: (results) => dispatch(getResults(results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
