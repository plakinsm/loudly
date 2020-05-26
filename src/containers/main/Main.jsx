import React from 'react';
import styles from './main.module.css'
import { Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../../router/privat-route';
import { Library } from '../library/library';

export const Main = () => (
    <main className={styles.main}>
        <Switch>
            <PrivateRoute path="/library" component={Library} />
            <PrivateRoute path="/search" component={() => <h1>search</h1>} />
            <PrivateRoute path="/" exact component={() => <h1>Home</h1>} />
            {/* <Redirect to={{ pathname: '/' }} /> */}
        </Switch>
    </main>
)