/**
 * Данный компонент отображает окно визарда перед появлением модального
 * окна загрузки работы.
 */

import React, { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";

import WorkItem from "../../Works/WorkItem";

import {
    getPreviewImageURL,
    getWorkImageURL,
} from "utils/userImageUtils";

export default function SecondPageWizard(props) {
 
    const {
        myWorks,
        setUploadWorkId,
        setChsdWork,
        setPage,
        chsdWork,
        isSecondStage
    } = props;

    useEffect(() => {
        
        setUploadWorkId(myWorks[0]?.id);
    }, []);

    return (
        <div className="changeWork">
            <h3>Выберите работу для обновления</h3>
            <Scrollbars 
                style={{width: "650px", height: "360px"}}
            >
                <div className="worksList">
                    {myWorks?.map((param, i) => (
                        <WorkItem
                            chooseWork={() => {
                                setUploadWorkId(param.id);
                                setChsdWork(i);
                            }}
                            isModal={true}
                            chsdWork={i === chsdWork}
                            key={"workItemWizard_" + i}
                            image={getPreviewImageURL(
                                param.versions[0]?.authorMockupURL
                            )}
                            param={param}
                        />
                    ))}
                </div>
            </Scrollbars>
            <div className="buttons move">
                {!isSecondStage &&
                <button onClick={() => setPage(1)}>
                    Назад
                </button>
                }
                <button
                    onClick={() => setPage(3)}
                >
                    Продолжить
                </button>
            </div>
        </div>
    );
}