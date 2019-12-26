import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Root } from './containers/root/Root';

export const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Root} />
        </Switch>
    </BrowserRouter>
);

