import React, { createElement } from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import DefaultLayout from './components/layout/Layout';
import {store, history} from "./store"
import './index.css';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Switch>
                    <Route exact path="/login" render={({ location }) => createElement(Login, {
                    })} />
                    <Route path="/" render={() => createElement(DefaultLayout, {
                        title:"Usual admin",
                    })} />
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
