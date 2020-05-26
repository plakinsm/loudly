import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Root } from '../containers/root/root';
import { PrivateRoute } from './privat-route';
import { Auth } from '../containers/auth/auth';

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={Auth} />
            <PrivateRoute path="/" component={Root} />
        </Switch>
    </BrowserRouter>
);