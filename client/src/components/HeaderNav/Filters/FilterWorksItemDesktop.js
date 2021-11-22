import React from "react";
import { NavLink } from "react-router-dom";

export default function FilterWorksItemDesktop(props) {

    const {
        worksAmount,
        worksPage,
        worksSecondStagePage,
        winnersPage,
        isCompletedBattle
    } = props;

    return (
        <ul className="headerFilter filterWorksDesktop">
            <div className="iconFilter"><img src="/assets/images/filter-desktop.svg" /></div>
            <ul className="filterMenu filterMenuStage">
                <li>
                    <NavLink activeClassName="active" to={worksPage}>
                        1 этап 
                    </NavLink>
                </li>
                {worksAmount !== 0 &&
                <li>
                    <NavLink activeClassName="active" to={worksSecondStagePage}>
                        2 этап
                    </NavLink>
                </li>
                }
                {isCompletedBattle &&
                <li>
                    <NavLink activeClassName="active" to={winnersPage}>
                        Победители
                    </NavLink>
                </li>
                }
            </ul>
        </ul>
    )
}
