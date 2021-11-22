/**
 * Данный компонент отображает "мои работы".
 */

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import ItemWork from "./ItemWork";
import {
    getPreviewImageURL,
    getWorkImageURL,
} from "../../shared/utils/userImageUtils";

import { connect } from "react-redux";
import { works } from "../../shared/constants/pages";
import {
    setStoreBattle,
    setStoreWorkId,
    setStoreWorksViewing,
    setStoreBattleSwitch,
} from "../../redux/actions/Actions";

function MyWorks(props) {

    const [isLoadedMyWorks, setIsLoadedMyWorks] = useState(false);

    const {
        setStoreWorkId,
        setStoreWorksViewing,
        storeAuth,

        dataMyWorks,
    } = props;

    useEffect(() => {
        setIsLoadedMyWorks(true);
    }, [dataMyWorks]);

    if (!isLoadedMyWorks) return <></>;
    else if (!dataMyWorks.length || storeAuth.status !== "Logged") return <Redirect to={works} />;
    else {
        return ( 
        <section className="contentBattleWorks">
            {dataMyWorks 
                ? (
                dataMyWorks.map((param, i) => (
                    <ItemWork
                        key={`MyWork_${i}`}
                        // name={storeAuth?.user?.name}
                        avatar={param?.author?.avatar}
                        images={getPreviewImageURL(param.versions[0].authorMockupURL)}
                        versions={param.versions.length}
                        likes={param.userLike[0]?.count}
                        score={param.grade}
                        chooseWork={() => {
                            setStoreWorksViewing(
                                dataMyWorks.filter(
                                    param => param.versions.length !== 0
                                )
                            )}}
                        // avatar={param.author.avatar}
                        // name={param.author.name}
                        // isBest={param.isBest}
                    />
                ))
                ) : <h4>Мои работы отсутствуют</h4>
            }
        </section>
        )
    }
};

const mapStateToProps = (state) => ({
    storeAuth: state.reducer.storeAuth,
    storeWorkChanged: state.reducer.storeWorkChanged,
    storeBattle: state.reducer.storeBattle,
    dataMyWorks: state.reducer.dataMyWorks,
});

const mapDispatchToProps = (dispatch) => ({
    setStoreBattle: (battle) => dispatch(setStoreBattle(battle)),
    setStoreWorksViewing: (works) => dispatch(setStoreWorksViewing(works)),
    setStoreWorkId: (workId) => dispatch(setStoreWorkId(workId)),
    setStoreBattleSwitch: (stageSwitch) => dispatch(setStoreBattleSwitch(stageSwitch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyWorks);
