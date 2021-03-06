import React from 'react';
import styles from './player.module.css'
import { ButtonIcon } from '../../components/button';
import { ReactComponent as PrevIcon } from '../../assets/prev.svg';
import { ReactComponent as PlayIcon } from '../../assets/play.svg';
import { ReactComponent as PauseIcon } from '../../assets/pause.svg';
import { ReactComponent as VolumeIcon } from '../../assets/volume.svg';
import { Range } from '../../components/range/range';
import { durationToMMSS } from '../../utils/time';
import { getUrl } from '../../api/urls';

export class Player extends React.Component {
    state = {
        timePercent: 0,
        volumePercent: 0.5,
    }

    Player = null;
    volumeMultiplier = 0.2;

    componentDidMount = () => {
        this.interval = setInterval(this.timer, 500);
    }

    componentWillMount = () => {
        clearInterval(this.interval);
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.currentSong && prevProps.currentSong.id !== this.props.currentSong.id) {
            if (this.Player) {
                this.Player.pause();
                this.Player.src = '';
                this.Player = null;
            }
            this.setState({ timePercent: 0 }, this.startPlaying);
        } else if (prevProps.isPlaying && !this.props.isPlaying) {
            this.stopPlaying();
        } else if (this.props.isPlaying && !prevProps.isPlaying) {
            this.startPlaying();
        }
    }

    onPlayButtonClick = () => {
        const { isPlaying } = this.props;
        if (isPlaying) {
            this.stopPlaying();
        } else {
            this.startPlaying();
        }
    }

    startPlaying = () => {
        if (this.props.currentSong) {
            this.props.startPlaying();
            if (this.Player) {
                this.setCurrentTime();
                this.Player.play();
            } else {
                this.Player = new Audio(getUrl(this.props.currentSong.url));
                this.Player.addEventListener('loadeddata', () => {
                    this.Player.play();
                    this.Player.volume = this.state.volumePercent * this.volumeMultiplier;
                    this.setCurrentTime();
                })
                this.Player.addEventListener('ended', () => {
                    this.setState({ timePercent: 0 });
                    this.props.nextSong();
                })
            }
            
        }
    }

    stopPlaying = () => {
        if (this.props.currentSong && this.Player) {
            this.Player.pause();
            this.props.stopPlaying();
        }
    }

    setTime = (timePercent) => {
        this.setState({ timePercent }, () => {
            if (!this.props.isPlaying && !this.Player) {
                this.startPlaying()
            } else {
                this.setCurrentTime();
            }
        });
    }

    setVolume = (volumePercent) => {
        this.setState({ volumePercent }, () => {
            if (this.Player) {
                this.Player.volume = this.state.volumePercent * this.volumeMultiplier;
            }
        });
    }

    setCurrentTime = () => {
        const duration = this.Player.duration;
        if (!Number.isNaN(duration)) {
            this.Player.currentTime = parseFloat(this.state.timePercent * duration);
        } else {
            setTimeout(this.setCurrentTime, 100);
        }
    }

    timer = () => {
        if (this.props.isPlaying && !this.Player.paused && this.Player.duration) {
            const { duration, currentTime } = this.Player;
            const timePercent = +((currentTime / duration).toFixed(3));
            this.setState({ timePercent });
        }
    }

    render() {
        const { isPlaying, nextSong, prevSong } = this.props;
        const duration = this.Player && this.Player.duration ? durationToMMSS(this.Player.duration) : "0:00"
        const currentTime = this.Player && this.Player.currentTime ? durationToMMSS(this.Player.currentTime) : "0:00"
        return (
            <>
                <div className={styles.container}>
                    <div className={styles.controls}>
                        <ButtonIcon>
                            <PrevIcon onClick={prevSong} className={styles.prevIcon} />
                        </ButtonIcon>
                        <ButtonIcon onClick={this.onPlayButtonClick}>
                            <div className={styles.controlsPlay}>
                                {isPlaying ? (
                                    <PauseIcon className={styles.pauseIcon} />
                                ) : (
                                    <PlayIcon className={styles.playIcon} />
                                )}
                            </div>
                        </ButtonIcon>
                        <ButtonIcon>
                            <PrevIcon onClick={nextSong} className={styles.nextIcon} />
                        </ButtonIcon> 
                    </div>
                    <div className={styles.soundline}>
                        <div className={styles.soundTime}>{currentTime}</div>
                        <Range
                            onChange={this.setTime}
                            value={this.state.timePercent}
                        />
                        <div className={styles.soundTime}>{duration}</div>
                    </div>
                </div>
                <div className={styles.volume}>
                    <div className={styles.volumeContainer}>
                        <ButtonIcon>
                            <VolumeIcon onClick={() => {}} className={styles.volumeIcon} />
                        </ButtonIcon>
                        <Range
                            onChange={this.setVolume}
                            value={this.state.volumePercent}
                        />
                    </div>
                </div>
            </>
        )
    }
}