/**
 * Этот компонент является шаблоном для одной работы баттла,
 * он заполняется данными в Works.js, получаемыми с сервера в
 * App.js.
 */

import React, { useState } from "react";

export default function WorkItemFooter(props) {

    const { 
        chsdWork,
        avatar,
        name,
        versions,
        setLike,
        workForLike,
        myLikes,
        likes,
        score,
        isBest,
        placeImage,
        place,
        site
     } = props;

    const [prompt, setPrompt] = useState({});

    return (
        <footer>
            <a href={site} target="_blank">
                <img
                    src={avatar}
                    className={chsdWork ? "thumbnail active" : "thumbnail"}
                />
            </a>
            <div className="footerInfo flexcolumn">
                <a target="_blank" href={site} className="username">{name}</a>
                <div className="stat">
                    {versions &&
                    <div onMouseOver={() => setPrompt({versions: true})} onMouseOut={() => setPrompt(false)} className="statInfo statVersions">
                        <div className="item" />
                        <p>{versions}</p>
                        {prompt?.versions && <div className="prompt versions">Число версий</div>}
                    </div>}
                    {(likes || myLikes) &&
                    <div className="statInfo statLikes">
                        <div onClick={setLike} className="item" />
                        <p>{workForLike ? myLikes : likes}</p>
                    </div>}
                    {score !== 0 && score &&
                    <div onMouseOver={() => setPrompt({score: true})} onMouseOut={() => setPrompt(false)} className="statInfo statScore">
                        <div className="item" />
                        <p>{score}</p>
                        {prompt?.score && <div className="prompt score">Итоговая оценка</div>}
                    </div>}
                    {isBest && placeImage !== "/"+null && 
                    <div className="statInfo statPlace">
                        <img src={placeImage} />
                        <p className="place">
                            {place}
                        </p>
                    </div>}
                </div>
            </div>
        </footer>
    );
}
