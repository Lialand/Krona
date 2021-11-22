//Для состояний без AJAX

export const AUTH = "AUTH"; //данные об авторизации пользователя
export const WORK_CHANGED = "WORK_CHANGED"; //данные о загрузке/удалении работы
export const BATTLE = "BATTLE"; //данные баттла
export const WORKS_VIEWING = "WORKS_VIEWING";   //данные о работах для просмотра
export const WORK_ID = "WORK_ID";   //данные об id просматриваемой работы
export const HIDE_NAVIGATION = "HIDE_NAVIGATION";   //данные о том, скрывать ли меню навигации
export const HIDE_HEADER = "HIDE_HEADER";   //данные о том, скрывать ли хедер с данными о баттле
export const SCROLL_WORKS_VALUE = "SCROLL_WORKS_VALUE"; //данные о том, насколько пролистана страница с работами
export const SCROLL_RESULTS_VALUE = "SCROLL_RESULTS_VALUE"; //данные о том, насколько пролистана страница с итогами
export const BATTLE_SWITCH = "BATTLE_SWITCH"; //данные о том, щёлкнул ли пользователь на баттл (нужно в Works.js)
export const FILTERED_BATTLES = "FILTERED_BATTLES"; //данные об отфильтрованных баттлах 
export const FILTERED_WORKS = "FILTERED_WORKS"; //данные об отфильтрованных работах

//Для состояний внутри модального окна загрузки работы

export const RESET = "RESET"; 
export const ERROR = "WORK_CHANGED"; 
export const j2 = "BATTLE"; 
export const j3 = "WORKS_VIEWING";   

//Для AJAX

//Все работы
export const WORKS_START = "WORKS_START";
export const WORKS_DATA = "WORKS_DATA";
export const WORKS_ERROR = "WORKS_ERROR";
//Мои работы
export const MY_WORKS_START = "MY_WORKS_START";
export const MY_WORKS_DATA = "MY_WORKS_DATA";
export const MY_WORKS_ERROR = "MY_WORKS_ERROR";
//Баттлы
export const BATTLES_START = "BATTLES_START";
export const BATTLES_DATA = "BATTLES_DATA";
export const BATTLES_ERROR = "BATTLES_ERROR";
//Детальная информация баттла
export const BATTLE_DETAILED_START = "BATTLE_DETAILED_START";
export const BATTLE_DETAILED_DATA = "BATTLE_DETAILED_DATA";
export const BATTLE_DETAILED_ERROR = "BATTLE_DETAILED_ERROR";
//Детальная информация работы
export const WORK_DETAILED_START = "WORK_DETAILED_START";
export const WORK_DETAILED_DATA = "WORK_DETAILED_DATA";
export const WORK_DETAILED_ERROR = "WORK_DETAILED_ERROR";
///Данные об авторизованном пользователе или вход/выход из личного кабинета
export const AUTH_START = "AUTH_START";
export const AUTH_DATA = "AUTH_DATA";
export const AUTH_ERROR = "AUTH_ERROR";
//Регистрация
export const REGISTRATION_START = "REGISTRATION_START";
export const REGISTRATION_DATA = "REGISTRATION_DATA";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";
//Активация аккаунта
export const ACTIVATION_START = "ACTIVATION_START";
export const ACTIVATION_DATA = "ACTIVATION_DATA";
export const ACTIVATION_ERROR = "ACTIVATION_ERROR";
//Итоги баттла
export const RESULTS_START = "RESULTS_START";
export const RESULTS_DATA = "RESULTS_DATA";
export const RESULTS_ERROR = "RESULTS_ERROR";
//Загрузка работы в баттл
export const UPLOAD_START = "UPLOAD_START";
export const UPLOAD_DATA = "UPLOAD_DATA";
export const UPLOAD_ERROR = "UPLOAD_ERROR";
//Выставление лайка
export const LIKE_START = "LIKE_START";
export const LIKE_DATA = "LIKE_DATA";
export const LIKE_ERROR = "LIKE_ERROR";
//Запрос на получение последнего баттла
export const LAST_BATTLE_START = "LAST_BATTLE_START";
export const LAST_BATTLE_ERROR = "LAST_BATTLE_ERROR";
export const LAST_BATTLE_DATA = "LAST_BATTLE_DATA";