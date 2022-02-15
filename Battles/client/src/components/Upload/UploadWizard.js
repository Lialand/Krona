/**
 * Данный компонент отображает окно визарда перед появлением модального
 * окна загрузки работы.
 */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { Modal } from "react-bootstrap";

import FirstPageWizard from "./WizardPages/FirstPageWizard";
import SecondPageWizard from "./WizardPages/SecondPageWizard";
import UploadModal from "./UploadModal/UploadModal";

import "./UploadWizard.scss";

import getWorksWithVersions from "utils/getWorksWithVersions";
import getCanAddVersions from "utils/getCanAddVersions";
import { getAuth, getMyWorks } from "reduxFolder/actions/AjaxActions";

function UploadWizard(props) {

    const {
        lastBattleData, 
        myWorksData,
        storeAuth,
        getAuth,
        close,
        show,
        successUploaded
    } = props;

    const [uploadWorkId, setUploadWorkId] = useState(0);
    const [chsdActive, setChsdActive] = useState({refreshWork: true});
    const [chsdWork, setChsdWork] = useState(0);
    const [page, setPage] = useState(1); 
    //page: 1 - выбор отправки: обновить работу или отправить новую; 2 - обновление работы; 3 - модальное окно отправки работы

    useEffect(() => {

        if (show)
            getAuth();

        return () => {
            setUploadWorkId(0);
            setChsdActive({refreshWork: true});
        };
    }, [show]);

    useEffect(() => {
        
        if (!storeAuth.isLogged) {
            setPage(3);
            setChsdActive({});
        }
    }, [storeAuth]);

    useEffect(() => {

        if (lastBattleData.battleStageId === 2) {
            if (getWorksWithVersions(myWorksData.works).length === 0) 
                setPage(3);
            else 
                setPage(1);
        } else if (lastBattleData.battleStageId === 4) {
            setPage(2);
        }
    }, [myWorksData]);

    return (
        <Modal 
            onHide={close}
            show={show} 
            aria-labelledby="contained-modal-title-vcenter"
            contentClassName="uploadWizard"
            dialogClassName="dialogClass"
            centered
        >
            <button
                className="exitBtn"
                onClick={close}
            />
            <h4>{`Баттл "${lastBattleData.name}"`}</h4>
            <div className="uploadBody">
                {page === 1 && 
                    <FirstPageWizard
                        setPage={setPage}
                        setChsdActive={setChsdActive}
                        chsdActive={chsdActive}
                        setUploadWorkId={setUploadWorkId}
                    />
                }
                {page === 2 && 
                    <SecondPageWizard
                        setUploadWorkId={setUploadWorkId}
                        setChsdWork={setChsdWork}
                        chsdWork={chsdWork}
                        myWorks={lastBattleData.battleStageId === 2 ? getWorksWithVersions(myWorksData.works) : getCanAddVersions(myWorksData)}
                        setPage={setPage}
                        isSecondStage={lastBattleData.battleStageId === 4}
                    />
                }
                {page === 3 && 
                    // <Scrollbars 
                    //     style={{width: "650px", height: "600px"}}
                    // >
                        <UploadModal
                            back={() => {
                                chsdActive.refreshWork
                                    ? setPage(2)
                                    : setPage(1)
                            }}
                            isMyWorks={getWorksWithVersions(myWorksData.works).length !== 0 && storeAuth.isLogged}
                            successUploaded={successUploaded}
                            battleId={lastBattleData.id}
                            workId={uploadWorkId}
                            isLogged={storeAuth.isLogged}
                        />
                    // </Scrollbars>
                }
            </div>
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    storeAuth: state.reducer.storeAuth,
    lastBattleData: state.ajaxReducer.lastBattleData,
    myWorksData: state.ajaxReducer.myWorksData,
    myWorksStart: state.ajaxReducer.myWorksStart,
});

const mapDispatchToProps = (dispatch) => ({
    getMyWorks: (battleId) => dispatch(getMyWorks(battleId)),
    getAuth: () => dispatch(getAuth())
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadWizard);
