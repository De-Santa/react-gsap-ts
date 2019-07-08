import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Showcase } from './routes/Showcase';
import * as serviceWorker from './serviceWorker';
import 'normalize.css';
import './styles/initial.scss';

ReactDOM.render(
    <Router>
        <Route path="/" exact component={Showcase} />
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();