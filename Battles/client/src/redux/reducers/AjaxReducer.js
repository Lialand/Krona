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
} from "./../actionsTypes/ActionTypes";

const initialState = {
    worksStart: false,
    worksData: [],
    worksError: "",
    battleDetailedStart: false,
    battleDetailedData: {},
    battleDetailedError: "",
    getBattleDetailedAllStart: false,
    getBattleDetailedAllData: {},
    getBattleDetailedAllError: "",
    changeBattleDetailedAllStart: false,
    changeBattleDetailedAllSuccess: false,
    changeBattleDetailedAllError: "",
    catergoriesStart: false,
    catergoriesData: [],
    catergoriesError: "",
    criterionsStart: false,
    criterionsData: [],
    criterionsError: "",
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
    getGradesStart: false,
    getGradesData: [],
    getGradesError: "",
    changeGradesStart: false,
    changeGradesSuccess: false,
    changeGradesError: "",
    restorePasswordStart: false,
    restorePasswordSuccess: false,
    restorePasswordError: "",
    usersStart: false,
    usersData: [],
    usersError: "",
    uploadStart: false,
    uploadData: {},
    uploadError: "",
    likeStart: false,
    likeData: {},
    likeError: "",
    lastBattleStart: false,
    lastBattleError: "",
    lastBattleData: {},
    approveUserSiteStart: false,
    approveUserSiteError: "",
    getModerationStart: false,
    getModerationError: "",
    getModerationData: [],
    moderationStart: false,
    moderationError: "",
    putFilteredStart: false,
    putFilteredSuccess: false,
    putFilteredError: "",
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
        //Детальная информация баттла для редактирования администратором
        case GET_BATTLE_DETAILED_ALL_START: 
            return { 
                ...state, 
                getBattleDetailedAllStart: true 
            };
        case GET_BATTLE_DETAILED_ALL_DATA: 
            return { 
                ...state, 
                getBattleDetailedAllData: action.payload,
                getBattleDetailedAllError: "",
                getBattleDetailedAllStart: false
            };
        case GET_BATTLE_DETAILED_ALL_ERROR: 
            return { 
                ...state, 
                getBattleDetailedAllError: action.payload,
                getBattleDetailedAllStart: false
            };        
        case CHANGE_BATTLE_DETAILED_ALL_START: 
            return { 
                ...state, 
                changeBattleDetailedAllError: "",
                changeBattleDetailedAllStart: false
            };
        case CHANGE_BATTLE_DETAILED_ALL_SUCCESS: 
            return { 
                ...state, 
                changeBattleDetailedAllSuccess: action.payload,
                changeBattleDetailedAllError: "",
                changeBattleDetailedAllStart: false
            };
        case CHANGE_BATTLE_DETAILED_ALL_ERROR: 
            return { 
                ...state, 
                changeBattleDetailedAllError: action.payload,
                changeBattleDetailedAllStart: false
            }; 
        case CHANGE_BATTLE_DETAILED_ALL_RESET:
            return {
                ...state, 
                changeBattleDetailedAllError: "",
                changeBattleDetailedAllSuccess: false,
                changeBattleDetailedAllStart: false
            }
        //Категории
        case CATEGORIES_START: 
            return { 
                ...state, 
                catergoriesStart: true 
            };
        case CATEGORIES_DATA: 
            return { 
                ...state, 
                catergoriesData: action.payload,
                catergoriesError: "",
                catergoriesStart: false
            };
        case CATEGORIES_ERROR: 
            return { 
                ...state, 
                catergoriesError: action.payload,
                catergoriesStart: false
            };
        //Критерии и типы критериев оценок
        case CRITERIONS_START: 
            return { 
                ...state, 
                criterionsStart: true 
            };
        case CRITERIONS_DATA: 
            return { 
                ...state, 
                criterionsData: action.payload,
                criterionsError: "",
                criterionsStart: false
            };
        case CRITERIONS_ERROR: 
            return { 
                ...state, 
                criterionsError: action.payload,
                criterionsStart: false
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
        //Список пользователей
        case USERS_START: 
            return { 
                ...state, 
                usersStart: true 
            };
        case USERS_DATA: 
            return { 
                ...state, 
                usersData: action.payload,
                usersError: "",
                usersStart: false
            };
        case USERS_ERROR: 
            return { 
                ...state, 
                usersError: action.payload,
                usersStart: false
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
        //Подтверждение соцсети
        case APPROVE_USER_SITE_START: 
            return { 
                ...state, 
                approveUserSiteStart: true 
            };
        case APPROVE_USER_SITE_ERROR: 
            return { 
                ...state, 
                approveUserSiteError: action.payload,
                approveUserSiteStart: false
            };
        //Восстановление пароля
        case RESTORE_PASSWORD_START: 
            return { 
                ...state, 
                restorePasswordStart: true 
            };
        case RESTORE_PASSWORD_ERROR: 
            return { 
                ...state, 
                restorePasswordError: action.payload,
                restorePasswordStart: false
            };
        case RESTORE_PASSWORD_SUCCESS: 
            return { 
                ...state, 
                restorePasswordData: action.payload,
                restorePasswordError: "",
                restorePasswordStart: false
            };
        //Модерация работ
        case GET_MODERATION_START: 
            return { 
                ...state, 
                getModerationStart: true 
            };
        case GET_MODERATION_ERROR: 
            return { 
                ...state, 
                getModerationError: action.payload,
                getModerationStart: false
            };
        case GET_MODERATION_DATA: 
            return { 
                ...state, 
                getModerationData: action.payload,
                getModerationError: "",
                getModerationStart: false
            };
        case MODERATION_START: 
            return { 
                ...state, 
                moderationStart: true 
            };
        case MODERATION_ERROR: 
            return { 
                ...state, 
                moderationError: action.payload,
                moderationStart: false
            };
        //Оценки работ
        case GET_GRADES_START: 
            return { 
                ...state, 
                getGradesStart: true 
            };
        case GET_GRADES_DATA: 
            return { 
                ...state, 
                getGradesData: action.payload,
                getGradesError: "",
                getGradesStart: false
            };
        case GET_GRADES_ERROR: 
            return { 
                ...state, 
                getGradesError: action.payload,
                getGradesStart: false
            };
        case CHANGE_GRADES_START: 
            return { 
                ...state, 
                changeGradesStart: true 
            };
        case CHANGE_GRADES_SUCCESS: 
            return { 
                ...state, 
                changeGradesSuccess: action.payload,
                changeGradesError: "",
                changeGradesStart: false
            };
        case CHANGE_GRADES_ERROR: 
            return { 
                ...state, 
                changeGradesError: action.payload,
                changeGradesStart: false
            };
        case GRADES_RESET: 
            return {
                ...state,
                changeGradesSuccess: false,
                changeGradesError: "",
                changeGradesStart: false,
                getGradesData: [],
                getGradesError: "",
                getGradesStart: false
            };
        //Фильтрация работ (перевод на второй этап)
        case PUT_FILTERED_START: 
            return { 
                ...state, 
                putFilteredStart: true
            };
        case PUT_FILTERED_SUCCESS: 
            return { 
                ...state, 
                putFilteredStart: false,
                putFilteredError: "",
                putFilteredSuccess: action.payload
            };
        case PUT_FILTERED_ERROR: 
            return {
                ...state,
                putFilteredStart: false,
                putFilteredError: action.payload,
            };
        case RESET_WORKS_TRANSFER: 
            return {
                ...state,
                putFilteredError: "",
                worksError: "",
                putFilteredSuccess: false
            }
        default:
            return state;
    }
}
