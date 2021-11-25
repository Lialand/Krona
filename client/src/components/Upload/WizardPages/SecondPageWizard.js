/**
 * Данный компонент отображает окно визарда перед появлением модального
 * окна загрузки работы.
 */

import React from "react";

import WorkItem from "../../Works/WorkItem";

import {
    getPreviewImageURL,
    getWorkImageURL,
} from "utils/userImageUtils";

export default function SecondPageWizard(props) {
 
    const {
        myWorksData,
        setUploadWorkId,
        setChsdWork,
        setPage,
        chsdWork
    } = props;

    return (
        <div className="changeWork">
            <h3>Выберите работу для обновления</h3>
            <div className="worksList">
                {myWorksData?.length !== 0 &&
                    myWorksData.works.map((param, i) => (
                        <WorkItem
                            chooseWork={() => {
                                setUploadWorkId(param.id);
                                setChsdWork(i);
                            }}
                            isModal={true}
                            chsdWork={i === chsdWork}
                            key={"workItemWizard_" + i}
                            image={getPreviewImageURL(
                                param.versions[0].authorMockupURL
                            )}
                            param={param}
                        />
                    ))
                }
            </div>
            <div className="buttons move">
                <button onClick={() => setPage(1)}>
                    Назад
                </button>
                <button
                    onClick={() => setPage(3)}
                >
                    Продолжить
                </button>
            </div>
        </div>
    );
}