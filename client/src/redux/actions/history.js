export const CHANGE_HISTORY = 'history/CHANGE_HISTORY';

export const SET_ASKING_ID = 'history/SET_ASKING_ID';

export function changeHistory() {
    return {
        type: CHANGE_HISTORY,
    };
}

export function setAskingId(id) {
    return {
        type: SET_ASKING_ID,
        id
    };
}