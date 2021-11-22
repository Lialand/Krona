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
} from "./../actionsTypes/ActionTypes";

const initialState = {
    worksStart: false,
    worksData: [],
    worksError: "",
    battleDetailedStart: false,
    battleDetailedData: {},
    battleDetailedError: "",
    myWorksStart: false,
    myWorksData: [],
    myWorksError: "",
    battlesStart: false,
    battlesData: [],
    battlesError: "",
    workDetailedStart: false,
    workDetailedData: {},
    workDetailedError: "",
    authStart: false,
    authData: {},
    authError: "",
    activationData: {},
    activationError: "",
    activationStart: false,
    registrationStart: false,
    registrationData: {},
    registrationError: "",
    resultsStart: false,
    resultsData: [],
    resultsError: "",
    uploadStart: false,
    uploadData: {},
    uploadError: "",
    likeStart: false,
    likeData: {},
    likeError: "",
    lastBattleStart: false,
    lastBattleError: "",
    lastBattleData: {}
};

export default function AjaxReducer(state = initialState, action) {
    switch (action.type) {
        //Все работы
        case WORKS_START: 
            return { 
                ...state, 
                worksStart: true 
            };
        case WORKS_DATA: 
            return { 
                ...state, 
                worksData: action.payload,
                worksError: "",
                worksStart: false
            };
        case WORKS_ERROR: 
            return { 
                ...state, 
                worksData: [],
                worksError: action.payload,
                worksStart: false
            };
        //Детальная информация баттла
        case BATTLE_DETAILED_START: 
            return { 
                ...state, 
                battleDetailedStart: true 
            };
        case BATTLE_DETAILED_DATA: 
            return { 
                ...state, 
                battleDetailedData: action.payload,
                battleDetailedError: "",
                battleDetailedStart: false
            };
        case BATTLE_DETAILED_ERROR: 
            return { 
                ...state, 
                battleDetailedError: action.payload,
                battleDetailedStart: false
            };
        //Мои работы
        case MY_WORKS_START: 
            return { 
                ...state, 
                myWorksStart: true 
            };
        case MY_WORKS_DATA: 
            return { 
                ...state, 
                myWorksData: action.payload,
                myWorksError: "",
                myWorksStart: false
            };
        case MY_WORKS_ERROR: 
            return { 
                ...state, 
                myWorksError: action.payload,
                myWorksStart: false
            };
        //Баттлы
        case BATTLES_START: 
            return { 
                ...state, 
                battlesStart: true 
            };
        case BATTLES_DATA: 
            return { 
                ...state, 
                battlesData: action.payload,
                battlesError: "",
                battlesStart: false
            };
        case BATTLES_ERROR: 
            return { 
                ...state, 
                battlesError: action.payload,
                battlesStart: false
            };
        //Подробности работы
        case WORK_DETAILED_START: 
            return { 
                ...state, 
                workDetailedStart: true 
            };
        case WORK_DETAILED_DATA: 
            return { 
                ...state, 
                workDetailedData: action.payload,
                workDetailedError: "",
                workDetailedStart: false
            };
        case WORK_DETAILED_ERROR: 
            return { 
                ...state, 
                workDetailedError: action.payload,
                workDetailedStart: false
            };
        //Информация об авторизации
        case AUTH_START: 
            return { 
                ...state, 
                authStart: true 
            };
        case AUTH_ERROR: 
            return { 
                ...state, 
                authError: action.payload,
                authStart: false
            };
        //Регистрация
        case REGISTRATION_START: 
            return { 
                ...state, 
                registrationStart: true 
            };
        case REGISTRATION_DATA: 
            return { 
                ...state, 
                registrationData: action.payload,
                registrationError: "",
                registrationStart: false
            };
        case REGISTRATION_ERROR: 
            return { 
                ...state, 
                registrationError: action.payload,
                registrationStart: false
            };
        //Активация аккаунта
        case ACTIVATION_START: 
            return { 
                ...state, 
                activationStart: true 
            };
        case ACTIVATION_DATA: 
            return { 
                ...state, 
                activationData: action.payload,
                activationError: "",
                activationStart: false
            };
        case ACTIVATION_ERROR: 
            return { 
                ...state, 
                activationError: action.payload,
                activationStart: false
            };
        //Итоги
        case RESULTS_START: 
            return { 
                ...state, 
                resultsStart: true 
            };
        case RESULTS_DATA: 
            return { 
                ...state, 
                resultsData: action.payload,
                resultsError: "",
                resultsStart: false
            };
        case RESULTS_ERROR: 
            return { 
                ...state, 
                resultsError: action.payload,
                resultsStart: false
            };
        //Загрузка работы
        case UPLOAD_START: 
            return { 
                ...state, 
                uploadStart: true 
            };
        case UPLOAD_DATA: 
            return { 
                ...state, 
                uploadData: action.payload,
                uploadError: "",
                uploadStart: false
            };
        case UPLOAD_ERROR: 
            return { 
                ...state, 
                uploadError: action.payload,
                uploadStart: false
            };
        //Лайк
        case LIKE_START: 
            return { 
                ...state, 
                likeStart: true 
            };
        case LIKE_DATA: 
            return { 
                ...state, 
                likeData: action.payload,
                likeError: "",
                likeStart: false
            };
        case LIKE_ERROR: 
            return { 
                ...state, 
                likeError: action.payload,
                likeStart: false
            };
        //Последний баттл
        case LAST_BATTLE_START: 
            return { 
                ...state, 
                lastBattleStart: true 
            };
        case LAST_BATTLE_ERROR: 
            return { 
                ...state, 
                lastBattleError: action.payload,
                lastBattleStart: false
            };
        case LAST_BATTLE_DATA: 
            return { 
                ...state, 
                lastBattleData: action.payload,
                lastBattleError: "",
                lastBattleStart: false
            };
        default:
            return state;
    }
}
