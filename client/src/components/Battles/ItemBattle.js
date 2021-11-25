/*
 * Компонент является шаблоном одного баттла.
 */

import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { works, battleWithParamURL } from "constants/pages";
import { setStoreBattleSwitch } from "reduxFolder/actions/Actions"

import ItemBattleLow from "../Battles/ItemBattleLow";

function ItemBattle(props) {
    const {
        setStoreBattleSwitch,
        battleId,
        clickBattle,
        cover,
        status,
        worksCount,
        name,
        startDate,
        finishDate,
        category
    } = props;

    return (
        <Link
            to={battleWithParamURL(battleId)+works}
            onClick={() => {
                clickBattle();
                setStoreBattleSwitch(true);
            }}
            className="linkToWorks"
        >
            <div className="battleCover">
                <img src={cover} className="battleCoverImage" />
                <div className="battleInfoWrapper">
                    <div className="battleInfo">
                        <div className="battleStatus">{status}</div>
                        <h4>{name}</h4>
                        <div className="worksCount">{worksCount}</div>
                    </div>
                </div>
            </div>
            <div className="battleFooter">
                <p className="battleName">{name}</p>
                <p className="battleDates">
                    {startDate} - {finishDate}
                </p>
                <ItemBattleLow 
                    users={props.users}
                    usersCount={props.usersCount}
                />
                <div className="category">{category}</div>
            </div>
        </Link>
    );
}

const mapStateToProps = (state) => ({
    storeWorks: state.reducer.storeWorks,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreBattleSwitch: (boolean) => dispatch(setStoreBattleSwitch(boolean))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemBattle);
