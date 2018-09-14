import * as api from './api';
import * as auth from './auth';
import * as history from './history';
import * as commonConst from './commonConst';



export default {
    ...api ,
    ...auth,
    ...history,
    ...commonConst,
};