/**
 * Этот компонент является шаблоном для одной работы баттла,
 * он заполняется данными в Works.js, получаемыми с сервера в
 * App.js.
 */

import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import WorkItemFooter from "./WorkItemFooter/WorkItemFooter";

import { 
    work_viewing,
    battleWithParamURL
} from "../../shared/constants/pages";

export default function ItemWork(props) {

    const { 
        chsdWork,
        isModal,
        workId,
        chooseWork,
        images,
        avatar,
        name,
        site,
        versions,
        setLike,
        workForLike,
        myLikes,
        likes,
        score,
        isBest,
        placeImage,
        place
     } = props;

    const { battleId } = useParams();
    const { pathname } = useLocation();

    return (
        <div className="contentBlock">
            {chsdWork && <div className={"choosed-symbol active"} />}
            {isModal ? (
                <div
                    className="imageContainer"
                    style={{ backgroundImage: "url(" + images + ")" }}
                    onClick={chooseWork}
                >
                    {isBest && (
                        <div className="blockMedal">
                            <img src="/assets/images/medal.svg" />
                        </div>
                    )}
                </div>
            ) : (
                <Link
                    to={{pathname: battleWithParamURL(+battleId)+work_viewing+workId+"/", state: {prevPath: pathname}}}
                    onClick={chooseWork}
                    className="workLink"
                >
                    <img 
                        src={images} 
                        className="image"
                    />
                </Link>
            )}
            <WorkItemFooter
                chsdWork={chsdWork}
                avatar={avatar}
                name={name}
                site={site}
                versions={versions}
                setLike={setLike}
                workForLike={workForLike}
                myLikes={myLikes}
                likes={likes}
                score={score}
                isBest={isBest}
                placeImage={placeImage}
                place={place}
            />
        </div>
    );
}
