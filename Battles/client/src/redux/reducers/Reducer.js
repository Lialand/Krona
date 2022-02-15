import {
    AUTH,
    BATTLE,
    WORKS_VIEWING,
    WORK_CHANGED,
    WORK_ID,
    SCROLL_WORKS_VALUE,
    SCROLL_RESULTS_VALUE,
    BATTLE_SWITCH,
    FILTERED_BATTLES,
    FILTERED_WORKS
} from "./../actionsTypes/ActionTypes";

const initialState = {
    storeAuth: { isLogged: undefined },
    storeWorkChanged: false,
    storeBattle: {},
    storeWorkId: null,
    storeScrollWorksValue: 0,
    storeScrollResultsValue: 0,
    storeWorksViewing: [],
    release: true,
    storeBattleSwitch: false,
    storeFilteredBattles: [],
    storeFilteredWorks: [],
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case AUTH:
            return { 
                ...state, 
                authError: "",
                authStart: false,
                storeAuth: action.payload
            };
        case WORK_CHANGED:
            return { ...state, storeWorkChanged: action.payload };
        case BATTLE:
            return { 
                ...state, 
                lastBattleError: "",
                lastBattleStart: false,
                storeBattle: action.payload 
            };
        case WORKS_VIEWING:
            return { ...state, storeWorksViewing: action.payload };
        case WORK_ID:
            return { ...state, storeWorkId: action.payload };
        case SCROLL_WORKS_VALUE:
            return { ...state, storeScrollWorksValue: action.payload };
        case SCROLL_RESULTS_VALUE:
            return { ...state, storeScrollResultsValue: action.payload };
        case BATTLE_SWITCH:
            return { ...state, storeBattleSwitch: action.payload };
        case FILTERED_BATTLES:
            return { ...state, storeFilteredBattles: action.payload };
        case FILTERED_WORKS:
            return { ...state, storeFilteredWorks: action.payload };
        default:
            return state;
    }
}
