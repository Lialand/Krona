/**
 * Данный компонент отображает окно визарда перед появлением модального
 * окна загрузки работы.
 */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { compose } from "redux";

import withReactPortal from "../HOC/withReactPortal";
import FirstPageWizard from "./WizardPages/FirstPageWizard";
import SecondPageWizard from "./WizardPages/SecondPageWizard";
import UploadModal from "./UploadModal/UploadModal";

import "./UploadWizard.scss";

import setCloseOnEsc from "utils/setCloseOnEsc";

function UploadWizard(props) {

    const {
        storeBattle, 
        myWorksData,
        lastBattleData
    } = props;

    const [uploadWorkId, setUploadWorkId] = useState(0);
    const [chsdActive, setChsdActive] = useState({refreshWork: true});
    const [chsdWork, setChsdWork] = useState(0);
    const [page, setPage] = useState(1); 
    //page: 1 - выбор отправки: обновить работу или отправить новую; 2 - обновление работы; 3 - модальное окно отправки работы

    useEffect(() => {
        
        setUploadWorkId(0);
        setChsdActive({refreshWork: true});
    }, [props.isOpen]);

    //Блок кода блокирует скролл, если модальное окно открыто, устанавливает "закрыть" на esc
    //и устанавливает первую страницу визарда
    useEffect(() => {

        if (myWorksData.length === 0) 
            setPage(3);
        else 
            setPage(1);

        let y = window.scrollY;

        setCloseOnEsc(props.close);
        window.onscroll = () => window.scrollTo(0, y);

        return () => {
            window.onscroll = () => {};
            setCloseOnEsc(props.closeModal, true);
        };
    }, []);

    return (
        <section className="wizardWrapper" onClick={props.outSideClose}>
            <div className="uploadWizard">
            <button
                className="exitBtn"
                onClick={props.close}
            />
                <h4>{`Баттл "${storeBattle.name}"`}</h4>
                <>
                    {page === 1 && 
                        <FirstPageWizard
                            setPage={setPage}
                            setChsdActive={setChsdActive}
                            chsdActive={chsdActive}
                        />
                    }
                    {page === 2 && 
                        <SecondPageWizard
                            setUploadWorkId={setUploadWorkId}
                            setChsdWork={setChsdWork}
                            chsdWork={chsdWork}
                            myWorksData={myWorksData}
                            setPage={setPage}
                        />
                    }
                    {page === 3 && 
                        <Scrollbars 
                            style={{width: "650px", height: "700px"}}
                        >
                            <UploadModal
                                back={() => {
                                    chsdActive.refreshWork
                                        ? setPage(2)
                                        : setPage(1)
                                }}
                                isMyWorks={myWorksData.length !== 0}
                                successUploaded={props.successUploaded}
                                battleId={storeBattle.id}
                                workId={uploadWorkId}
                            />
                        </Scrollbars>
                    }
                </>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({
    storeBattle: state.reducer.storeBattle,

    lastBattleData: state.ajaxReducer.lastBattleData,
    myWorksData: state.ajaxReducer.myWorksData,
});

export default compose(connect(mapStateToProps, null), withReactPortal)(UploadWizard);
