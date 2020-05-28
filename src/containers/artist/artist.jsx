import React from 'react';
import { connect } from 'react-redux';
import styles from './artist.module.css';
import { isFetchingSelector } from '../../store/fetchable';
import { playerActionCreators } from '../../store/player';
import { bindActionCreators } from 'redux';
import { artistActionCreators } from '../../store/artist';
import { fetchForArtist } from '../../api/fetch';
import { Songlist } from '../../components/songlist';

class ArtistCmp extends React.Component {
    componentDidMount() {
        const { dispatch, putArtist, match: { params: { artistId } } } = this.props;
        dispatch(fetchForArtist(artistId, (artist) => {
            putArtist(artist.data);
        }))

    }
    render() {
        const {
            artist: {
                name,
                popular = []
            }
        } = this.props;
        console.log(this.props);
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerImage}></div>
                    <div className={styles.headerContent}>
                        <h1 className={styles.h1}>{name}</h1>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.popular}>
                        <h2 className={styles.h2}>Popular</h2>
                        <Songlist songs={popular} hideDetails {...this.props} />
                    </div>
                    <div className={styles.albums}>
                        <h2 className={styles.h2}>Albums</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export const Artist = connect(
    (state) => ({
        ...state.player,
        ...state.artist,
        fetching: isFetchingSelector('artist')(state)
    }),
    (dispatch) => ({
        ...bindActionCreators({
            ...playerActionCreators,
            ...artistActionCreators
        }, dispatch),
        dispatch
    })
)(ArtistCmp)