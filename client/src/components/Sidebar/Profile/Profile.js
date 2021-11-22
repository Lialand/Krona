import React, { useState } from "react";

import AuthModal from "../../Auth/AuthModal";
import UploadWizard from "../../Upload/UploadWizard";
import SuccessUpload from "../../Upload/SuccessUpload";

import "./Profile.scss";

const openUpload = (battle, openModal) => {

    if (!battle.name) 
        alert("Не выбран баттл для загрузки");
    else if (battle.battleStageId !== 2 && battle.battleStageId !== 4)
        alert(`Нельзя загрузить работу на этот баттл. Выбран: ${battle.name}`);
    else 
        openModal();
}

export default function Profile(props) {

    const {
        isLogged,
        logout,
        storeBattle,
        refreshMyWorks
    } = props;

    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
    const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

    function closeModal(e) {

        if (e.target.tagName !== "SECTION") 
            return;

        setIsOpenAuthModal(false);
        setIsOpenUploadModal(false)
    }

    return (
        <div className="profile">
            {/* <a href="#" className="user">
                <img src="/assets/images/avatar2.png" alt="" className="profileImage" />
                <span className="profileName">sofi.webdesigner</span>
            </a> */}
            {isLogged !== undefined && 
            (isLogged
                ?
                <>
                <button className="enterSite" onClick={logout}>
                    <img src="/assets/images/logout.svg" className="logImage" alt="logoutImage" />
                    Выход
                </button>
                <button className="enterSite" onClick={() => openUpload(storeBattle, () => setIsOpenUploadModal(true))}>
                    Открыть визард
                </button>
                </>
                :
                <button className="enterSite" onClick={() => setIsOpenAuthModal(true)}>
                    <img src="/assets/images/logout.svg" className="logImage" alt="logoutImage" />
                    Вход / регистрация
                </button>
            )}
            {isOpenAuthModal && 
            <AuthModal 
                close={() => setIsOpenAuthModal(false)}
                outSideClose={e => closeModal(e)}
            />
            }
            {isOpenUploadModal &&
            <UploadWizard 
                close={() => setIsOpenUploadModal(false)}
                outSideClose={e => closeModal(e)}
                successUploaded = {() => {setIsOpenUploadModal(false); setIsOpenSuccessModal(true)}}
            />
            }
            {isOpenSuccessModal &&
                <SuccessUpload
                    OK={() => {
                        refreshMyWorks(storeBattle.id);
                        setIsOpenSuccessModal(false);
                    }}
                />
            }
        </div> 
    )
}