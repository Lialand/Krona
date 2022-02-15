/*
 * Компонент является шаблоном одного баттла.
 */

import React from "react";
import { Link } from "react-router-dom";

import { works, battleWithParamURL, admin, redact_battle, redact_grades } from "constants/pages";

import ItemBattleLow from "../Battles/ItemBattleLow";

function ItemBattle(props) {

    const {
        battleId,
        clickBattle,
        cover,
        status,
        worksCount,
        name,
        startDate,
        finishDate,
        category,
        isAdmin
    } = props;

    return (
        <div className="itemBattle">
            <Link 
                to={battleWithParamURL(battleId) + works}
                onClick={clickBattle}
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
                        isAdmin={isAdmin}
                        battleId={battleId}
                    />
                    <div className="category">{category}</div>
                </div>
            </Link>
            {isAdmin &&
                <div className="redactBattleLinks">
                    Редактировать: 
                    <Link to={admin + redact_battle + battleId}>
                        Баттл
                    </Link> 
                    <Link to={admin + redact_grades + battleId}>
                        Оценки работ
                    </Link>
                </div>
            }
        </div>
    );
}

export default ItemBattle;
