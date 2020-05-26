import React from 'react';
import './app.css';
import { Router } from './router/router';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const App = () => (
    <Provider store={store} > 
        <Router />
    </Provider>
);

