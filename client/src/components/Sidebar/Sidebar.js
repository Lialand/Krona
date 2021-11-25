import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Profile from "./Profile/Profile";
import Footer from "./Footer/Footer";
import Links from "./Links";

import { battles } from "constants/pages";
import { 
    setStoreBattle, 
    setStoreBattleSwitch
} from "reduxFolder/actions/Actions";
import { getMyWorks } from "reduxFolder/actions/AjaxActions";

import "./Sidebar.scss";

function Sidebar(props) {

    const {
        isOpenSidebar,
        battlesCount,
        setStoreBattle,
        lastBattleData,
        closeSidebar,
        storeBattle,
        setStoreBattleSwitch,
        storeAuth
    } = props;

    return (
        <aside className={isOpenSidebar ? "sidebar active" : "sidebar"}>
            <div className="sidebarHigh">
                <div className="logo">
                    <Link to={battles} className="logoLink">
                        <img src="/assets/images/logo.svg" alt="" className="logoImage" />
                        <span className="logoText">Krona Studio&School</span>
                    </Link>
                    <div className="burgerMenu" onClick={closeSidebar}>
                        <img src="/assets/images/burger-close.svg" />
                    </div>
                </div>
                <Profile 
                    isLogged={props.isLogged}
                    logout={props.logout}
                    storeBattle={storeBattle}
                />
                <div className="boxLink">
                    <a className="linkSite linkSiteActive">Баттлы</a>
                    <a className="linkSite" href="https://club.krona.studio/">Клуб</a>
                </div>
                <Links 
                    lastBattleData={lastBattleData}
                    clickCurrentBattle={() => {
                        setStoreBattle(lastBattleData); 
                        setStoreBattleSwitch(true); 
                        closeSidebar();
                    }}
                    battlesCount={battlesCount}
                    closeSidebar={closeSidebar}
                    battleId={storeBattle.id}
                    storeAuth={storeAuth}
                />
            </div>
            <Footer 
                closeSidebar={closeSidebar}
                clickCurrentBattle={() => {
                    setStoreBattle(lastBattleData); 
                    setStoreBattleSwitch(true); 
                    closeSidebar();
                }}
                lastBattleData={lastBattleData}
            />
        </aside>
    )
}

const mapStateToProps = (state) => ({
    storeBattle: state.reducer.storeBattle,
    storeAuth: state.reducer.storeAuth,

    lastBattleData: state.ajaxReducer.lastBattleData,
})

const mapDispatchToProps = (dispatch) => ({
    setStoreBattle: (battle) => dispatch(setStoreBattle(battle)),
    setStoreBattleSwitch: (boolean) => dispatch(setStoreBattleSwitch(boolean)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);