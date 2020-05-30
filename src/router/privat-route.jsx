import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const hasToken = () => {
    if (document.cookie.split(';').filter(function(item) {
        return item.trim().indexOf('TOKEN=') === 0
    }).length) {
        return true;
    }
    return false;
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            hasToken()
            ? (
                <Component {...props} />
            )
            : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )}
    />
)