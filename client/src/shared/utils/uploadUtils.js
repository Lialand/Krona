import axios from "axios";

import store from "reduxFolder/store/Store";
import { getAuth } from "reduxFolder/actions/AjaxActions";

//Предварительная проверка файла
export function prevCheck(prevCheckArgs) {

    const {
        startUploading,
        fileChoosed,
        setError,
        setSendConfirm
    } = prevCheckArgs;

    if (startUploading) //Если началась загрузка файла
        return;

    if (!fileChoosed) { //Если файл не выбран
        setError({
            isError: true, 
            text: "Сначала загрузите работу"
        });
    } else {
        setSendConfirm(true); //Доступ к отправке работы
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
                text: "Загрузите не более одного изображения"
            });
        } else if (file[0]?.type !== "image/jpeg" && file[0]?.type !== "image/png") {
            setError({
                isError: true, 
                text: `Файл <b>${file[0]?.name}</b> имеет недопустимый формат`
            });
        } else if ((file[0].size / 1024 / 1024) > 10) {
            setError({
                isError: true, 
                text: `Файл <b>${file[0]?.name}</b> превышает 10 MB`
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
        setFileChoosed(true);
    };

    reader.onload = () => setPreviewImage(`url("${reader.result}")`);
    reader.onerror = () => {
        setError({
            isError: true, 
            text: `Произошла ошибка при чтении изображения: ${file[0]?.name}`
        })
    }
}

//Функция для отправки формы с файлом, id баттла, id работы и комментарием
export function sendForm(sendFormArgs) {

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
                    text: "Сначала авторизуйтесь"
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