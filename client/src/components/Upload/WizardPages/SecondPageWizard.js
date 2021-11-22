/**
 * Данный компонент отображает окно визарда перед появлением модального
 * окна загрузки работы.
 */

import React from "react";

import ItemWork from "../../Works/ItemWork";

import {
    getPreviewImageURL,
    getWorkImageURL,
} from "../../../shared/utils/userImageUtils";

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
                        <ItemWork
                            chooseWork={() => {
                                setUploadWorkId(param.id);
                                setChsdWork(i);
                            }}
                            isModal={true}
                            chsdWork={i === chsdWork}
                            key={"workItemWizard_" + i}
                            images={getPreviewImageURL(
                                param.versions[0].authorMockupURL
                            )}
                            redacts={param.filtered}
                            likes={param.likes}
                            score={param.grade}
                        // avatar={param.author.avatar}
                        // name={param.author.name}
                        // isBest={param.isBest}
                        />
                    ))}
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