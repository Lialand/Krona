import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";

import Sidebar from "../Sidebar/Sidebar";

import { topRoutes } from "constants/routes.js";
import { battles } from "constants/pages.js";
import { getLogout, getMyWorks } from "reduxFolder/actions/AjaxActions";
import { startApp } from "reduxFolder/actions/MainActions";
import hideScroll from "utils/hideScroll";

import "./Main.scss";

function Main(props) {

    const {
        battlesData,
        startApp,
        storeBattle,
        getLogout,
        getMyWorks,
        storeAuth,
        lastBattleData
    } = props;
    const { pathname } = useLocation();

    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    hideScroll(isOpenSidebar);

    //Начальные запросы приложения
    useEffect(() => startApp(), []);
    useEffect(() => {
        if (storeAuth.isLogged && lastBattleData.id) {
            getMyWorks(lastBattleData.id);
        }
    }, [storeAuth, lastBattleData]);

    return (
        <>
            <Sidebar 
                isOpenSidebar={isOpenSidebar}
                closeSidebar={() => setIsOpenSidebar(false)}
                battlesCount={battlesData.length}
                logout={() => getLogout(pathname.match(/battles\/[0-9]+/) && storeBattle)}
            />
            <main className="main moveSidebar">
                <Switch>
                    {topRoutes.map((route, index) => 
                        <Route 
                            path={route.path} 
                            children={
                                <route.children 
                                    storeAuth={storeAuth} 
                                    openSidebar={() => setIsOpenSidebar(true)} 
                                />
                            } 
                            key={index}
                            exact={route.exact} 
                        />
                    )}
                    <Redirect from="" to={battles} />
                </Switch>
            </main>
        </>
    );
}

const mapStateToProps = (state) => ({
    battlesData: state.ajaxReducer.battlesData,
    storeAuth: state.reducer.storeAuth,
    storeBattle: state.reducer.storeBattle,
    lastBattleData: state.ajaxReducer.lastBattleData
});

const mapDispatchToProps = (dispatch) => ({
    getLogout: (storeBattle) => dispatch(getLogout(storeBattle)),
    startApp: () => dispatch(startApp()),
    getMyWorks: (id) => dispatch(getMyWorks(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);