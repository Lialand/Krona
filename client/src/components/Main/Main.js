import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Routes from "../Routes/Routes";
import BattleNotFoundError from "../Errors/BattleNotFoundError";
import { connect } from "react-redux";
import {
    setStoreBattle,
    setStoreHideNavigation,
    setStoreHideHeader
} from "../../redux/actions/Actions";
import { 
    getAuth,
    getBattleDetailed, 
    getBattles, 
    getLastBattle, 
    getLogout
} from "../../redux/actions/AjaxActions"
import { battles, work_viewing } from "../../shared/constants/pages";

import "./Main.scss";

function Main(props) {

    const {
        storeBattle,
        storeAuth,
        setStoreHideNavigation,
        setStoreHideHeader,

        getBattleDetailed,
        battleDetailedError,
        battlesData,
        getBattles,
        getLogout,
        getAuth,
        getLastBattle
    } = props;

    let { pathname } = useLocation();

    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    useEffect(() => {
        
        if (isOpenSidebar) {
            document.body.style.overflow = "hidden";
        } else {
            document.body?.style.removeProperty("overflow");
        }
    }, [isOpenSidebar]);

    useEffect(() => {

        getLastBattle();
        if (battlesData.length === 0) 
            getBattles();

    }, []);

    //Управление показом хедера и навигации
    useEffect(() => { 

        if (
            pathname === battles ||
            `/${pathname.split('/')[3]}/` === work_viewing
        )
            setStoreHideNavigation(true);
        else 
            setStoreHideNavigation(false);

        if (pathname === battles) 
            setStoreHideHeader(true);
        else 
            setStoreHideHeader(false);

    }, [pathname]);

    //Здесь посылается запрос на состояние пользователя: авторизован или нет
    useEffect(() => {

        getAuth();
    }, []);

    const [battleNotFound, setBattleNotFound] = useState(false);
    useEffect(() => {
        if (storeBattle?.name) { //storeBattle устанавливается в Header.js

            getBattleDetailed(storeBattle?.id);
            if (battleDetailedError)
                console.log(battleDetailedError);

        } else if (storeBattle.battleNotFound) {
            setBattleNotFound(true);
        }
    }, [storeBattle]);

    if (battleNotFound)
        return <BattleNotFoundError />;
    return (
        <>
            <Sidebar 
                isOpenSidebar={isOpenSidebar}
                closeSidebar={() => setIsOpenSidebar(false)}
                battlesCount={battlesData.length}
                isLogged={storeAuth.isLogged}
                logout={getLogout}
            />
            <main className="main moveSidebar">
                <Header 
                    openSidebar={() => setIsOpenSidebar(true)}
                />
                <Routes />
            </main>
        </>
    );
}

const mapStateToProps = (state) => ({
    storeAuth: state.reducer.storeAuth,
    storeBattle: state.reducer.storeBattle,

    battleDetailedError: state.ajaxReducer.battleDetailedError,
    battlesData: state.ajaxReducer.battlesData,
    lastBattleData: state.ajaxReducer.lastBattleData,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreBattle: (battle) => dispatch(setStoreBattle(battle)),
    setStoreHideNavigation: (boolean) => dispatch(setStoreHideNavigation(boolean)),
    setStoreHideHeader: (boolean) => dispatch(setStoreHideHeader(boolean)),

    getBattleDetailed: (battleDetailed) => dispatch(getBattleDetailed(battleDetailed)),
    getBattles: () => dispatch(getBattles()),
    getLastBattle: () => dispatch(getLastBattle()),
    getLogout: () => dispatch(getLogout()),
    getAuth: () => dispatch(getAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
