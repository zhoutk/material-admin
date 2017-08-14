import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import App from './containers/App';
import Home from './components/Home';
import Stuff from './components/Stuff';
import Contact from './components/Contact';
import { Route } from 'react-router-dom';
import {store, history} from "./store"
import './index.css';

console.log(JSON.stringify(store.getState()));
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
