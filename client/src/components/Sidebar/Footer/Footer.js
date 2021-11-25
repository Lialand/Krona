import React from "react"
import { Link } from "react-router-dom";

import { battleWithParamURL, works } from "constants/pages";

import "./Footer.scss";

export default function Footer(props) {

    const { 
        clickCurrentBattle,
        lastBattleData
    } = props;

    return (
        <div className="sidebarLow">
            {lastBattleData?.battleStageId !== 6
                ?
                <Link 
                    onClick={clickCurrentBattle}
                    to={battleWithParamURL(lastBattleData?.id)+works}
                    className="linkEvent" 
                    style={{backgroundColor: "#E28E05"}}
                >
                    <div className="eventTop">
                        <div className="eventDate">09/12/21</div>
                        <div className="eventColor" style={{backgroundColor: "#F768E8"}}></div>
                    </div>
                    <div className="eventBottom">
                        <div className="eventTheme">Текущий баттл</div>
                        <img src="/assets/images/arrow-sidebar.svg" alt="" />
                    </div>
                </Link>
                :
                <div 
                    className="linkEvent blocked" 
                    style={{backgroundColor: "#E28E05"}}
                >
                    <div className="eventTop">
                        <div className="eventDate">09/12/21</div>
                        <div className="eventColor" style={{backgroundColor: "#F768E8"}}></div>
                    </div>
                    <div className="eventBottom">
                        <div className="eventTheme">Планируется ближайший баттл</div>
                    </div>
                </div>
            }
            <div className="social">
                <a href="https://www.instagram.com/krona.studio" className="socialLink">
                    <img src="/assets/images/inst-sidebar.svg" alt="Instagram" />
                </a>
                <a href="https://www.youtube.com/channel/UCDzFZyozW759pFEL44iOt3w" className="socialLink">
                    <img src="/assets/images/youtube-sidebar.svg" alt="Youtube" />
                </a>
            </div>
        </div>
    )
}