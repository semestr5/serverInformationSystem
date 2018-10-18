import {

    PENDING,
    SUCCESS,
    FAIL,

} from '../actions/commonConst';


import {

    CHANGE_HISTORY,
    SET_ASKING_ID

} from '../actions/history';

import {
    GET_LINE_SUCCESS,
    GET_SUB_LINE_SUCCESS,
    GET_LINE_FAIL,
    GENERATE_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_LOGIN_FAIL,
    LOGOFF_SUCCESS,
    CLEAR_TUNNEL

} from '../actions/api';

const initialState = {
    mystr: '2222',
    servLine:'init',
    content:false,
    template:'',
    askId:'',
    isModer:false,
    loginErr:false,
    tunnelMe:false,
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
                content:action.result.mas,
                [action.originalAction]: SUCCESS,
            };
        case GET_LINE_FAIL:
            return {
                ...state,
                [action.originalAction]: FAIL,
            };
        case GET_SUB_LINE_SUCCESS:
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
        case GENERATE_SUCCESS:
        console.log("action",action)
            return {
                ...state,
                template:action.result
            };
        case SET_ASKING_ID:
        console.log("SET_ASKING_ID",action.id)
            return {
                ...state,
                askId: action.id
            };
        case LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS")
                return {
                    ...state,
                    isModer:true,
                    tunnelMe:true,
                };
        case LOGIN_FAIL:
                console.log("LOGIN_FAIL")
                    return {
                        ...state,
                        loginErr:true,
                    };
        case CLEAR_LOGIN_FAIL:
                    console.log("CLEAR_LOGIN_FAIL")
                        return {
                            ...state,
                            loginErr:false,
                        };
        case CLEAR_TUNNEL:
                    return {
                            ...state,
                            tunnelMe:false,
                        };
        case LOGOFF_SUCCESS:
                        return {
                            ...state,
                            tunnelMe:false,
                            isModer:false,
                        };                
        default:
            return state;

    }
};
