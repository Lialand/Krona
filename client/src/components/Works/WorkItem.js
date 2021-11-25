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
} from "constants/pages";

export default function ItemWork(props) {

    const { 
        param,
        chsdWork,
        isModal,
        chooseWork,
        image,
        setLike,
        workForLike,
        myLikes,
        isBest,
        placeImage,
        place
    } = props;

    const { battleId } = useParams();
    const { pathname } = useLocation();

    return (
        <div className="contentBlock">
            {chsdWork && <div className="choosed-symbol active" />}
            {isModal 
                ? 
                <div
                    className="imageContainer"
                    style={{ backgroundImage: "url(" + image + ")" }}
                    onClick={chooseWork}
                >
                    {isBest && (
                        <div className="blockMedal">
                            <img src="/assets/images/medal.svg" />
                        </div>
                    )}
                </div>
                : 
                <Link
                    to={{pathname: battleWithParamURL(+battleId)+work_viewing+param.id+"/", state: {prevPath: pathname}}}
                    onClick={chooseWork}
                    className="workLink"
                >
                    <img 
                        src={image} 
                        className="image"
                    />
                </Link>
            }
            <WorkItemFooter
                param={param} 
                chsdWork={chsdWork}
                setLike={setLike}
                workForLike={workForLike}
                myLikes={myLikes}
                isBest={isBest}
                placeImage={placeImage}
                place={place}
            />
        </div>
    );
}
