import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import { useMediaQuery } from "react-responsive";
import { useParams, useLocation } from "react-router-dom";

import { filterWorks } from "utils/filterUtils";
import { connect } from "react-redux";
import { 
    winners, 
    works, 
    works_stage2, 
    battleWithParamURL,
} from "constants/pages";
import { setStoreFilteredWorks } from "reduxFolder/actions/Actions";

import FilterWorksItemDesktop from "./FilterWorksItemDesktop";
import FilterWorksItemMobile from "./FilterWorksItemMobile";

import "./Filter.scss";

function FilterWorks(props) {

    const { 
        worksData,
        storeBattle,
        resultsData,
        setStoreFilteredWorks,
        lastBattleData
    } = props;

    const isMobile = useMediaQuery({maxWidth: 640});

    const { battleId } = useParams();
    const { pathname } = useLocation();

    const properties = {
        worksAmount: filterWorks(worksData, "FIRST_STAGE").worksAmount(),
        works2StageAmount: filterWorks(worksData, "SECOND_STAGE").worksAmount(),
        winnersAmount: resultsData.prizes?.length,
        worksPage: battleWithParamURL(battleId)+works,
        worksSecondStagePage: battleWithParamURL(battleId)+works_stage2,
        winnersPage: battleWithParamURL(battleId)+winners, 
        isCompletedBattle: storeBattle?.battleStageId === 6,
        isLastBattle: lastBattleData?.name === storeBattle?.name && lastBattleData?.battleStageId !== 6
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
    lastBattleData: state.ajaxReducer.lastBattleData,
    storeBattle: state.reducer.storeBattle,
    resultsData: state.ajaxReducer.resultsData
});

const mapDispatchToProps = (dispatch) => ({
    setStoreFilteredWorks: (filteredWorks) => 
        dispatch(setStoreFilteredWorks(filteredWorks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterWorks);