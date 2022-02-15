import React, { useState, useRef, useEffect } from "react";
import Viewer from "react-viewer";
import { connect } from "react-redux";

import { 
    getPreviewImageURL, 
    getWorkImageURL 
} from "utils/userImageUtils";
import {
    moderation,
    getModeration
} from "reduxFolder/actions/AjaxActions";
import { error as errorText } from "constants/texts";
import getGridColumns from "utils/getGridColumns";

import ModerateWorkItem from "./ModerateWorkItem/ModerateWorkItem";
import InfoModal from "components/InfoModal/InfoModal";

import "./Moderate.scss";

function getRefreshedWorks(works, workId, statusId) {

    return works.map(item => {

        if (item.id === workId) {
            return {...item, statusId: statusId}
        }
        return item;
    });
}

function Moderate(props) {

    const { 
        storeAuth, 
        getModeration, 
        moderation,
        getModerationData
    } = props;

    const [data, setData] = useState([]);
    const [versions, setVersions] = useState([]);
    const [gridWidth, setGridWidth] = useState(0);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState({
        text: "",
        isError: false,
    });
    const gridWorks = useRef(null);

    useEffect(() => {

        let { body } = document;
        if (visible.isVision)
            body.style.marginRight = "-17px";
        else 
            body.removeAttribute("style");

        return () => body.removeAttribute("style");
    }, [visible]);

    useEffect(() => {

        setData(getModerationData);
        setVersions(getModerationData);
    }, [getModerationData]);

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

    if (storeAuth?.data?.user?.roles?.moderator?.length === 0 || !storeAuth.isLogged)
        return (
            <section className="moderate">
                <InfoModal
                    isError={true}
                    show={true}
                    returnToMain={true}
                    text={errorText.moderation}
                />
            </section>
        )
    return (
        <section className="moderate">
            {data.length === 0 && 
                <button className="requestBtn" onClick={() => getModeration(setError)}>Получить модерируемые работы</button>
            }
            <section className="contentBattleWorks" ref={gridWorks} style={{gridTemplateColumns: getGridColumns(gridWidth, data)}}>
                {
                data.map((param, index) =>
                    <ModerateWorkItem
                        key={param.id}
                        image={getPreviewImageURL(
                            param.authorMockupURL
                        )}
                        acceptWork={() => setVersions(works => getRefreshedWorks(works, param.id, 2))}
                        rejectWork={() => setVersions(works => getRefreshedWorks(works, param.id, 3))}
                        chooseWork={() => setVisible({
                            isVisible: true,
                            index: index
                        })}
                    />
                )} 
            </section>
            {data.length !== 0 &&
                <button className="requestBtn" onClick={() => moderation(versions, setError)}>Отправить промодерированные работы</button>
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
                images={data.map(param => ({src: getWorkImageURL(param.authorMockupURL), alt: "Работа "+param.work?.author?.name}))}
                activeIndex={visible.index}
                zoomSpeed={0.5}
                noToolbar={true}
            />
        </section>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getModeration: (immediatlySetData) => dispatch(getModeration(immediatlySetData)),
    moderation: (versions, immediatlySetData) => dispatch(moderation(versions, immediatlySetData))
})

const mapStateToProps = (state) => ({
    getModerationData: state.ajaxReducer.getModerationData
})

export default connect(mapStateToProps, mapDispatchToProps)(Moderate);