import React from 'react';
import styles from './songlist.module.css';
import { Song } from './song';

export class Songlist extends React.Component {
    static defaultProps = {
        songs: [
            {
                id: 1,
                name: 'Deamons',
                artist: {
                    id: 0,
                    name: 'Imagine Dragons',
                },
                album: {
                    id: 0,
                    name: 'Night Visions',
                    iconUrl: 'http://localhost:5000/files/0.jpeg',
                },
                duration: 185,
            },
            {
                id: 2,
                name: 'Radioactive',
                artist: {
                    id: 0,
                    name: 'Imagine Dragons',
                },
                album: {
                    id: 0,
                    name: 'Night Visions',
                    iconUrl: 'http://localhost:5000/files/0.jpeg',
                },
                duration: 195,
            },
        ]
    }

    onPlayButtonClick = (id) => {
        const { songs, currentSong, isPlaying, stopPlaying, startPlaying, startNewPlay } = this.props;
        if (id === currentSong.id) {
            if (isPlaying) {
                return stopPlaying();
            }
            return startPlaying();
        }
        startNewPlay(songs, songs.find(song => song.id === id))
    }

    renderList = () => {
        const { songs, currentSong } = this.props;

        return songs.map(
            (song) => (
                <Song
                    key={song.id}
                    onPlayButtonClick={this.onPlayButtonClick}
                    playing={currentSong && currentSong.id === song.id}
                    {...song}
                />
            )
        )
    }

    componentDidMount() {
        this.props.startNewPlay(this.props.songs, this.props.songs[0]);
    }

    render() {
        console.log(this.props);
        return (
            <div className={styles.container}>
                {this.renderList()}
            </div>
        )
    }
}