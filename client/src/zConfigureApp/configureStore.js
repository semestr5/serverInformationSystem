import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'

import apiMiddleware from '../middleware/apiMiddleware';

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk,apiMiddleware), persistState('history'))
    );
}
