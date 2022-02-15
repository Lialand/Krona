import React from "react"

import SendWorkBtn from "../SendWorkBtn";

import "./Footer.scss";

export default function Footer(props) {

    const { 
        lastBattleData
    } = props;

    return (
        <div className="sidebarLow">
            {lastBattleData?.battleStageId !== 6
                ?
                <SendWorkBtn 
                    isSidebar={true}
                />
                :
                <div 
                    className="linkEvent blocked" 
                    style={{backgroundColor: "#E28E05"}}
                >
                    <div className="eventTop">
                        <div className="eventDate">02/22</div>
                        <div className="eventColor" style={{backgroundColor: "#F768E8"}}></div>
                    </div>
                    <div className="eventBottom">
                        <div className="eventTheme">Планируется ближайший баттл</div>
                    </div>
                </div>
            }
            <div className="social">
                <a target="_blank" href="https://www.instagram.com/krona.studio" className="socialLink">
                    <img src="/assets/images/inst-sidebar.svg" alt="Instagram" />
                </a>
                <a target="_blank" href="https://www.youtube.com/channel/UCDzFZyozW759pFEL44iOt3w" className="socialLink">
                    <img src="/assets/images/youtube-sidebar.svg" alt="Youtube" />
                </a>
                <div className="agreementLinks">
                    <a target="_blank" className="agreementLink" href="https://drive.google.com/file/d/1JNeVQZmckk6fI3QL990PNWDKe2dlKw-T/view">
                        Политика обработки персональных данных
                    </a>
                    <a target="_blank" className="agreementLink" href="https://drive.google.com/file/d/14i9Dj_nYHYseD6K2P971QCQcRQUhW5gZ/view">
                        Условия проведения конкурса
                    </a>
                </div>
            </div>
        </div>
    )
}