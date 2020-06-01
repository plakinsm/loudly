import React from 'react';
import styles from './main.module.css'
import { Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../../router/privat-route';
import { Library } from '../library/library';
import { Artist } from '../artist/artist';
import { Album } from '../album/album';
import { Search } from '../search/search';

export const Main = () => (
    <main className={styles.main}>
        <div className={styles.scroller}>
            <Switch>
                <PrivateRoute path="/library" component={Library} />
                <PrivateRoute path="/search" component={Search} />
                <PrivateRoute path="/" exact component={() => <h1>Home</h1>} />
                <PrivateRoute path="/artist/:artistId" component={Artist} />
                <PrivateRoute path="/album/:albumId" component={Album} />
                {/* <Redirect to={{ pathname: '/' }} /> */}
            </Switch>
        </div>
    </main>
)