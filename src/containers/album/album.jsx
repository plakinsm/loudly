import React from 'react';
import { connect } from 'react-redux';
import styles from './album.module.css';
import { playerActionCreators } from '../../store/player';
import { bindActionCreators } from 'redux';
import { albumActionCreators } from '../../store/album';
import { fetchForAlbum } from '../../api/fetch';
import { Songlist } from '../../components/songlist';
import { Container } from '../../components/container/container';
import { Link } from 'react-router-dom';

class AlbumCmp extends React.Component {
    componentDidMount() {
        const {
            dispatch,
            putAlbum,
            match: { params: { albumId } },
            album = {}
        } = this.props;

        if (albumId && (album.id === undefined || (album.id && album.id !== albumId))) {
            dispatch(fetchForAlbum(albumId, (album) => {
                putAlbum(album.data);
            }))
        }
    }

    render() {
        const {
            album: {
                name,
                imageUrl,
                songs = [],
                artist = {},
                year
            },
        } = this.props;
        return (
            <Container namespace="album">
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.headerContent}>
                            <img className={styles.headerImage} src={imageUrl} alt="Logo" />
                            <div>
                                <span>Album</span>
                                <h1 className={styles.h1}>{name}</h1>
                                <div className={styles.info}>
                                    <Link to={`/artist/${artist.id}`} className={styles.infoArtist}>{artist.name}</Link>
                                    <span className={styles.infoSeparator}>•</span>
                                    <span>{year}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.main}>
                        <Songlist songs={songs} hideDetails hideImage {...this.props} />
                    </div>
                </div>
            </Container>
        )
    }
}

export const Album = connect(
    (state) => ({
        ...state.player,
        ...state.album,
    }),
    (dispatch) => ({
        ...bindActionCreators({
            ...playerActionCreators,
            ...albumActionCreators
        }, dispatch),
        dispatch
    })
)(AlbumCmp)