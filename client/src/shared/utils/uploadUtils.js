import axios from "axios";

import store from "reduxFolder/store/Store";
import { getAuth } from "reduxFolder/actions/AjaxActions";
import getImageSizes from "utils/getImageSizes";
const constants = require("server/constants");
const { MIN_SOURCE_IMAGE_WIDTH_PX } = constants;

//Предварительная проверка файла
export function prevCheck(prevCheckArgs) {

    const {
        startUploading,
        fileChoosed,
        setError,
        setSendConfirm
    } = prevCheckArgs;

    if (startUploading) //Если началась загрузка файла
        return false;

    if (!fileChoosed) { //Если файл не выбран
        setError({
            isError: true,
            text: "Отсутствует файл работы"
        });
        return false;
    } else {
        setSendConfirm(true); //Доступ к отправке работы
        return true;
    }
}

//Проверка свойств изображения
export function checkImage(file, checkImageArgs, readImageArgs) {

    const {
        fileChoosed,
        redact,
        setError
    } = checkImageArgs;

    if (!fileChoosed || fileChoosed && redact) {
        let reader = new FileReader();

        if (file?.length > 1) {
            setError({
                isError: true,
                text: "Загружено более одной работы"
            });
        } else if (file[0]?.type !== "image/jpeg" && file[0]?.type !== "image/png") {
            setError({
                isError: true,
                text: `Файл имеет недопустимый формат`
            });
        } else if ((file[0].size / 1024 / 1024) > 10) {
            setError({
                isError: true,
                text: `Файл превышает 10 MB`
            });
        } else {
            reader.readAsDataURL(file[0]);
            readImage(reader, readImageArgs, file);
        };

    }
}

//Чтение изображения для получения его ширины и установки превью
function readImage(reader, readImageArgs, file) {

    const {
        setError,
        setFileChoosed,
        setPreviewImage
    } = readImageArgs;

    reader.onloadstart = () => {
        setError({
            isError: false,
            text: ""
        });
        setFileChoosed(true);
    };

    reader.onload = () => {
        getImageSizes(reader.result).then(
            (resolve) => {

                if (resolve.width < MIN_SOURCE_IMAGE_WIDTH_PX) {
                    setError({
                        isError: true,
                        text: `Файл < ${MIN_SOURCE_IMAGE_WIDTH_PX}px по ширине`
                    });
                    setFileChoosed(false);
                } else {
                    setPreviewImage(`url("${reader.result}")`);
                }
            },
            (reject) => {
                console.log(reject);
            }
        );
    };
    reader.onerror = () => {
        setError({
            isError: true,
            text: `Произошла ошибка при чтении файла`
        })
    }
}

//Функция для отправки формы с файлом, id баттла, id работы и комментарием
export function sendForm(sendFormArgs, prevCheckArgs) {

    const {
        setStartUploading,
        setDragOverStyle,
        form,
        fileDataDnD,
        setProgress,
        setError,
        battleId,
        workId,
        successUploaded
    } = sendFormArgs;

    if (!prevCheck(prevCheckArgs))
        return;

    setStartUploading(true); //Установлено начало загрузки работы
    setDragOverStyle("dragOver"); //Установлен стиль окна загрузки работы

    let body = new FormData(form.current);

    body.append("battleId", battleId);
    body.append("workId", workId);

    if (fileDataDnD)
        body.set("file", fileDataDnD[0]);

    axios({
        url: "/api/user/work/upload",
        method: "POST",
        data: body,
        onUploadProgress: (progressEvent) => {
            setProgress(Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            ));
        },
    }).then(
        (response) => {
            successUploaded();
        },
        (error) => {
            if (error.response.status === 401) {
                setError({
                    isError: true,
                    text: "Для отправки работы необходимо авторизоваться"
                });
                store.dispatch(getAuth());
            } else {
                setError({
                    isError: true,
                    text: error.response.data.message
                });
            }

        }
    );
}