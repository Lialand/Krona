import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { success } from "constants/texts";
import getCanAddVersions from "utils/getCanAddVersions";

import UploadWizard from "components/Upload/UploadWizard";
import InfoModal from "components/InfoModal/InfoModal";

function SendWorkBtn(props) {

    const {
        lastBattleData,
        isSidebar,
        myWorksData
    } = props; 

    const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
    const [canUpload, setCanUpload] = useState(false);

    function closeModal(e) {

        if (e.target.tagName !== "SECTION") 
            return;

        setIsOpenUploadModal(false);
    }

    useEffect(() => {

        if (lastBattleData?.battleStageId === 2 || lastBattleData?.battleStageId === 4 && getCanAddVersions(myWorksData)?.length) 
            setCanUpload(true)
        else 
            setCanUpload(false)
    }, [lastBattleData, myWorksData]);

    return (
        <>
            {isSidebar
                ?
                <button 
                    onClick={() => {
                        if (canUpload) 
                            setIsOpenUploadModal(true)
                    }}
                    className="linkEvent sendBtn" 
                    style={{backgroundColor: "#E28E05"}}
                >
                    <div className="eventTop">
                        <div className="eventColor" style={{backgroundColor: "#F768E8"}}></div>
                    </div>
                    <div className="eventBottom">
                        {canUpload
                            ?
                            <>
                                <div className="eventTheme">Отправить работу на баттл: {lastBattleData.name}</div>
                                <img src="/assets/images/arrow-sidebar.svg" alt="" />
                            </>
                            :
                            <div className="eventTheme">Баттл: {lastBattleData.name}</div>
                        }
                    </div>
                </button>
                :
                canUpload
                    ?
                    <img 
                        src="/assets/images/upload.svg" 
                        className="sendBtn"
                        onClick={() => setIsOpenUploadModal(true)}
                    />
                    :
                    <></>
            }
            <UploadWizard 
                close={() => setIsOpenUploadModal(false)}
                outSideClose={e => closeModal(e)}
                show={isOpenUploadModal}
                successUploaded = {() => {
                    setIsOpenUploadModal(false);
                    setIsOpenSuccessModal(true);
                }}
            />
            <InfoModal
                OK={() => setIsOpenSuccessModal(false)}
                text={success.upload}
                show={isOpenSuccessModal}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    lastBattleData: state.ajaxReducer.lastBattleData,
    myWorksData: state.ajaxReducer.myWorksData
})

export default connect(mapStateToProps, null)(SendWorkBtn);