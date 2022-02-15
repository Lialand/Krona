import React from "react";

import "./UserInfo.scss";

export default function UserInfo(props) {

    const {
        setIsOpenResultsModal,
        isMobile,
        prompt,
        setPromptVersions,
        setPromptScore,
        unsetPrompt,
        
        work,
        setLike,
        workForLike,
        myLikes,
        isBest,
        placeImage,
        place
    } = props;

    return (
        <div className="thumbnailWorkViewing">
            <a href={work?.author?.site} className="avatarLink" target="_blank">
                <img
                    src={"/"+work?.author?.avatar}
                    className="thumbnailAvatar"
                />
            </a>
            <div className="thumbnailInfo">
                <a href={work?.author?.site} className="username" target="_blank">{work?.author?.name || work?.author?.login}</a>
                {isMobile 
                    ?
                    <div className="stat">
                        {work.versions.length &&
                        <div className="statInfo statVersions">
                            <div className="item" />
                            <p>{work.versions.length}</p>
                        </div>}
                        {(work.userLike[0]?.count || myLikes) &&
                        <div className="statInfo statLikes">
                            <div onClick={setLike} className="item" />
                            <p>{workForLike ? myLikes : work.userLike[0]?.count}</p>
                        </div>}
                        {work.grade !== 0 && work.grade &&
                        <div 
                            className="statInfo statScore"
                            onClick={setIsOpenResultsModal}
                        >
                            <div className="item" />
                            <p>{work.grade}</p>
                        </div>}
                        {isBest && placeImage !== "/"+null &&
                            <div className="statInfo">
                                <img src={placeImage} />
                                <p>{place}</p>
                            </div>
                        }
                    </div>
                    :
                    <div className="stat">
                        {isBest && placeImage !== "/"+null &&
                            <div className="statInfo"> 
                                <img src={placeImage} />
                                <p>{place}</p>
                            </div>
                        }
                        {work.versions.length &&
                        <div
                            onMouseOver={setPromptVersions} 
                            onMouseOut={unsetPrompt}  
                            className="statInfo statVersions"
                        >
                            <div className="item" />
                            <p>{work.versions.length}</p>
                            {prompt?.versions && <div className="prompt versions">Число версий</div>}
                        </div>}
                        {(work.userLike[0]?.count || myLikes) &&
                        <div className="statInfo statLikes">
                            <div onClick={setLike} className="item" />
                            <p>{workForLike ? myLikes : work.userLike[0]?.count}</p>
                        </div>}
                        {work.grade !== 0 && work.grade &&
                        <div
                            onMouseOver={setPromptScore} 
                            onMouseOut={unsetPrompt}  
                            onClick={setIsOpenResultsModal}  
                            className="statInfo statScore"
                        >
                            <div className="item" />
                            <p>{work.grade}</p>
                            {prompt?.score && <div className="prompt versions">Итоговая оценка</div>}
                        </div>}
                    </div>
                }
            </div>
        </div>
    )
}