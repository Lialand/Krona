import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import { getPreviewImageURL } from "utils/userImageUtils";
import { moderateURL } from "constants/URLs";
import getGridColumns from "utils/getGridColumns";

import ModerateWorkItem from "./ModerateWorkItem/ModerateWorkItem";

import "./Moderate.scss";

export default function Moderate(props) {

    const [data, setData] = useState([]);
    const [versions, setVersions] = useState([]);
    const [gridWidth, setGridWidth] = useState(0);
    const gridWorks = useRef(null);

    function sendModerWorks() {

        if (versions.length !== data.length) {
            console.log(versions);
            alert("Сначала промодерируйте все работы!");
        } else {
            axios
                .put(moderateURL, {
                    moderatedVersions: {
                        versions
                    }
                })
                .then(
                    res => {
                        alert("Модерация работ успешно завершена!");
                        getModerWorks();
                    },
                    err => {
                        if (err.response.status === 401)
                            alert("Для начала авторизуйтесь")
                        else 
                            alert(err.response.data.message);
                    }    
                )
        }
    }

    function getModerWorks() {

        axios
            .get(moderateURL)
            .then(
                res => setData(res.data.versions),
                err => {
                    if (err.response.status === 401)
                        alert("Для начала авторизуйтесь")
                    else 
                        alert(err.response.data.message);
                }    
            )
    }

    //Блок кода ниже используется для получения ширины грид-области
    const getWidth = () => {
        if (gridWorks.current) {
            setGridWidth(gridWorks.current?.offsetWidth);
        }
    }
    useEffect(() => getWidth)
    useEffect(() => {
        
        window.addEventListener("resize", () => {
            getWidth();
        });

        return () => { 
            window.removeEventListener("resize", () => {
                getWidth();
            });
        }
    }, [])
    //////////////////////

    return (
        <section className="moderate">
            {data.length === 0 && 
                <button className="requestBtn" onClick={getModerWorks}>Получить модерируемые работы</button>
            }
            <section className="contentBattleWorks" ref={gridWorks} style={{gridTemplateColumns: getGridColumns(gridWidth, data)}}>
                {
                data.map(param =>
                    <ModerateWorkItem
                        key={param.id}
                        image={getPreviewImageURL(
                            param.authorMockupURL
                        )}
                        acceptWork={() => setVersions(state => [...state, {...param, statusId: 2}])}
                        rejectWork={() => setVersions(state => [...state, {...param, statusId: 3}])}
                        // isBest={getWinner(resultsData.prizes, param.id).isWinner}
                        // place={getWinner(resultsData.prizes, param.id)?.prizeName()}
                        // placeImage={"/"+getWinner(resultsData.prizes, param.id)?.prizeImage()}
                        // chooseWork={() => {
                        //     setStoreScrollWorksValue(scrollY);
                        //     setStoreWorkId(param.id);
                        //     setStoreWorksViewing(
                        //         works.filter(
                        //             (param) => param.versions.length !== 0
                        //         )
                        //     );
                        // }}
                    />
                )} 
            </section>
            {data.length !== 0 &&
                <button className="requestBtn" onClick={sendModerWorks}>Отправить промодерированные работы</button>
            }
        </section>
    )
}