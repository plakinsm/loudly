import React from 'react';
import styles from './main.module.css'
import { Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../../router/privat-route';
import { Library } from '../library/library';
import { Artist } from '../artist/artist';

export const Main = () => (
    <main className={styles.main}>
        <div className={styles.scroller}>
            <Switch>
                <PrivateRoute path="/library" component={Library} />
                <PrivateRoute path="/search" component={() => <h1>search</h1>} />
                <PrivateRoute path="/" exact component={() => <h1>Home</h1>} />
                <PrivateRoute path="/artist/:artistId" component={Artist} />
                {/* <Redirect to={{ pathname: '/' }} /> */}
            </Switch>
        </div>
    </main>
)