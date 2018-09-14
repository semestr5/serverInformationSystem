import {

    PENDING,
    SUCCESS,
    FAIL,

} from '../actions/commonConst';


import {

    CHANGE_HISTORY,

} from '../actions/history';

import {
    GET_LINE_SUCCESS,
    GET_SUB_LINE_SUCCESS,
    GET_LINE_FAIL,

} from '../actions/api';

const initialState = {
    mystr: '2222',
    servLine:'init',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PENDING:
            return {
                ...state,
                [action.originalAction]: PENDING,
            };
        case CHANGE_HISTORY:
            return {
                ...state,
                mystr: "changedStr"
            };
        case GET_LINE_SUCCESS:
            return {
                ...state,
                [action.originalAction]: SUCCESS,
            };
        case GET_LINE_FAIL:
            return {
                ...state,
                [action.originalAction]: FAIL,
            };
        case GET_SUB_LINE_SUCCESS:
            console.log("GET_SUB_LINE_SUCCESS act",action)
            return {
                ...state,
                "servLine": action.result.some,
                [action.originalAction]: SUCCESS,
            };
        case GET_LINE_FAIL:
            return {
                ...state,
                servLine: "fail"
            };
        default:
            return state;

    }
};