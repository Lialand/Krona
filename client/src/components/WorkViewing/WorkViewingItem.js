import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import ModalResults from "../ModalResults/ModalResults";
import UserInfo from "./UserInfo/UserInfo";
import ReactHelmet from "../SEO/ReactHelmet";
import VersionButtons from "./VersionButtons";

function WorkViewingItem(props) {

    const { 
        work,
        setLike,
        workForLike,
        myLikes,
        isBest,
        placeImage,
        place,

        buttonOldChanged,
        image,
        keyLeaf,
        battleName,
        battleDate,
        oldVersion,
        newVersion,
        onlyVersion,
        startImageTouch,
        moveImageTouch,
        endImageTouch,
        placeValue,
        placeMaxValue,
        workId,
        isItFirstWork,
        previousWork,
        isItLastWork,
        nextWork
    } = props;

    const [activeVersion, setActiveVersion] = useState({
        oldVersion: "",
        newVersion: "active",
    });
    const [isOpenResultsModal, setIsOpenResultsModal] = useState(false);
    const [prompt, setPrompt] = useState(false);

    const isMobile = useMediaQuery({maxWidth: 780});

    function closeModal(e) {
        if (e.target.tagName === "SECTION")
            setIsOpenResultsModal(false);
    }

    useEffect(() => {
        setActiveVersion(
            buttonOldChanged
                ? { oldVersion: "active", newVersion: "" }
                : { oldVersion: "", newVersion: "active" }
        );
    }, [image]);

    return (
        <section className="workViewing">
            <ReactHelmet isWorkViewingPage={true} username={work?.author?.name} battleName={battleName} battleDate={battleDate}  />
            <header className="workViewingHeader" >
                <UserInfo 
                    setIsOpenResultsModal={() => setIsOpenResultsModal(true)}
                    isMobile={isMobile}
                    unsetPrompt={() => setPrompt(false)}
                    setPromptVersions={() => setPrompt({versions: true})}
                    setPromptScore={() => setPrompt({score: true})}
                    prompt={prompt}
    
                    work={work}
                    setLike={setLike}
                    workForLike={workForLike}
                    myLikes={myLikes}
                    isBest={isBest}
                    placeImage={placeImage}
                    place={place}
                />
                {!onlyVersion &&
                    <VersionButtons 
                        activeVersion={activeVersion}
                        oldVersion={oldVersion}
                        newVersion={newVersion}
                    />
                }
            </header>
            <div className={onlyVersion ? "workInfo" : "workInfo onlyVersion"}>
                <img
                    src={image}
                    className="workImage"
                    id="workImage"
                    onTouchStart={startImageTouch}
                    onTouchMove={moveImageTouch}
                    onTouchEnd={endImageTouch}
                />
            </div>
            {isOpenResultsModal && 
                <ModalResults 
                    outSideClose={e => closeModal(e)}
                    closeModal={() => setIsOpenResultsModal(false)}
                    placeValue={placeValue}
                    placeMaxValue={placeMaxValue}
                    workId={workId}
                />
            }
            {!isItFirstWork && (
                <button onClick={previousWork} className="leaf leaf-back" />
            )}
            {!isItLastWork && (
                <button onClick={nextWork} className="leaf leaf-forward" />
            )}
        </section>
    );
}

export default WorkViewingItem;
