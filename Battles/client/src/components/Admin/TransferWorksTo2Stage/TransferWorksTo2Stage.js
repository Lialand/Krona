import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouteMatch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Viewer from "react-viewer";
import { connect } from "react-redux";
import { Select } from "semantic-ui-react";

import TransferWorksTo2StageItem from "./TransferWorksTo2StageItem/TransferWorksTo2StageItem";
import InfoModal from "../../InfoModal/InfoModal";
import { 
    getPreviewImageURL, 
    getWorkImageURL 
} from "utils/userImageUtils";
import getGridColumns from "utils/getGridColumns";
import { chooseException } from "utils/errorUtils";
import {
    getWorks,
    putFiltered,
    resetWorksTransfer
} from "reduxFolder/actions/AjaxActions";
import "./TransferWorksTo2Stage.scss";

function getRefreshedWorks(works, workId) {

    return works.map(item => {

        if (item.id === workId) {
            return {...item, filtered: !item.filtered}
        }
        return item;
    });
}

function TransferWorksTo2Stage(props) {

    const {  
        getWorks, 
        putFiltered,
        putFilteredError,
        worksError,
        worksData,
        battlesData,
        handleException,
        resetWorksTransfer,
        putFilteredSuccess
    } = props;

    const { url } = useRouteMatch();
    const history = createBrowserHistory();
    const { battleId } = useParams();
    const [filteredWorks, setFilteredWorks] = useState([]);
    const [gridWidth, setGridWidth] = useState(0);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState({
        text: "",
        isError: false,
    });
    const gridWorks = useRef(null);

    useEffect(() => setFilteredWorks(worksData), [worksData]);

    useEffect(() => {

        if (battleId)
            getWorks(battleId)
    }, [battleId]);

    useEffect(() => {

        let { body } = document;
        if (visible.isVision)
            body.style.marginRight = "-17px";
        else 
            body.removeAttribute("style");

        return () => body.removeAttribute("style");
    }, [visible]);

    //Блок кода ниже используется для получения ширины грид-области
    const getWidth = () => {
        if (gridWorks.current) {
            setGridWidth(gridWorks.current?.offsetWidth);
        }
    }
    useEffect(() => getWidth)
    useEffect(() => {
        
        window.addEventListener("resize", () => {
            getWidth();
        });

        return () => { 
            window.removeEventListener("resize", () => {
                getWidth();
            });
        }
    }, [])
    //////////////////////

    //Обработка ошибок
    useEffect(() => {

        chooseException([putFilteredError, worksError], handleException);
        if (putFilteredError || worksError || putFilteredSuccess) {
            resetWorksTransfer();
        }
    }, [putFilteredError, worksError, putFilteredSuccess]);

    if (putFilteredSuccess) 
        return <Redirect to="" />
    return (
        <section className="transferWorks">
            {/* <Select 
                placeholder={battlesData?.find(battle => battle.id === +battleId)?.name}
                value={battleId}
                onChange={(e, { value }) => history.replace(url.replace())}
                className="selectStyled"
                options={
                    battlesData.map(battle => (
                        {
                            key: battle.id,
                            value: battle.id,
                            text: battle.name
                        }
                    ))
                }
            /> */}
            <section className="contentBattleWorks" ref={gridWorks} style={{gridTemplateColumns: getGridColumns(gridWidth, worksData)}}>
                {
                worksData?.map((param, index) =>
                    <TransferWorksTo2StageItem
                        key={param.id}
                        image={getPreviewImageURL(
                            param.versions[0].authorMockupURL
                        )}
                        isAcceptWork={filteredWorks.find(version => version.id === param.id && version.filtered)}
                        acceptWork={() => setFilteredWorks(works => getRefreshedWorks(works, param.id))}
                        chooseWork={() => setVisible({
                            isVisible: true,
                            index: index
                        })}
                    />
                )} 
            </section>
            {worksData?.length !== 0 &&
                <button className="requestBtn" onClick={() => putFiltered({works: filteredWorks})}>Перевести работы на второй этап</button>
            }
            <InfoModal
                isError={error.isError}
                show={!!error.isError}
                OK={() => setError({isError: false})}
                text={error.text}
            />
            <Viewer
                visible={visible.isVisible}
                onClose={() => setVisible(false)}
                images={worksData.map(param => ({ src: getWorkImageURL(param.versions[0].authorMockupURL), alt: "Работа "+param.work?.author?.name }))}
                activeIndex={visible.index}
                zoomSpeed={0.5}
                noToolbar={true}
            />
        </section>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getWorks: (id) => dispatch(getWorks(id)),
    putFiltered: (works) => dispatch(putFiltered(works)),
    resetWorksTransfer: () => dispatch(resetWorksTransfer()),
})

const mapStateToProps = (state) => ({
    worksData: state.ajaxReducer.worksData,
    worksError: state.ajaxReducer.worksError,
    putFilteredError: state.ajaxReducer.putFilteredError,
    putFilteredSuccess: state.ajaxReducer.putFilteredSuccess,
    battlesData: state.ajaxReducer.battlesData,
    storeAuth: state.reducer.storeAuth
})

export default connect(mapStateToProps, mapDispatchToProps)(TransferWorksTo2Stage);