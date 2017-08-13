import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { stateTransformer } from 'redux-seamless-immutable'
import { createStore, applyMiddleware,compose, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import rootReducer from './reducer';
import App from './containers/App';
import Home from './components/Home';
import Stuff from './components/Stuff';
import Contact from './components/Contact';
import './index.css';
import { Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware()
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

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>
                <Route exact path="/" component={Home} />
                <Route path="/stuff" component={Stuff} />
                <Route path="/contact" component={Contact} />
            </App>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
