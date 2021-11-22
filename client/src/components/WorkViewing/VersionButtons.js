import React from "react";

export default function VersionButtons(props) {

    const { 
        activeVersion,
        oldVersion,
        newVersion
    } = props;

    return (
        <div className="versionButtons">
            <button
                className={`oldVersBtn ${activeVersion.oldVersion}`}
                onClick={oldVersion}
            >
                Первая версия
            </button>
            <button
                className={`newVersBtn ${activeVersion.newVersion}`}
                onClick={newVersion}
            >
                Последняя версия
            </button>
        </div>
    )
}