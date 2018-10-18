export const GET_LINE = 'api/GET_LINE';
export const GET_LINE_SUCCESS = 'api/GET_LINE_SUCCESS';
export const GET_SUB_LINE_SUCCESS = 'api/GET_SUB_LINE_SUCCESS';

export const SENT_DATA = 'api/SENT_DATA';
export const SENT_DATA_SUCCESS = 'api/SENT_DATA_SUCCESS';

export const DEL_DATA = 'api/DEL_DATA';
export const DEL_DATA_SUCCESS = 'api/DEL_DATA_SUCCESS';

export const GET_LINE_FAIL = 'api/GET_LINE_FAIL';


export const LOGOFF = 'api/LOGOFF';
export const LOGOFF_SUCCESS = 'api/LOGOFF_SUCCESS';
export const LOGOFF_FAIL = 'api/LOGOFF_FAIL';

export const LOGIN = 'api/LOGIN';
export const LOGIN_SUCCESS = 'api/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'api/LOGIN_FAIL';
export const CLEAR_LOGIN_FAIL = 'api/CLEAR_LOGIN_FAIL';

export const CLEAR_TUNNEL = 'api/CLEAR_TUNNEL';

export const GENERATE = 'api/GENERATE';
export const GENERATE_SUCCESS = 'api/GENERATE_SUCCESS';
export const GENERATE_FAIL = 'api/GENERATE_FAIL';

export function login(data){
    return {
        apiMethod: LOGIN,
        type: LOGIN,
        successAction:[LOGIN_SUCCESS],
        errorAction:LOGIN_FAIL,
        requestMethod: 'post',
        customUrl:'login',
        data,
    };
}

export function logOff(){
    return {
        apiMethod: LOGOFF,
        type: LOGOFF,
        successAction:[LOGOFF_SUCCESS],
        errorAction:LOGOFF_FAIL,
        requestMethod: 'post',
        customUrl:'logoff',
    };
}

export function clearLoginFail(){
    return {
        type: CLEAR_LOGIN_FAIL,
    };
}

export function clearTunnel(){
    return {
        type: CLEAR_TUNNEL,
    };
}

export function getData() {
    return {
        apiMethod: GET_LINE,
        type: GET_LINE,
        successAction:[GET_LINE_SUCCESS],
        errorAction:GET_LINE_FAIL,
        requestMethod: 'get',
        customUrl:'data'
        // query:{firsParam:"firsParam",secondParam:"secondParam"},
        // data:{client:"clientsData"},
        // pending:"no matter",
    };
}


export function sentData(data){
    return {
        apiMethod: SENT_DATA,
        type: SENT_DATA,
        successAction:[SENT_DATA_SUCCESS],
        errorAction:GET_LINE_FAIL,
        requestMethod: 'post',
        data,
    };
}

export function delData(delId){
    console.log("delId",delId)
    return {
        apiMethod: DEL_DATA,
        type: DEL_DATA,
        successAction:[DEL_DATA_SUCCESS],
        errorAction:GET_LINE_FAIL,
        requestMethod: 'del',
        data:{delId},

    };
}

export function addData(delId){
    return {
        apiMethod: DEL_DATA,
        type: DEL_DATA,
        successAction:[DEL_DATA_SUCCESS],
        errorAction:GET_LINE_FAIL,
        requestMethod: 'post',

    };
}

export function changeData(data){
    return {
        apiMethod: SENT_DATA,
        type: SENT_DATA,
        successAction:[SENT_DATA_SUCCESS],
        errorAction:GET_LINE_FAIL,
        requestMethod: 'put',
        data,
    };
}

export function generateHTML(id){
    return {
        apiMethod: GENERATE,
        type: GENERATE,
        successAction:[GENERATE_SUCCESS],
        errorAction:GENERATE_FAIL,
        requestMethod: 'post',
        customUrl:'generate',
        data:{id},
    };
}