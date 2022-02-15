import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function FilterWorksItemMobile(props) {

    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const {
        works2StageAmount,
        worksPage,
        worksSecondStagePage,
        winnersPage,
        isCompletedBattle
    } = props;

    return (
        <ul className="filterWorksMobile">
            <div onClick={() => setIsOpenFilter(openFilter => !openFilter)} className="iconFilter"><img className="iconImg" src="/assets/images/filter-mobile.svg" /></div>
            <ul className={isOpenFilter ? "filters active" : "filters"}>
                <li onClick={() => setIsOpenFilter(false)}>
                    <Link to={worksPage}>
                        1 этап
                    </Link>
                </li>
                {works2StageAmount !== 0 &&
                <li onClick={() => setIsOpenFilter(false)}>
                    <Link to={worksSecondStagePage}>
                        2 этап
                    </Link>
                </li>
                }
                {isCompletedBattle &&
                <li onClick={() => setIsOpenFilter(false)}>
                    <Link to={winnersPage}>
                        Победители
                    </Link>
                </li>
                }
            </ul>
        </ul>
    )
}
