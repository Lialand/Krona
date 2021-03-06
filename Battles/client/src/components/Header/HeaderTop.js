import React from "react";
import { Link } from "react-router-dom";

import SendWorkBtn from "components/Sidebar/SendWorkBtn";

import { 
    battles
 } from "constants/pages";

function HeaderTop(props) {

    return (
        <div className="headerTop">
            <div className="headerLogo">
                <img className="logoImage" src="/assets/images/logo.svg" />
                <Link to={battles} className={props.battlesPage ? "logoText" : "logoText works"}>Krona.Battles</Link>
            </div>
            {props.isLastBattle && <SendWorkBtn />}
            <div onClick={props.openSidebar} className="burgerMenu">
                <img src="/assets/images/burger-open.svg" />
            </div>
        </div>
    );
};

export default HeaderTop;
