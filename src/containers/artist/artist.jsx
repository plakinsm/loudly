import React from 'react';
import { connect } from 'react-redux';
import styles from './artist.module.css';
import { playerActionCreators } from '../../store/player';
import { bindActionCreators } from 'redux';
import { artistActionCreators } from '../../store/artist';
import { fetchForArtist } from '../../api/fetch';
import { Songlist } from '../../components/songlist';
import { Cards } from '../../components/cards/cards';
import { Container } from '../../components/container/container';

class ArtistCmp extends React.Component {
    componentDidMount() {
        const {
            dispatch,
            putArtist,
            match: { params: { artistId } },
            artist = {}
        } = this.props;

        if (artistId && (artist.id === undefined || (artist.id && artist.id !== artistId))) {
            dispatch(fetchForArtist(artistId, (artist) => {
                putArtist(artist.data);
            }))
        }
    }

    render() {
        const {
            artist: {
                name,
                imageUrl,
                popular = [],
                albums
            }
        } = this.props;
        return (
            <Container namespace="artist">
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.headerImage} style={{ backgroundImage: `url(${imageUrl})` }}></div>
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
                            <Cards cards={albums} />
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

export const Artist = connect(
    (state) => ({
        ...state.player,
        ...state.artist,
    }),
    (dispatch) => ({
        ...bindActionCreators({
            ...playerActionCreators,
            ...artistActionCreators
        }, dispatch),
        dispatch
    })
)(ArtistCmp)