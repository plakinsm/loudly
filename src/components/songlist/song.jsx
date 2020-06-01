import React from 'react';
import styles from './song.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as PlayIcon } from '../../assets/play.svg';
import { ReactComponent as PauseIcon } from '../../assets/pause.svg';
import { getUrl } from '../../api/urls';
import { durationToMMSS } from '../../utils/time';

export class Song extends React.PureComponent {
    render() {
        const {
            name,
            artist,
            album,
            onPlayButtonClick,
            id,
            isCurrentSong,
            isPlaying,
            duration,
            hideDetails,
            hideImage
        } = this.props;
        const Icon = !isCurrentSong ? PlayIcon : (isPlaying ? PauseIcon : PlayIcon)

        return (
            <div className={isCurrentSong ? styles.containerActive : styles.container}>
                <div className={styles.main}>
                    <Icon onClick={() => onPlayButtonClick(id)} className={styles.play} />
                    {!hideImage && (
                        <img className={styles.logo} src={getUrl(album.imageUrl)} alt="Logo" />
                    )}
                    <div className={styles.info}>
                        <span className={styles.title}>{name}</span>
                        {!hideDetails && (
                             <div className={styles.credits}>
                                <Link className={styles.link} to={`/artist/${artist.id}`}>{artist.name}</Link>
                                <span className={styles.linkSeparator}>•</span>
                                <Link className={styles.link} to={`/album/${album.id}`}>{album.name}</Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.right}>
                    <span>{durationToMMSS(duration)}</span>
                </div>
            </div>
        )
    }
}