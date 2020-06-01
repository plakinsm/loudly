import React from 'react';
import styles from './main.module.css'
import { Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../../router/privat-route';
import { Library } from '../library/library';
import { Artist } from '../artist/artist';
import { Album } from '../album/album';
import { Search } from '../search/search';
import { Home } from '../home/home';
import { fetchForLibrary, fetchForRecommendations } from '../../api/fetch';
import { libraryActionCreators } from '../../store/library';
import { playerActionCreators } from '../../store/player';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { recommendationsActionCreators } from '../../store/recommendations';

class MainCmp extends React.Component {
    componentDidMount() {
        this.props.dispatch(
            fetchForLibrary((result) => this.props.putSongsToLibrary(result.data.library))
        );
        this.props.dispatch(
            fetchForRecommendations((recomendations) => this.props.putRecommendations(recomendations.data))
        );
        const { playlist, currentSong } = localStorage.getItem('currentSong') ?
            JSON.parse(localStorage.getItem('currentSong')) : {}
        if (playlist && currentSong) {
            this.props.putSongFromLocalStorage(playlist, currentSong);
        }
    }

    render() {
        return  (
            <main className={styles.main}>
                <div className={styles.scroller}>
                    <Switch>
                        <PrivateRoute path="/" exact >
                            <Redirect to="/library" />
                        </PrivateRoute>
                        <PrivateRoute path="/home" component={Home} />
                        <PrivateRoute path="/search" component={Search} />
                        <PrivateRoute path="/library" component={Library} />
                        <PrivateRoute path="/artist/:artistId" component={Artist} />
                        <PrivateRoute path="/album/:albumId" component={Album} />
                        {/* <Redirect to={{ pathname: '/' }} /> */}
                    </Switch>
                </div>
            </main>
        )
    }
}

export const Main = connect(
    () => ({}),
    (dispatch) => ({
        ...bindActionCreators({
            ...playerActionCreators,
            ...libraryActionCreators,
            ...recommendationsActionCreators
        }, dispatch),
        dispatch
    })
)(MainCmp)