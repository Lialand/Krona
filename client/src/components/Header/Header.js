/**
 * Этот компонент отображает хэдер страницы и кнопку "отправить работу".
 */

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router";

import BattleInfo from "./BattleInfo";
import checkBattleStage from "utils/checkBattleStage";
import formatDateUtils from "utils/formatDateUtils";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

import { setStoreBattle } from "reduxFolder/actions/Actions";
import findBattleWithId from "utils/findBattleWithId";

import "./Header.scss";

function Header(props) {
    const { 
        storeBattle, 
        setStoreBattle,
        storeHideHeader, 
        storeHideNavigation,
        storeWorksViewing,
        openSidebar,

        lastBattleError,
        battlesData,
    } = props;

    const [dateBattle, setDateBattle] = useState({});
    const [isLoadedBattle, setIsLoadedBattle] = useState(false);

    const isMobile = useMediaQuery({maxWidth: 640});
    const location = useLocation();

    useEffect(() => {

        if (!storeHideHeader && !storeBattle?.name && battlesData.length !== 0) {
            //Если данных баттла нет, и мы
            //находимся не на странице всех баттлов, то
            //посылается запрос на последний баттл, после
            //полученные данные распределяются в поля хэдера.
            let battle = findBattleWithId(+location.pathname.split("/")[2], battlesData);

            if (battle === undefined && +location.pathname.split("/")[2]) 
                setStoreBattle({battleNotFound: true});
            else
                setStoreBattle(battle);
            
        }
    }, [battlesData, storeHideHeader]);

    useEffect(() => {
        if (storeBattle?.name) {
            setIsLoadedBattle(true);
            setDateBattle(() =>
                formatDateUtils(storeBattle.startDate, storeBattle.finishDate, true)
            );
        }
    }, [storeBattle]);
    
    if (storeHideHeader) { //В этом случае мы находимся на страницы всех баттлов либо где-то ещё, где не требуются данные о баттле в Header
        return (
            <>
                <div className="emptyHeader battles" id="emptyHeader" />
                <header className="headerMain moveSidebar battles" id="header">
                    <HeaderTop battlesPage={true} openSidebar={openSidebar} />
                    <HeaderBottom 
                        battlesPage={true} 
                        battlesCount={battlesData.length}
                    />
                </header>
            </>
        );
    } else if (!isLoadedBattle || lastBattleError !== "") {
        return <></>;
    } else { 
        return (
            <>
                <div className={`emptyHeader ${storeHideNavigation ? `viewWork` : `main`}`} id="emptyHeader" />
                <header className={`headerMain ${storeHideNavigation ? `viewWork moveSidebar` : `main moveSidebar`}`} id="header">
                    <HeaderTop 
                        battlesPage={false} 
                        isMobile={isMobile}
                        workPage={storeHideNavigation}
                        name={storeBattle.name}
                        startDate={dateBattle.startDate}
                        finishDate={dateBattle.finishDate}
                        status={checkBattleStage(storeBattle.battleStageId)}
                        openSidebar={openSidebar}
                    />
                    <HeaderBottom 
                        battlesPage={false} 
                        workPage={storeHideNavigation}
                        battleName={storeBattle.name}
                        battleId={storeBattle.id}
                    />
                    {!storeHideNavigation &&
                    <BattleInfo
                        name={storeBattle.name}
                        startDate={dateBattle.startDate}
                        finishDate={dateBattle.finishDate}
                        status={checkBattleStage(storeBattle.battleStageId)}
                        worksCount={storeBattle.worksCount}
                        specialization={storeBattle.category.name}
                        headerImage={storeBattle.battleImageURL}
                        isMobile={isMobile}
                        workName={storeWorksViewing?.length !== 0}
                    />
                    }
                </header>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    storeBattle: state.reducer.storeBattle,
    storeHideHeader: state.reducer.storeHideHeader,
    storeHideNavigation: state.reducer.storeHideNavigation,
    storeWorksViewing: state.reducer.storeWorksViewing,
    storeWorkId: state.reducer.storeWorkId,

    battlesData: state.ajaxReducer.battlesData,
    lastBattleError: state.ajaxReducer.lastBattleError,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreBattle: (battles) => dispatch(setStoreBattle(battles))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
