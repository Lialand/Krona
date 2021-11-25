/**
 * Этот компонент является шаблоном для одной работы баттла,
 * он заполняется данными в Works.js, получаемыми с сервера в
 * App.js.
 */

import React, { useState } from "react";

import "./WorkItemFooter.scss";

export default function WorkItemFooter(props) {

    const { 
        param,
        chsdWork,
        setLike,
        workForLike,
        myLikes,
        isBest,
        placeImage,
        place
     } = props;

    const [prompt, setPrompt] = useState({});

    return (
        <footer className="workItemFooter">
            <a href={param?.author?.site} target="_blank">
                <img
                    src={"/"+param?.author?.avatar}
                    className={chsdWork ? "thumbnail active" : "thumbnail"}
                />
            </a>
            <div className="footerInfo flexcolumn">
                <a target="_blank" href={param?.author?.site} className="username">{param?.author?.name}</a>
                <div className="stat">
                    {param?.versions?.length &&
                    <div onMouseOver={() => setPrompt({versions: true})} onMouseOut={() => setPrompt(false)} className="statInfo statVersions">
                        <div className="item" />
                        <p>{param?.versions?.length}</p>
                        {prompt?.versions && <div className="prompt versions">Число версий</div>}
                    </div>}
                    {(param?.likes || myLikes) &&
                    <div className="statInfo statLikes">
                        <div onClick={setLike} className="item" />
                        <p>{workForLike ? myLikes : param?.likes}</p>
                    </div>}
                    {param?.grade !== 0 && param?.grade &&
                    <div onMouseOver={() => setPrompt({score: true})} onMouseOut={() => setPrompt(false)} className="statInfo statScore">
                        <div className="item" />
                        <p>{param?.grade}</p>
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
