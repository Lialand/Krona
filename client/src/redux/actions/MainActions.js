import store from "../store/Store";
import { 
    getBattles,
    getAuth,
    getLastBattle,
    getWorks,
    getResults,
    getBattleDetailed
} from "./AjaxActions";
import {
    setStoreFilteredWorks
} from "./Actions";

//Начальные запросы приложения
export function startApp() {
    return dispatch => {
        dispatch(getBattles());
        dispatch(getAuth());
        dispatch(getLastBattle());
    }
}

//Запросы при переходе на баттл
export function startGoToBattle(storeBattle) {
    return dispatch => {
        dispatch(setStoreFilteredWorks([]));
        dispatch(getWorks(storeBattle.id));
        dispatch(getBattleDetailed(storeBattle.id));
        if (storeBattle.battleStageId === 6)
            dispatch(getResults(storeBattle.id));
    };
}