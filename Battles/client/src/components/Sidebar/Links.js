import React from "react";
import { NavLink } from "react-router-dom";

import { 
    works, 
    battles, 
    battleWithParamURL,
    moderate,
    admin,
    add_battle,
    approve_user_site,
    transfer_works
} from "constants/pages";

export default function Links(props) {

    const { 
        lastBattleData,
        clickCurrentBattle,
        battlesCount,
        closeSidebar,
        battleId,
        storeAuth
    } = props;
    
    return (
        <ul className="list">
            <li className="listItem">
                <NavLink 
                    onClick={closeSidebar} 
                    to={battles}
                    className="listItemLink"
                    exact
                >Все баттлы</NavLink>
                <div className="battlesCount">{`(${battlesCount})`}</div>
            </li>
            <li className="listItem">
                {lastBattleData?.battleStageId !== 6
                    ?
                    <NavLink 
                        onClick={clickCurrentBattle} 
                        to={battleWithParamURL(lastBattleData?.id)+works} 
                        className="listItemLink"
                        isActive={(match, location) => location?.pathname?.match(/\/battles\/.+/) && battleId === lastBattleData?.id}
                        exact
                    >Текущий баттл</NavLink>
                    :
                    <div className="listItemLinkBlocked">Текущий баттл</div>
                }
            </li>
            <li className="listItem">
                <a target="_blank" className="listItemLink" href="https://t.me/joinchat/t5hd58JpfpM5ODcy">Telegram-канал баттлов</a>
            </li>
            {storeAuth.isLogged && (!!storeAuth.data?.user?.roles?.moderator?.length || storeAuth.data?.user?.roles?.admin)
                &&
                <li className="listItem">
                    <NavLink 
                        to={moderate} 
                        className="listItemLink"
                    >Модерация работ</NavLink>
                </li>
            }
            {storeAuth.data?.user?.roles?.admin
                &&
                <>
                <li className="listItem">
                    <NavLink 
                        to={admin+add_battle} 
                        className="listItemLink"
                    >Создать баттл</NavLink>
                </li>
                <li className="listItem">
                    <NavLink 
                        to={admin+approve_user_site} 
                        className="listItemLink"
                    >Подтверждение соцсети</NavLink>
                </li>
                <li className="listItem">
                    <NavLink 
                        to={admin+transfer_works+lastBattleData.id} 
                        className="listItemLink"
                    >Перевод работ на второй этап</NavLink>
                </li>
                </>
            }
        </ul>
    )
}