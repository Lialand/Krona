/**
 * Этот компонент отображает хэдер страницы после перехода на баттл.
 */

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router";

import BattleInfo from "./BattleInfo";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

import { work_viewing } from "constants/pages";
import checkBattleStage from "utils/checkBattleStage";
import formatDateUtils from "utils/formatDateUtils";
import findBattleWithId from "utils/findBattleWithId";
import { setStoreBattle } from "reduxFolder/actions/Actions";
import { getBattleDetailed } from "reduxFolder/actions/AjaxActions";

import "./Header.scss";

function Header(props) {
    const { 
        storeBattle, 
        setStoreBattle,
        storeWorksViewing,
        openSidebar,

        lastBattleError,
        lastBattleData,
        battlesData
    } = props;

    const { pathname } = useLocation();

    const [dateBattle, setDateBattle] = useState({});
    const [isLoadedBattle, setIsLoadedBattle] = useState(false);
    const [isHideNavPage, setIsHideNavPage] = useState(false);

    const isMobile = useMediaQuery({maxWidth: 640});

    useEffect(() => {

        setIsHideNavPage(pathname.match(work_viewing));
        if (!storeBattle?.name && battlesData.length !== 0) {
            //Если данных баттла нет, и мы
            //находимся не на странице всех баттлов, то
            //посылается запрос на последний баттл, после
            //полученные данные распределяются в поля хэдера.
            let battle = findBattleWithId(+pathname.split("/")[2], battlesData);

            if (battle === undefined && +pathname.split("/")[2]) 
                setStoreBattle({battleNotFound: true});
            else
                setStoreBattle(battle);
            
        }
    }, [battlesData, pathname]);

    useEffect(() => {
        if (storeBattle?.name) {
            setIsLoadedBattle(true);
            setDateBattle(() =>
                formatDateUtils(storeBattle.startDate, storeBattle.finishDate, true)
            );
        }
    }, [storeBattle]);
    
    if (!isLoadedBattle || lastBattleError !== "") 
        return <></>;
    return (
        <>
            <div className={`emptyHeader ${isHideNavPage ? `viewWork` : `main`}`} id="emptyHeader" />
            <header className={`headerMain ${isHideNavPage ? `viewWork moveSidebar` : `main moveSidebar`}`} id="header">
                <HeaderTop 
                    isLastBattle={lastBattleData?.name === storeBattle?.name && lastBattleData?.battleStageId !== 6}
                    battlesPage={false} 
                    isMobile={isMobile}
                    workPage={isHideNavPage}
                    name={storeBattle.name}
                    startDate={dateBattle.startDate}
                    finishDate={dateBattle.finishDate}
                    status={checkBattleStage(storeBattle.battleStageId)}
                    openSidebar={openSidebar}
                />
                <HeaderBottom 
                    battlesPage={false} 
                    workPage={isHideNavPage}
                    battleName={storeBattle.name}
                    battleId={storeBattle.id}
                />
                {!isHideNavPage &&
                <BattleInfo
                    name={storeBattle.name}
                    startDate={dateBattle.startDate}
                    finishDate={dateBattle.finishDate}
                    status={checkBattleStage(storeBattle.battleStageId)}
                    worksCount={storeBattle.worksCount}
                    specialization={storeBattle.category?.name}
                    headerImage={storeBattle.battleImageURL}
                    isMobile={isMobile}
                    workName={storeWorksViewing?.length !== 0}
                />
                }
            </header>
        </>
    );
    
}

const mapStateToProps = (state) => ({
    storeBattle: state.reducer.storeBattle,
    storeWorksViewing: state.reducer.storeWorksViewing,
    storeWorkId: state.reducer.storeWorkId,

    battlesData: state.ajaxReducer.battlesData,
    lastBattleError: state.ajaxReducer.lastBattleError,
    lastBattleData: state.ajaxReducer.lastBattleData
});

const mapDispatchToProps = (dispatch) => ({
    setStoreBattle: (battles) => dispatch(setStoreBattle(battles))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
