import React, { useState, useEffect } from "react";

import AuthModal from "components/Auth/AuthModal";
import InfoModal from "components/InfoModal/InfoModal";

import "./Profile.scss";

export default function Profile(props) {

    const {
        storeAuth,
        logout
    } = props;

    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
    const [notice, setNotice] = useState({
        isError: false,
        type: "",
        show: false,
        text: ""
    });

    useEffect(() => {

        if (!notice.isError && notice.show) {
            setIsOpenAuthModal(false);
            setIsOpenSuccessModal(true)
        }
    }, [notice]);

    return (
        <div className="profile">
            {storeAuth.isLogged !== undefined && 
            (storeAuth.isLogged
                ?
                <div className="profileBlock">
                    {/* <Link to={profile} className="profileData"> */}
                    <div className="profileData">
                        <img src={"/"+storeAuth?.data?.user?.avatar} alt="" className="profileImage" />
                        <span className="profileName">{storeAuth?.data?.user?.name || storeAuth?.data?.user?.login}</span>
                    </div>
                    {/* </Link> */}
                    <img 
                        src="/assets/images/logout.svg" 
                        onClick={logout} 
                        className="logImage" 
                        alt="logoutImage" 
                    />
                </div>
                :
                <button className="profileBlock enterSite" variant="primary" onClick={() => setIsOpenAuthModal(true)}>
                    <img src="/assets/images/logout.svg" className="logImage" alt="logoutImage" />
                    Вход / регистрация
                </button>
            )}
            <AuthModal 
                show={isOpenAuthModal} 
                close={() => setIsOpenAuthModal(false)}
                notice={notice}
                setNotice={setNotice}
            />
            <InfoModal
                OK={() => setIsOpenSuccessModal(false)}
                text={notice.text}
                show={isOpenSuccessModal}
            />
        </div> 
    )
}