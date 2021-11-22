import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from "react-redux";
import { compose } from "redux";

import { getWorkDetailed } from "../../redux/actions/AjaxActions";
import withReactPortal from "../HOC/withReactPortal";

import getNewResultsArray from "../../shared/utils/getNewResultsArray";
import setCloseOnEsc from "../../shared/utils/setCloseOnEsc";
import ModalResultsItem from "./ModalResultsItem";

import "./ModalResults.scss";

function ModalResults(props) { 
    const {
        workId,
        placeValue,
        placeMaxValue,
        outSideClose,
        closeModal,

        getWorkDetailed,
        workDetailedData,
        workDetailedError,
        workDetailedStart
    } = props;

    const isMobile = useMediaQuery({ maxWidth: 540 });

    const [detailedData, setDetailedData] = useState([]);

    useEffect(() => {

        getWorkDetailed(workId);

        if (workDetailedError) 
            console.log(workDetailedError);

    }, [workId]);

    useEffect(() => {
        if (workDetailedData?.grades) {
            if (workDetailedData.grades[0]?.group !== null) {
                setDetailedData(getNewResultsArray(workDetailedData.grades, placeValue, placeMaxValue));
            } else {
                setDetailedData(workDetailedData.grades);
            }
        }
    }, [workDetailedData]);

    useEffect(() => {

        let y = window.scrollY;

        setCloseOnEsc(closeModal);
        window.onscroll = () => window.scrollTo(0, y);

        return () => {
            window.onscroll = () => {};
            setCloseOnEsc(closeModal, true);
        };
    }, []);

    if (
        workDetailedStart || 
        workDetailedError !== "" || 
        !workDetailedData?.grades
    ) 
        return <></>;
    return (
        <section 
            className="modalWrapper" 
            onClick={outSideClose}
        >
            <div className="modalResults">
                {!isMobile && 
                    <header className="modalResultsHeader">
                        <div 
                            onClick={closeModal} 
                            className="closeModal"
                        >
                            <img src="/assets/images/cross-white.svg" className="closeModalImage" />
                        </div>
                    </header>
                }
                <Scrollbars 
                    style={{paddingBottom: "48px", maxHeight: isMobile ? "100%" : "460px"}}
                    renderTrackVertical={() => isMobile ? <div style={{display: "none"}}></div> : <div className="scrollTrack" />}
                    renderThumbVertical={() => isMobile ? <div style={{display: "none"}}></div> : <div className="scrollThumb" />}
                >
                    <ModalResultsItem 
                        detailedData={detailedData}
                    />
                </Scrollbars>
            </div>
            {isMobile &&
            <>
                <div className="emptyCloseModalBlock"></div>
                <div className="closeModalBlock">
                    <div 
                        onClick={closeModal} 
                        className="closeModal"
                    >
                        <img src="/assets/images/cross-black.svg" className="closeModalImage" />
                    </div>
                </div>
            </>
            }
        </section>
    )
};

const mapStateToProps = (state) => ({
    workDetailedData: state.ajaxReducer.workDetailedData,
    workDetailedError: state.ajaxReducer.workDetailedError,
    workDetailedStart: state.ajaxReducer.workDetailedStart,
});

const mapDispatchToProps = (dispatch) => ({
    getWorkDetailed: (workId) => dispatch(getWorkDetailed(workId)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withReactPortal)(ModalResults);