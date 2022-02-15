import {
    AUTH,
    WORK_CHANGED,
    BATTLE,
    WORKS_VIEWING,
    WORK_ID,
    SCROLL_WORKS_VALUE,
    SCROLL_RESULTS_VALUE,
    BATTLE_SWITCH,
    FILTERED_BATTLES,
    FILTERED_WORKS,
} from "../actionsTypes/ActionTypes";

export function setStoreAuth(auth) {
    return {
        type: AUTH,
        payload: auth,
    };
}

export function setStoreWorkChanged(workChanged) {
    return {
        type: WORK_CHANGED,
        payload: workChanged,
    };
}

export function setStoreBattle(battle) {
    return {
        type: BATTLE,
        payload: battle,
    };
}

export function setStoreWorksViewing(worksViewing) {
    return {
        type: WORKS_VIEWING,
        payload: worksViewing,
    };
}

export function setStoreWorkId(workId) {
    return {
        type: WORK_ID,
        payload: workId,
    };
}

export function setStoreScrollWorksValue(scrollWorksValue) {
    return {
        type: SCROLL_WORKS_VALUE,
        payload: scrollWorksValue,
    };
}

export function setStoreBattleSwitch(boolean) {
    return {
        type: BATTLE_SWITCH,
        payload: boolean,
    };
}

export function setStoreScrollResultsValue(scrollResultsValue) {
    return {
        type: SCROLL_RESULTS_VALUE,
        payload: scrollResultsValue,
    };
}

export function setStoreFilteredBattles(filteredBattles) {
    return {
        type: FILTERED_BATTLES,
        payload: filteredBattles,
    };
}

export function setStoreFilteredWorks(filteredWorks) {
    return {
        type: FILTERED_WORKS,
        payload: filteredWorks,
    };
}