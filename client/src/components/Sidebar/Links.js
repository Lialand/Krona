import React from "react";
import { Link, useLocation } from "react-router-dom";

import { 
    works, 
    battles, 
    battleWithParamURL,
    moderate
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

    const { pathname } = useLocation();
    
    return (
        <ul className="list">
            <li className="listItem">
                <Link 
                    onClick={closeSidebar} 
                    to={battles}
                    className={pathname === battles 
                        ? "listItemLink listItemLinkActive" 
                        : "listItemLink"
                    }
                >Все баттлы</Link>
                <div className="battlesCount">{`(${battlesCount})`}</div>
            </li>
            <li className="listItem">
                {lastBattleData?.battleStageId !== 6
                    ?
                    <Link 
                        onClick={clickCurrentBattle} 
                        to={battleWithParamURL(lastBattleData?.id)+works} 
                        className={battleId === lastBattleData?.id && pathname !== battles
                            ? "listItemLink listItemLinkActive" 
                            : "listItemLink"
                        }
                    >Текущий баттл</Link>
                    :
                    <div className="listItemLinkBlocked">Текущий баттл</div>
                }
            </li>
            <li className="listItem">
                <a className="listItemLink" href="https://t.me/joinchat/t5hd58JpfpM5ODcy">Telegram-канал баттлов</a>
            </li>
            <li className="listItem">
            {storeAuth.isLogged && !!storeAuth.data?.user?.roles?.moderator?.length
                &&
                <Link 
                    to={moderate} 
                    className="listItemLink"
                >Модерация работ</Link>
            }
            </li>
        </ul>
    )
}