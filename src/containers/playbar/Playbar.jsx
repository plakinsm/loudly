import React from 'react';
import styles from './playbar.module.css'
import { connect } from 'react-redux';
import { playerActionCreators } from '../../store/player';
import { Link } from 'react-router-dom';
import { ButtonIcon } from '../../components/button';
import { ReactComponent as LikeIcon } from '../../assets/like.svg';
import { ReactComponent as LikeActiveIcon } from '../../assets/like-active.svg';
import { libraryActionCreators } from '../../store/library';
import { getUrl } from '../../api/urls';
import { Player } from './player';

const defaultAlbumCoverUrl = '/files/covers/default.png';

class PlaybarСmp extends React.Component {
    render() {
        const { currentSong, library, addSongToLibrary, removeSongFromLibrary } = this.props;
        const imageUrl = getUrl(currentSong ? currentSong.album.imageUrl : defaultAlbumCoverUrl);
        const name = currentSong && currentSong.name;
        const artist = currentSong && currentSong.artist;
        const album = currentSong && currentSong.album;
        const inPlaylist = currentSong && library.songs.find((song) => song.id === currentSong.id);
        return (
            <div className={styles.playbar}>
                <div className={styles.container}>
                    <div className={styles.info}>
                        <img className={styles.logo} src={imageUrl} alt="Logo" />
                        {
                            currentSong && (
                                <>
                                    <div className={styles.songInfo}>
                                        <Link className={styles.title} to={`/album/${album.id}`}>{name}</Link>
                                        <div className={styles.credits}>
                                            <Link className={styles.artist} to={`/artist/${artist.id}`}>{artist.name}</Link>
                                        </div>
                                    </div>
                                    <ButtonIcon onClick={() => inPlaylist ? removeSongFromLibrary(currentSong) : addSongToLibrary(currentSong)}>
                                        {inPlaylist ? (
                                            <LikeActiveIcon className={styles.iconActive} />
                                        ) : (
                                            <LikeIcon className={styles.icon} />
                                        )}
                                    </ButtonIcon>                                
                                </>
                            )
                        }
                    </div>
                    <Player {...this.props} />
                    <div className={styles.volume}></div>
                </div>
            </div>
        )
    }
}

export const Playbar = connect(
    (state) => ({
        library: state.library,
        ...state.player,
    }),
    {
        ...playerActionCreators,
        ...libraryActionCreators
    }
)(PlaybarСmp);