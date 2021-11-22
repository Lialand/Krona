import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import { useMediaQuery } from "react-responsive";
import { useParams, useLocation } from "react-router-dom";

import { filterWorks } from "../../../shared/utils/filterUtils";
import { connect } from "react-redux";
import { 
    winners, 
    works, 
    works_stage2, 
    battleWithParamURL,
} from "../../../shared/constants/pages";
import { setStoreFilteredWorks } from "../../../redux/actions/Actions";

import FilterWorksItemDesktop from "./FilterWorksItemDesktop";
import FilterWorksItemMobile from "./FilterWorksItemMobile";

import "./Filter.scss";

function FilterWorks(props) {

    const { 
        worksData,
        storeBattle,
        setStoreFilteredWorks
    } = props;

    const isMobile = useMediaQuery({maxWidth: 640});

    const { battleId } = useParams();
    const { pathname } = useLocation();

    const properties = {
        worksAmount: filterWorks(worksData, "SECOND_STAGE").worksAmount(),
        worksPage: battleWithParamURL(battleId)+works,
        worksSecondStagePage: battleWithParamURL(battleId)+works_stage2,
        winnersPage: battleWithParamURL(battleId)+winners,
        isCompletedBattle: storeBattle?.battleStageId === 6
    };

    useEffect(() => {

        if (worksData.length !== 0) {

            if (pathname === battleWithParamURL(battleId)+works)
                setStoreFilteredWorks(filterWorks(worksData, "FIRST_STAGE")?.works);
            else if (pathname === battleWithParamURL(battleId)+works_stage2)
                setStoreFilteredWorks(filterWorks(worksData, "SECOND_STAGE")?.works);
        }

    }, [pathname, worksData]);

    if (isMobile)
        return ReactDOM.createPortal(<FilterWorksItemMobile {...properties} />, document.body);
    return <FilterWorksItemDesktop {...properties} />;
}

const mapStateToProps = (state) => ({
    worksData: state.ajaxReducer.worksData,
    storeBattle: state.reducer.storeBattle,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreFilteredWorks: (filteredWorks) => 
        dispatch(setStoreFilteredWorks(filteredWorks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterWorks);