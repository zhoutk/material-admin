import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { combineReducers, routerReducer, stateTransformer } from 'redux-seamless-immutable'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import App from './containers/App';
import Home from './components/Home';
import Stuff from './components/Stuff';
import Contact from './components/Contact';
import './index.css';
import {BrowserRouter as Router,Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const middleware = routerMiddleware(history)

const rootReducer = combineReducers({
    routing: routerReducer
});

const loggerMiddleware = createLogger({
    collapsed:true,
    stateTransformer: stateTransformer
});

const store = createStore(
    rootReducer,
    applyMiddleware(
        loggerMiddleware,
        middleware
    )
);

render(
    <Provider store={store}>
        <Router history={history}>
            <App>
                <Route exact path="/" component={Home} />
                <Route path="/stuff" component={Stuff} />
                <Route path="/contact" component={Contact} />
            </App>
        </Router>
    </Provider>,
    document.getElementById('root')
);
