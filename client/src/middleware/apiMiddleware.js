import requestApi from '../tools/requestAPI';
import setActionTypeStatus from '../helpers/setActionTypeStatus';

import { PENDING, SUCCES_MODE, FAIL_MODE } from '../redux/actions/commonConst';




function dispatchResult(next, data, followingActions,originalAction, mode) {

    const types = Array.isArray(followingActions) ? followingActions : [followingActions];
console.log("data",data,"types",types)
if(types[0]=="api/GENERATE_SUCCESS"){
    types.forEach(type => next({type, 'result':{data}, originalAction:setActionTypeStatus(originalAction) }));
}else{
    types.forEach(type => next({type, 'result':{...data}, originalAction:setActionTypeStatus(originalAction) }));
}
}


export default store => next => action => {
    const handler = (error, result) => {
console.log("result",result)

        if (error || result.error || (result.body && (result.body.errors || result.body.error))) {
            error = error || result.error || (result.body && (result.body.errors || result.body.message));
            if (Array.isArray(error) && error.length > 0) {
                error = error[0];
            }
            if (typeof error === 'object' && ('detail' in error)) {
                error = error.detail;
            }
            dispatchResult(next, error, action.errorAction, action.type, FAIL_MODE);
            return;
        }
        if (result.text && !result.body) {
            try {
                result.body = JSON.parse(result.text);
            } catch (e) {
                result.body = result.text;
            }
        }
        console.log("result.body",result)
        dispatchResult(next, result.body, action.successAction,action.type, SUCCES_MODE);
    };



    if ('apiMethod' in action) {
        if('pending' in action){
            const originalAction = setActionTypeStatus(action.apiMethod);
            next({type:PENDING,originalAction});
        }
        requestApi(action).end(handler);
    }

    if (action.type) {
        //skip unprocessed action
        return next(action);
    }
};