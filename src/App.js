import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

export const App = () => (
    <div className="page">
        <BrowserRouter>
            <Switch>
                <Route path="/" render={() => (<h1>Hello!</h1>)} />
            </Switch>
        </BrowserRouter>
    </div>
);

