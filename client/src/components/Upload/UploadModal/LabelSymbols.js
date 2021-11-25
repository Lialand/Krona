import React from "react";

export default function LabelSymbols(props) {
    
    const { 
        fileChoosed,
        error,
        sendConfirm,
        setRedact,
        clearAll,
        progress
    } = props;

    return (
        <>
            {!fileChoosed ? (
                <div className="uploadWindowDescription">
                    {!error.isError
                        ? <img src="/assets/images/upload-symbol.png" />
                        : <img src="/assets/images/upload-symbol-warning.png" />
                    }
                    <div className="uploadWindowText">
                        <p className="instruction">
                            Перетащите изображение<br />
                            <small>или кликните, чтобы выбрать файл</small></p>
                        <p className="opacity">(JPG, PNG, до 10 МБ, от 900px по ширине)</p>
                    </div>
                </div>
            ) : (
                !sendConfirm &&
                <>
                    <img
                        className="icon iconRedact"
                        src="/assets/images/work-redact.svg"
                        onClick={setRedact}
                    />
                    <img
                        className="icon iconDelete"
                        src="/assets/images/work-delete.svg"
                        onClick={clearAll}
                    />
                </>
            )}
            {progress !== null &&
                <div className="progressBarWrapper">
                    <div className="progressBar" style={{ width: `${progress}%` }} />
                </div>
            }
        </>
    )
}