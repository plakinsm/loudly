import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Root } from '../containers/root/Root';
import { PrivateRoute } from './PrivatRoute';
import { Auth } from '../containers/auth/Auth';

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute path="/" exact component={Root} />

            <Route path="/login" component={Auth} />
        </Switch>
    </BrowserRouter>
);