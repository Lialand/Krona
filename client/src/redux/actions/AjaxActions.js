import axios from "axios";

import {
    worksURL,
    myWorksURL,
    battleDetailedURL,
    workDetailedURL,
    resultsURL,
    likeURL,
    battlesURL,
    lastBattleURL,
    authURL,
    logoutURL,
    registerURL,
    uploadURL,
    usersURL,
    approveUserSiteURL,
    adminBattleDetailedURL,
    criterionsURL,
    categoriesURL,
    moderateURL,
    restorePasswordURL,
    gradesURL,
    filterURL
} from "constants/URLs";
import {
    WORKS_START,
    WORKS_DATA,
    WORKS_ERROR,
    MY_WORKS_START,
    MY_WORKS_DATA,
    MY_WORKS_ERROR,
    BATTLES_START,
    BATTLES_DATA,
    BATTLES_ERROR,
    BATTLE_DETAILED_START,
    BATTLE_DETAILED_DATA,
    BATTLE_DETAILED_ERROR,
    GET_BATTLE_DETAILED_ALL_START,
    GET_BATTLE_DETAILED_ALL_DATA,
    GET_BATTLE_DETAILED_ALL_ERROR,
    CHANGE_BATTLE_DETAILED_ALL_START,
    CHANGE_BATTLE_DETAILED_ALL_SUCCESS,
    CHANGE_BATTLE_DETAILED_ALL_ERROR,
    CHANGE_BATTLE_DETAILED_ALL_RESET,
    WORK_DETAILED_START,
    WORK_DETAILED_DATA,
    WORK_DETAILED_ERROR,
    AUTH_START,
    AUTH_DATA,
    AUTH_ERROR,
    ACTIVATION_START,
    ACTIVATION_DATA,
    ACTIVATION_ERROR,
    REGISTRATION_START,
    REGISTRATION_DATA,
    REGISTRATION_ERROR,
    RESULTS_START,
    RESULTS_DATA,
    RESULTS_ERROR,
    USERS_START,
    USERS_DATA,
    USERS_ERROR,
    UPLOAD_START,
    UPLOAD_DATA,
    UPLOAD_ERROR,
    LIKE_START,
    LIKE_DATA,
    LIKE_ERROR,
    LAST_BATTLE_START,
    LAST_BATTLE_ERROR,
    LAST_BATTLE_DATA,
    APPROVE_USER_SITE_START,
    APPROVE_USER_SITE_ERROR,
    CATEGORIES_START,
    CATEGORIES_DATA,
    CATEGORIES_ERROR,
    CRITERIONS_START,
    CRITERIONS_DATA,
    CRITERIONS_ERROR,
    RESTORE_PASSWORD_START,
    RESTORE_PASSWORD_SUCCESS,
    RESTORE_PASSWORD_ERROR,
    GET_MODERATION_START,
    GET_MODERATION_ERROR,
    GET_MODERATION_DATA,
    MODERATION_START,
    MODERATION_ERROR,
    GET_GRADES_START,
    GET_GRADES_DATA,
    GET_GRADES_ERROR,
    CHANGE_GRADES_START,
    CHANGE_GRADES_SUCCESS,
    CHANGE_GRADES_ERROR,
    GRADES_RESET,
    PUT_FILTERED_START,
    PUT_FILTERED_SUCCESS,
    PUT_FILTERED_ERROR,
    RESET_WORKS_TRANSFER
} from "../actionsTypes/ActionTypes";

import createWorksMap from "utils/createWorksMap";
import getWorksWithVersions from "utils/getWorksWithVersions";
import { setStoreAuth, setStoreBattle } from "./Actions";
import { getErrorBehavior } from "utils/errorUtils";
import { startApp, startGoToBattle } from "./MainActions";

//Запрос на получение всех работ по id баттла
export function getWorks(battleId = "zeroing") {
    if (battleId === "zeroing") {
        return dispatch => {
            dispatch(dataWorks([]));
        }
    }
    return dispatch => {
        dispatch(startWorks());

        axios 
            .get(worksURL(battleId))
            .then(res => {
                dispatch(dataWorks(getWorksWithVersions(res.data)));
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorWorks(err.response?.data?.message));
            });
    }
}

const startWorks = () => ({
    type: WORKS_START
});
const dataWorks = data => ({
    type: WORKS_DATA,
    payload: data
});
const errorWorks = error => ({
    type: WORKS_ERROR,
    payload: error
});

//Запрос на получение собственных работ пользователя
export function getMyWorks(battleId) {
    return dispatch => {
        dispatch(startMyWorks());

        axios 
            .get(myWorksURL(battleId))
            .then(res => {
                dispatch(dataMyWorks(res.data));
            })
            .catch(err => {
                getErrorBehavior(err);
                if (err.response.status === 404)
                    dispatch(dataMyWorks([]));
                dispatch(errorMyWorks(err.response?.data?.message));
            });
    }
}

const startMyWorks = () => ({
    type: MY_WORKS_START
});
const dataMyWorks = data => ({
    type: MY_WORKS_DATA,
    payload: data
});
const errorMyWorks = error => ({
    type: MY_WORKS_ERROR,
    payload: error
});

//Запрос на получение всех баттлов
export function getBattles() {
    return dispatch => {
        dispatch(startBattles());

        axios 
            .get(battlesURL)
            .then(res => {
                dispatch(dataBattles(res.data));
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorBattles(err.response?.data?.message));
            });
    }
}

const startBattles = () => ({
    type: BATTLES_START
});
const dataBattles = data => ({
    type: BATTLES_DATA,
    payload: data
});
const errorBattles = error => ({
    type: BATTLES_ERROR,
    payload: error
});

//Запрос на получение последнего баттла
export function getLastBattle(isSetCurrentBattle = false) {
    return dispatch => {
        dispatch(startLastBattle());

        axios 
            .get(lastBattleURL)
            .then(res => {
                dispatch(dataLastBattle(res.data));
                if (isSetCurrentBattle)
                    dispatch(setStoreBattle(res.data));
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorLastBattle(err.response?.data?.message));
            });
    }
}

const startLastBattle = () => ({
    type: LAST_BATTLE_START
});
const errorLastBattle = error => ({
    type: LAST_BATTLE_ERROR,
    payload: error
});
const dataLastBattle = data => ({
    type: LAST_BATTLE_DATA,
    payload: data
});

//Запрос на получение детальной информации баттла
export function getBattleDetailed(battleId) {
    return dispatch => {
        dispatch(startBattleDetailed());

        axios 
            .get(battleDetailedURL(battleId))
            .then(res => {
                dispatch(dataBattleDetailed(res.data));
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorBattleDetailed(err.response?.data?.message));
            });
    }
}

const startBattleDetailed = () => ({
    type: BATTLE_DETAILED_START
});
const dataBattleDetailed = data => ({
    type: BATTLE_DETAILED_DATA,
    payload: data
});
const errorBattleDetailed = error => ({
    type: BATTLE_DETAILED_ERROR,
    payload: error
});

//Запрос на получение детальной информации баттла администратором 
export function getBattleDetailedAll(battleId, immediatlySetData = null) {
    return dispatch => {
        dispatch(startGetBattleDetailedAll());

        axios
            .get(adminBattleDetailedURL(battleId))
            .then(res => {
                dispatch(dataGetBattleDetailedAll(res.data));
                if (immediatlySetData !== null)
                    immediatlySetData(res.data);
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorGetBattleDetailedAll(err.response?.data?.message));
            });
    }
}

const startGetBattleDetailedAll = () => ({
    type: GET_BATTLE_DETAILED_ALL_START
});
const dataGetBattleDetailedAll = data => ({
    type: GET_BATTLE_DETAILED_ALL_DATA,
    payload: data
});
const errorGetBattleDetailedAll = error => ({
    type: GET_BATTLE_DETAILED_ALL_ERROR,
    payload: error
});

//Запрос на редактирование детальной информации баттла или создание баттла администратором 
export function changeBattleDetailedAll(method, battleData, battleId = null) {
    return dispatch => {
        dispatch(startChangeBattleDetailedAll());

        axios
            [method](adminBattleDetailedURL(method === "post" ? null : battleId), battleData)
            .then(res => {
                dispatch(getBattles());
                dispatch(successChangeBattleDetailedAll(true));
                method === "post" 
                    ? console.log("Баттл успешно создан") 
                    : dispatch(getBattleDetailedAll(battleId));
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorChangeBattleDetailedAll(err.response?.data?.message));
            });
    }
}

const startChangeBattleDetailedAll = () => ({
    type: CHANGE_BATTLE_DETAILED_ALL_START
});
const successChangeBattleDetailedAll = error => ({
    type: CHANGE_BATTLE_DETAILED_ALL_SUCCESS,
    payload: error
});
const errorChangeBattleDetailedAll = error => ({
    type: CHANGE_BATTLE_DETAILED_ALL_ERROR,
    payload: error
});
export const resetChangeBattleDetailedAll = () => ({
    type: CHANGE_BATTLE_DETAILED_ALL_RESET
})

//Запрос на получение списка типов категорий и категорий оценок баттла 
export function getCategories(immediatlySetData = null) {
    return dispatch => {
        dispatch(startCategories());

        axios 
            .get(categoriesURL)
            .then(res => {
                dispatch(dataCategories(res.data));
                if (immediatlySetData) 
                    immediatlySetData(res.data);
            })
            .catch(err => {
                getErrorBehavior(err);
                if (err.response.status === 404)
                    dispatch(dataCategories([]));
                dispatch(errorCategories(err.response?.data?.message));
            });
    }
}

const startCategories = () => ({
    type: CATEGORIES_START
});
const dataCategories = data => ({
    type: CATEGORIES_DATA,
    payload: data
});
const errorCategories = error => ({
    type: CATEGORIES_ERROR,
    payload: error
});

//Запрос на получение списка критериев баттла 
export function getCriterions(immediatlySetData = null) {
    return dispatch => {
        dispatch(startCriterions());

        axios 
            .get(criterionsURL)
            .then(res => {
                dispatch(dataCriterions(res.data));
                if (immediatlySetData) 
                    immediatlySetData(res.data);
            })
            .catch(err => {
                getErrorBehavior(err);
                if (err.response?.status === 404)
                    dispatch(dataCriterions([]));
                dispatch(errorCriterions(err.response?.data?.message));
            });
    }
}

const startCriterions = () => ({
    type: CRITERIONS_START
});
const dataCriterions = data => ({
    type: CRITERIONS_DATA,
    payload: data
});
const errorCriterions = error => ({
    type: CRITERIONS_ERROR,
    payload: error
});

//Запрос на получение детальной информации работы
export function getWorkDetailed(workId) {
    if (workId === "zeroing") {
        return dispatch => {
            dispatch(dataWorkDetailed({}));
        }
    }
    return dispatch => {
        dispatch(startWorkDetailed());

        axios 
            .get(workDetailedURL(workId))
            .then(res => {
                dispatch(dataWorkDetailed(res.data));
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorWorkDetailed(err.response?.data?.message));
            });
    }
}

const startWorkDetailed = () => ({
    type: WORK_DETAILED_START
});
const dataWorkDetailed = data => ({
    type: WORK_DETAILED_DATA,
    payload: data
});
const errorWorkDetailed = error => ({
    type: WORK_DETAILED_ERROR,
    payload: error
});

//////
//Запрос на информацию о статусе пользователя
export function getAuth() {
    return dispatch => {
        dispatch(startAuth());

        axios 
            .get(authURL)
            .then((response) => response.data)
            .then(data => {
                if (data.status === "Unauthorized") {
                    dispatch(
                        setStoreAuth({
                            isLogged: false
                        })
                    )
                } else { 
                    dispatch(
                        setStoreAuth({
                            isLogged: true,
                            data
                        })
                    )
                }
            })
    }
}

//Запрос на выход из личного кабинета
export function getLogout(storeBattle) {
    return dispatch => {
        dispatch(startAuth());

        axios 
            .get(logoutURL)
            .then(() => {
                dispatch(startApp());
                if (storeBattle?.name)
                    dispatch(startGoToBattle(storeBattle));
            });
    }
}

const startAuth = () => ({
    type: AUTH_START
});
const errorAuth = error => ({
    type: AUTH_ERROR,
    payload: error
});
//////

//Запрос на регистрацию 
export function getRegistration() {
    return dispatch => {
        dispatch(startRegistration());

        axios 
            .get(registerURL)
            .then(res => {
                dispatch(dataRegistration(res.data));
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorRegistration(err.response?.data?.message));
            });
    }
}

const startRegistration = () => ({
    type: REGISTRATION_START
});
const dataRegistration = data => ({
    type: REGISTRATION_DATA,
    payload: data
});
const errorRegistration = error => ({
    type: REGISTRATION_ERROR,
    payload: error
});

//Запрос на активацию аккаунта
export function getActivation(activateUrl) {
    return dispatch => {
        dispatch(startActivation());

        axios
            .get(activateUrl)
            .then(res => {
                dispatch(dataActivation(res.data));
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorActivation(err.response?.data?.message));
            })
    }
}

const startActivation = () => ({
    type: ACTIVATION_START
});
const dataActivation = data => ({
    type: ACTIVATION_DATA,
    payload: data
});
const errorActivation = error => ({
    type: ACTIVATION_ERROR,
    payload: error
});

//Запрос на получение итогов баттла
export function getResults(battleId = "zeroing") {
    if (battleId === "zeroing")
        return dispatch => {
            dispatch(dataResults([]));
        }
    return dispatch => {
        dispatch(startResults());

        axios 
            .get(resultsURL(battleId))
            .then(res => {
                dispatch(dataResults({
                    ...res.data,
                    worksMap: createWorksMap(res.data.works)
                }));
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorResults(err.response?.data?.message));
            });
    }
}

const startResults = () => ({
    type: RESULTS_START
});
const dataResults = data => ({
    type: RESULTS_DATA,
    payload: data
});
const errorResults = error => ({
    type: RESULTS_ERROR,
    payload: error
});

//Запрос на получение списка пользователей
export function getUsers(immediatlySetData = null) {
    return dispatch => {
        dispatch(startUsers());

        axios
            .get(usersURL)
            .then(res => {
                dispatch(dataUsers(res.data.users));
                if (immediatlySetData !== null)
                    immediatlySetData(res.data.users);
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorUsers(err.response?.data?.message));
            })
    }
}

const startUsers = () => ({
    type: USERS_START
});
const dataUsers = data => ({
    type: USERS_DATA,
    payload: data
});
const errorUsers = error => ({
    type: USERS_ERROR,
    payload: error
});

//Запрос на получение модерируемых работ
export function getModeration(immediatlySetData = null) {
    return dispatch => {
        dispatch(startGetModeration());

        axios
            .get(moderateURL)
            .then(res => {
                dispatch(dataGetModeration(res.data.versions));
                if (immediatlySetData !== null)
                    immediatlySetData(res.data.versions);
            })
            .catch(err => {
                dispatch(dataGetModeration([]));
                getErrorBehavior(err);
                dispatch(errorGetModeration(err.response?.data?.message));
                if (immediatlySetData !== null && err?.response?.status === 404)
                    immediatlySetData({ 
                        text: "Отсутствуют модерируемые работы",
                        isError: true 
                    });
            })
    }
}

const startGetModeration = () => ({
    type: GET_MODERATION_START
});
const dataGetModeration = data => ({
    type: GET_MODERATION_DATA,
    payload: data
});
const errorGetModeration = error => ({
    type: GET_MODERATION_ERROR,
    payload: error
});

//Запрос на модерацию работ
export function moderation(versions, immediatlySetData = null) {
    return dispatch => {
        dispatch(startModeration());

        axios
            .put(moderateURL, {
                moderatedVersions: {
                    versions
                }
            })
            .then(res => {
                dispatch(getModeration());
                if (immediatlySetData !== null)
                    immediatlySetData({ 
                        text: "Модерация работ успешно завершена!",
                        isError: true 
                    });
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorModeration(err.response?.data?.message));
            })
    }
}

const startModeration = () => ({
    type: MODERATION_START
});
const errorModeration = error => ({
    type: MODERATION_ERROR,
    payload: error
});

//Запрос на восстановление пароля
export function restorePassword(params, immediatlySetData = null) {
    return dispatch => {
        dispatch(startRestorePassword());

        axios
            .post(restorePasswordURL, params)
            .then(res => {
                dispatch(successRestorePassword(res.data));
                if (immediatlySetData !== null)
                    immediatlySetData("success");
            })
            .catch(err => {
                getErrorBehavior(err);
                dispatch(errorRestorePassword(err.response?.data?.message));
                if (immediatlySetData !== null)
                    immediatlySetData("error");
            })
    }
}

const startRestorePassword = () => ({
    type: RESTORE_PASSWORD_START,
});
const successRestorePassword = data => ({
    type: RESTORE_PASSWORD_SUCCESS,
    payload: data
});
const errorRestorePassword = error => ({
    type: RESTORE_PASSWORD_ERROR,
    payload: error
});

export function getApproveUserSite(formData, setPrompt) {
    return dispatch => {
        dispatch(startApproveUserSite());

        axios
            .post(approveUserSiteURL, formData)
            .then(
                res => {
                    setPrompt({
                        isError: false,
                        text: "Соцсеть успешно подтверждена",
                        show: true
                    });
                },
                err => {
                    
                    const { message } = err.response?.data;
                    
                    getErrorBehavior(err);
                    dispatch(errorApproveUserSite(message));
                    setPrompt({
                        isError: true,
                        text: err.response?.status === 401 ? "Сначала авторизуйтесь" : message,
                        show: true
                    });
                }
            )
    }
}

const startApproveUserSite = () => ({
    type: APPROVE_USER_SITE_START
});
const errorApproveUserSite = err => ({
    type: APPROVE_USER_SITE_ERROR,
    payload: err
});

//Запрос на получение оценок работ
export function getGrades(battleId, immediatlySetData = null) {
    return dispatch => {
        dispatch(startGetGrades());

        axios
            .get(gradesURL(battleId))
            .then(res => {
                dispatch(dataGetGrades(res.data.works));
                if (immediatlySetData !== null)
                    immediatlySetData(res.data.works);
            })
            .catch(err => {
                dispatch(errorGetGrades(err.response?.data?.message));
            })
    }
}

const startGetGrades = () => ({
    type: GET_GRADES_START,
});
const dataGetGrades = data => ({
    type: GET_GRADES_DATA,
    payload: data
});
const errorGetGrades = error => ({
    type: GET_GRADES_ERROR,
    payload: error
});

//Запрос на изменение оценок работ
export function changeGrades(grades, immediatlySetData = null) {
    return dispatch => {
        dispatch(startChangeGrades());

        axios
            .put(gradesURL(), grades)
            .then(res => {
                dispatch(successChangeGrades(true));
                if (immediatlySetData !== null)
                    immediatlySetData(true);
            })
            .catch(err => {
                dispatch(errorChangeGrades(err.response?.data?.message));
            })
    }
}

const startChangeGrades = () => ({
    type: CHANGE_GRADES_START,
});
const successChangeGrades = data => ({
    type: CHANGE_GRADES_SUCCESS,
    payload: data
});
const errorChangeGrades = error => ({
    type: CHANGE_GRADES_ERROR,
    payload: error
});
export const resetGrades = () => ({
    type: GRADES_RESET
});

//Запрос на перевод работ на второй этап
export function putFiltered(works, immediatlySetData = null) {
    return dispatch => {
        dispatch(startPutFiltered());

        axios
            .put(filterURL, works)
            .then(res => {
                dispatch(successPutFiltered(true));
                if (immediatlySetData !== null)
                    immediatlySetData(true);
            })
            .catch(err => {
                dispatch(errorPutFiltered(err.response?.data?.message));
            })
    }
}

const startPutFiltered = () => ({
    type: PUT_FILTERED_START,
});
const successPutFiltered = data => ({
    type: PUT_FILTERED_SUCCESS,
    payload: data
});
const errorPutFiltered = error => ({
    type: PUT_FILTERED_ERROR,
    payload: error
});
export const resetWorksTransfer = () => ({
    type: RESET_WORKS_TRANSFER
});

//Запрос на загрузку работы на сервер
// export function getUpload() {
//     return dispatch => {
//         dispatch(startUpload());

//         axios({
//             url: uploadURL,
//             method: "POST",
//             data: body,
//             onUploadProgress: (progressEvent) => {
//                 setProgress(Math.round(
//                     (progressEvent.loaded * 100) / progressEvent.total
//                 ));
//             },
//         }).then(
//             (response) => {
//                 props.successUploaded();
//             },
//             (error) => {
//                 console.log(JSON.stringify(error.response.data.message).replace(/"/g, ""));
//                 setErrorChange(true);
//             }
//         );
//     }
// }

// const startUpload = () => ({
//     type: UPLOAD_START
// });
// const dataUpload = data => ({
//     type: UPLOAD_DATA,
//     payload: data
// });
// const errorUpload = error => ({
//     type: UPLOAD_ERROR,
//     payload: error
// });

// export function getLike(workId) {
//     return dispatch => {
//         dispatch(startLike());

//         axios 
//             .get(likeURL(workId))
//             .then(res => {
//                 dispatch(dataLike(res.data));
//             })
//             .catch(err => {
//                 getErrorBehavior(err);
//                 dispatch(errorLike(err.response?.data?.message));
//             });
//     }
// }

// const startLike = () => ({
//     type: LIKE_START
// });
// const dataLike = data => ({
//     type: LIKE_DATA,
//     payload: data
// });
// const errorLike = error => ({
//     type: LIKE_ERROR,
//     payload: error
// });