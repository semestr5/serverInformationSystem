export const GET_LINE = 'api/GET_LINE';
export const GET_LINE_SUCCESS = 'api/GET_LINE_SUCCESS';
export const GET_SUB_LINE_SUCCESS = 'api/GET_SUB_LINE_SUCCESS';




export const GET_LINE_FAIL = 'api/GET_LINE_FAIL';



export function getData() {
    return {
        apiMethod: GET_LINE,
        type: GET_LINE,
        successAction:[GET_LINE_SUCCESS,GET_SUB_LINE_SUCCESS],
        errorAction:GET_LINE_FAIL,
        requestMethod: 'post',
        query:{firsParam:"firsParam",secondParam:"secondParam"},
        data:{client:"clientsData"},
        pending:"no matter",
    };
}