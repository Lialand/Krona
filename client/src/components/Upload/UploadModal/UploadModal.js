/**
 * Данный компонент отображает модальное окно загрузки работы.
 */

import React, { useState, useRef, useEffect } from "react";

import ButtonsUnderForm from "./ButtonsUnderForm";
import ErrorMessage from "./ErrorMessage";
import LabelSymbols from "./LabelSymbols";

import { 
    checkImage,
    prevCheck,
    sendForm  
} from "../../../shared/utils/uploadUtils";

import "./UploadModal.scss";

export default function UploadModal(props) {

    const [progress, setProgress] = useState(null); //прогресс загрузки работы
    const [error, setError] = useState({
        isError: false, 
        text: ""
    }); //состояние ошибки
    const [fileChoosed, setFileChoosed] = useState(false); //был ли выбран файл для загрузки
    const [dragOverStyle, setDragOverStyle] = useState(""); //css класс для оформления окна загрузки при поднесении к нему файла для загрузки
    const [fileDataDnD, setFileDataDnD] = useState(null); //данные файла для загрузки Drag&Drop
    const [previewImage, setPreviewImage] = useState(null); //url для загрузки превью изображения
    const [startUploading, setStartUploading] = useState(false); //началась ли загрузка файла на сервер
    const [tooWide, setTooWide] = useState(false); //слишком ли широкое изображение (для превью)
    const [sendConfirm, setSendConfirm] = useState(false); //нажата ли кнопка для подтверждения отправки работы
    const [valueTextArea, setValueTextArea] = useState(""); //хранит текст, написанный в поле для комментария
    const [redact, setRedact] = useState(false); //включает режим редактирования (есть картинка -> грузим другую)

    const uploadWindow = useRef(null);
    const form = useRef(null);
    const file = useRef(null);
    const errorMessage = useRef(null);

    //Объекты являются аргументами для функций отображения ошибок и загрузки работы на сервер
    const prevCheckArgs = {
        startUploading,
        fileChoosed,
        setError,
        setSendConfirm
    };
    const sendFormArgs = { 
        battleId: props.battleId,
        workId: props.workId,
        successUploaded: props.successUploaded,

        setStartUploading,
        setDragOverStyle,
        form,
        fileDataDnD,
        setProgress,
        setError
    };
    const checkImageArgs = {
        fileChoosed,
        redact,
        setError
    };
    const readImageArgs = {
        setTooWide,
        setError,
        setFileChoosed,
        setPreviewImage
    };
    ///////////////////////////

    //Функция возвращает все состояния к исходным
    function clearAll(e) {
        if (e) 
            e.preventDefault();
        setFileChoosed(false);
        setFileDataDnD(null);
        setPreviewImage(null);
        setStartUploading(false);
        setProgress(null);
        setDragOverStyle("");
        setError({
            isError: false,
            errorText: ""
        });
    }

    //В этом методе контролируются события для drag&drop
    useEffect(() => {

        if (!fileChoosed) {
            const dragEvents = {
                drag: "drag",
                dragstart: "dragstart",
                dragend: "dragend",
                dragover: "dragover",
                dragenter: "dragenter",
                dragleave: "dragleave",
                drop: "drop",
            };
            for (let item in dragEvents) {
                uploadWindow.current.addEventListener(item, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });
            }

            uploadWindow.current
                .addEventListener(dragEvents.dragover,
                    () => setDragOverStyle("dragOver")
                );
            uploadWindow.current
                .addEventListener(dragEvents.dragenter,
                    () => setDragOverStyle("dragOver")
                );
            uploadWindow.current
                .addEventListener(dragEvents.dragstart,
                    () => setDragOverStyle("")
                );
            uploadWindow.current
                .addEventListener(dragEvents.dragleave,
                    () => setDragOverStyle("")
                );
            uploadWindow.current
                .addEventListener(dragEvents.drop,
                    (e) => {
                        setDragOverStyle("");
                        setFileDataDnD(e.dataTransfer.files);
                        checkImage(e.dataTransfer.files, checkImageArgs, readImageArgs);
                            
                    }
                );
        }
    });

    //В этом методе устанавливается текст ошибки (нужно для правильной работы тегов <b></b>)
    useEffect(() => { 

        if (error.isError && errorMessage.current !== null) {
            errorMessage.current.innerHTML = error.text;
        }
    }, [error.text, errorMessage]);

    return (
        <div className="uploadModal">
            {!sendConfirm
                ? <h3>Отправка работы</h3>
                : <h3>Уверены, что все ввели верно?</h3>
            }
            <form
                ref={form}
                onSubmit={(e) => e.preventDefault()}
                className="workUploadWindow"
            >
                <label
                    className={dragOverStyle}
                    ref={uploadWindow}
                    draggable="true"
                    htmlFor="inputFile"
                    style={{
                        border: fileChoosed ? "" : !error.isError ? "dashed 3px rgba(1, 1, 1, 0.2)" : "dashed 3px #06B667",
                        cursor: (!fileChoosed && !error.isError) ? "pointer" : "",
                        backgroundSize: !tooWide ? "cover" : "contain",
                        backgroundImage: previewImage,
                        backgroundColor: !fileChoosed ? "" : !tooWide ? "rgba(255, 255, 255, 0.5)" : "rgba(230, 248, 240, 1)",
                        backgroundPosition: !tooWide ? "center top" : "center center",
                    }}
                >
                    <input
                        name="file"
                        type="file"
                        id="inputFile"
                        className="inputFile"
                        onChange={(e) => {
                            if (e.target.files.length !== 0) {
                                clearAll(e);
                                checkImage(e.target.files, checkImageArgs, readImageArgs);
                            };
                            setRedact(false);
                        }}
                        ref={file}
                        onClick={(e) => (fileChoosed && !redact || error.isError) ? e.preventDefault() : e}
                    />
                    {error.isError &&
                        <ErrorMessage
                            errorText={<span ref={errorMessage} id="errorMessageUploadText" />}
                            errorClose={(e) => {
                                e.preventDefault();
                                setError({
                                    isError: false, 
                                    text: ""
                                })
                            }
                            }
                        />
                    }
                    <LabelSymbols
                        fileChoosed={fileChoosed}
                        error={error}
                        sendConfirm={sendConfirm}
                        setRedact={() => setRedact(true)}
                        clearAll={e => clearAll(e)}
                        progress={progress}
                    />
                </label>
                <div className="workinfo">
                    <p>Описание работы</p>
                    {
                        !sendConfirm
                            ?
                            <textarea name="versionComment"
                                id="inputText" className="inputfield"
                                value={valueTextArea}
                                onChange={e => setValueTextArea(e.target.value)}
                            />
                            :
                            <div className="inputfield checking">{valueTextArea || <span style={{color: "pink"}}>Вы не написали комментарий (необязательно)</span>}</div>
                    }
                    <ButtonsUnderForm
                        back={!sendConfirm ? props.back : () => setSendConfirm(false)}
                        send={() => !sendConfirm ? prevCheck(prevCheckArgs) : sendForm(sendFormArgs)}
                        buttonBackText={!sendConfirm ? "Назад" : "Нет, вернуться назад"}
                        buttonSendText={!sendConfirm ? "Отправить работу" : "Да, отправить работу"}
                        isMyWorks={props.isMyWorks}
                    />
                </div>
            </form>
        </div>
    );
}
