import React from "react";
import { NavLink } from "react-router-dom";

import SendWorkBtn from "components/Sidebar/SendWorkBtn";

export default function FilterWorksItemDesktop(props) {

    const {
        worksAmount,
        works2StageAmount,
        winnersAmount,
        worksPage,
        worksSecondStagePage,
        winnersPage,
        isCompletedBattle,
        isLastBattle
    } = props;

    return (
        <ul className="headerFilter filterWorksDesktop">
            {isLastBattle &&
                <SendWorkBtn />
            }
            <div className="iconFilter"><img src="/assets/images/filter-desktop.svg" /></div>
            <ul className="filterMenu filterMenuStage">
                <li>
                    <NavLink activeClassName="active" to={worksPage}>
                        1 этап ({worksAmount})
                    </NavLink>
                </li>
                {works2StageAmount !== 0 &&
                <li>
                    <NavLink activeClassName="active" to={worksSecondStagePage}>
                        2 этап ({works2StageAmount})
                    </NavLink>
                </li>
                }
                {isCompletedBattle &&
                <li>
                    <NavLink activeClassName="active" to={winnersPage}>
                        Победители ({winnersAmount})
                    </NavLink>
                </li>
                }
            </ul>
        </ul>
    )
}
