// import { stateTransformer } from 'redux-seamless-immutable'
import { createStore, applyMiddleware,compose } from 'redux'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import Immutable from 'seamless-immutable';

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const loggerMiddleware = createLogger({
    collapsed:true,
    // stateTransformer: stateTransformer
});

const initialState = Immutable({});
let store;
if(process.env.NODE_ENV == "development") {
    store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(
            loggerMiddleware,
            historyMiddleware,
            sagaMiddleware
        ), window.devToolsExtension ? window.devToolsExtension() : f => f)
    );
}else{
    store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            historyMiddleware,
            sagaMiddleware
        )
    );
}

export { store, history };