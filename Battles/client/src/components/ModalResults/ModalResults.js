import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

import { getWorkDetailed } from "reduxFolder/actions/AjaxActions";

import getNewResultsArray from "utils/getNewResultsArray";
import ModalResultsItem from "./ModalResultsItem";
import "./ModalResults.scss";

function ModalResults(props) { 
    const {
        workId,
        placeValue,
        placeMaxValue,
        closeModal,
        show,

        getWorkDetailed,
        workDetailedData,
        workDetailedError,
        workDetailedStart
    } = props;

    const isMobile = useMediaQuery({ maxWidth: 540 });

    const [detailedData, setDetailedData] = useState([]);

    useEffect(() => {

        if (workId)
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

    if (
        workDetailedStart || 
        workDetailedError !== "" || 
        !workDetailedData?.grades
    ) 
        return <></>;
    return (
        <Modal 
            onHide={closeModal}
            show={show} 
            aria-labelledby="contained-modal-title-vcenter"
            contentClassName="modalResults"
            dialogClassName="resultsDialog"
            centered
        >
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
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalResults);