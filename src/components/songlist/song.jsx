import React from 'react';
import styles from './song.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Icon } from '../../assets/play.svg';

export class Song extends React.PureComponent {
    render() {
        console.log(this.props);
        const { name, artist, album, onPlayButtonClick, id } = this.props;
        return (
            <div className={this.props.playing ? styles.containerActive : styles.container}>
                <div className={styles.main}>
                    <Icon onClick={() => onPlayButtonClick(id)} className={styles.play} />
                    <img className={styles.logo} src={album.iconUrl} alt="Logo" />
                    <div className={styles.info}>
                        <span className={styles.title}>{name}</span>
                        <div className={styles.credits}>
                            <Link className={styles.link} to={`/artist/${artist.id}`}>{artist.name}</Link>
                            <span className={styles.linkSeparator}>—</span>
                            <Link className={styles.link} to={`/album/${album.id}`}>{album.name}</Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}