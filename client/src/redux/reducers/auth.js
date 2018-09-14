
import {

    CHANGE_LOGIN,

} from '../actions/auth';


const initialState = {
    login: "initLogin"
};

export default (state = initialState, action) => {
    console.log("auth reduc")

    switch (action.type) {
        case "AUTH":
            return {
                ...state,
                login: "changedLOGIN"
            };
        case CHANGE_LOGIN:
            return {
                ...state,
                login: "changedLOGIN"
            };
        default:
            return state;
    }
};
