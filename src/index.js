import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Home from './components/Home';
import Stuff from './components/Stuff';
import Contact from './components/Contact';
import './index.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <App>
            <Route exact path="/" component={Home} />
            <Route path="/stuff" component={Stuff} />
            <Route path="/contact" component={Contact} />
        </App>
    </Router>,
    document.getElementById('root')
);
