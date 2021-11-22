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
} from "../../shared/constants/URLs";
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
    UPLOAD_START,
    UPLOAD_DATA,
    UPLOAD_ERROR,
    LIKE_START,
    LIKE_DATA,
    LIKE_ERROR,
    LAST_BATTLE_START,
    LAST_BATTLE_ERROR,
    LAST_BATTLE_DATA
} from "../actionsTypes/ActionTypes";

import createWorksMap from "../../shared/utils/createWorksMap";
import { setStoreAuth } from "./Actions";

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
                dispatch(dataWorks(res.data));
            })
            .catch(err => {
                dispatch(errorWorks(err.message));
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
                dispatch(errorMyWorks(err.message));
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
                dispatch(errorBattles(err.message));
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
export function getLastBattle() {
    return dispatch => {
        dispatch(startLastBattle());

        axios 
            .get(lastBattleURL)
            .then(res => {
                dispatch(dataLastBattle(res.data));
            })
            .catch(err => {
                dispatch(errorLastBattle(err.message));
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
                dispatch(errorBattleDetailed(err.message));
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
                dispatch(errorWorkDetailed(err.message));
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
export function getLogout() {
    return dispatch => {
        dispatch(startAuth());

        axios 
            .get(logoutURL)
            .then(res => {
                dispatch(
                    setStoreAuth({
                        isLogged: false
                    })
                )
            })
            .catch(err => {
                dispatch(getAuth());
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
                dispatch(errorRegistration(err.message));
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
            dispatch(errorActivation(err));
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
                dispatch(errorResults(err.message));
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

export function getLike(workId) {
    return dispatch => {
        dispatch(startLike());

        axios 
            .get(likeURL(workId))
            .then(res => {
                dispatch(dataLike(res.data));
            })
            .catch(err => {
                dispatch(errorLike(err.message));
            });
    }
}

const startLike = () => ({
    type: LIKE_START
});
const dataLike = data => ({
    type: LIKE_DATA,
    payload: data
});
const errorLike = error => ({
    type: LIKE_ERROR,
    payload: error
});