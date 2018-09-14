import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import auth from '../redux/reducers/auth';
import history from '../redux/reducers/history';


const rootReducer = combineReducers({
    routing,
    auth,
    history,
});

export default rootReducer;