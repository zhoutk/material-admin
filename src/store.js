import { stateTransformer } from 'redux-seamless-immutable'
import { createStore, applyMiddleware,compose, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const loggerMiddleware = createLogger({
    collapsed:true,
    stateTransformer: stateTransformer
});

let store;

if(process.env.NODE_ENV == "development") {
    if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
        store = createStore(
            rootReducer,
            applyMiddleware(
                loggerMiddleware,
                historyMiddleware,
                sagaMiddleware
            )
        );
    } else {
        store = createStore(
            rootReducer,
            compose(applyMiddleware(
                loggerMiddleware,
                historyMiddleware,
                sagaMiddleware
            ), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
        );
    }
}else{
    store = createStore(
        rootReducer,
        applyMiddleware(
            historyMiddleware,
            sagaMiddleware
        )
    );
}

export { store, history };