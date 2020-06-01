import React from 'react';
import styles from './songlist.module.css';
import { Song } from './song';

export class Songlist extends React.Component {
    onPlayButtonClick = (id) => {
        const { songs, currentSong, isPlaying, stopPlaying, startPlaying, startNewPlay } = this.props;
        if (currentSong && id === currentSong.id) {
            if (isPlaying) {
                return stopPlaying();
            }
            return startPlaying();
        }
        const song = songs.find(song => song.id === id)
        startNewPlay(songs, song);
    }

    renderList = () => {
        const { songs, currentSong, isPlaying, hideDetails, hideImage } = this.props;

        return songs.map(
            (song) => (
                <Song
                    key={song.id}
                    onPlayButtonClick={this.onPlayButtonClick}
                    isCurrentSong={currentSong && currentSong.id === song.id}
                    isPlaying={isPlaying}
                    hideDetails={hideDetails}
                    hideImage={hideImage}
                    {...song}
                />
            )
        )
    }

    render() {
        return (
            <div className={styles.container}>
                {this.renderList()}
            </div>
        )
    }
}