import React, { useEffect } from "react";
import { connect } from "react-redux";
import PrizeElement from "./PrizeElement";

import "./Prizes.scss";

function Prizes(props) {
    
    const { 
        prizes 
    } = props;
    
    useEffect(() => {
        let content = document.getElementById("prizesText");
        content.innerHTML = prizes;
    }, []);
    
    return (
        <div className="contentText contentPrizes" id="prizesText">
            {/*<h3>Призы</h3>
            <div className="contentTextMessege">
                Победители получают <b>денежные призы</b> или <b>бонусы</b> на покупки
                в&nbsp;школе <a href="https://krona.studio/">@krona.studio</a>
            </div>
            <div className="contentTextLosers">
                Среди всех участников, НЕ занявших призовые места, будет проведен
                розыгрыш <b>скидки 50% на наши курсы</b>
            </div>
            <div className="prizes-box">
                <PrizeElement place="1" text="3 000 ₽ на карточку" />
                <PrizeElement place="2" text="2000 бонусов" />
                <PrizeElement place="3" text="1000 бонусов" />
            </div> */}
        </div>
    );
}

export default Prizes;
