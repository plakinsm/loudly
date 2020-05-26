const START_NEW_PLAY = '@@user/startPlay';
const STOP_PLAYING = '@@player/pauseSong';
const START_PLAYING = '@@player/unpauseSong';
const NEXT_SONG = '@@player/nextSong';
const PREV_SONG = '@@player/prevSong';


export const playerActionCreators = {
    startNewPlay: (playlist, currentSong = null) => ({
        type: START_NEW_PLAY,
        payload: {
            playlist,
            currentSong
        }
    }),
    stopPlaying: () => ({
        type: STOP_PLAYING,
        payload: {}
    }),
    startPlaying: () => ({
        type: START_PLAYING,
        payload: {}
    }),
    nextSong: () => ({
        type: NEXT_SONG,
        payload: {}
    }),
    prevSong: () => ({
        type: PREV_SONG,
        payload: {}
    }),
}

const initValues = {
    playlist: [],
    currentSong: null,
    isPlaying: false
}

export const playerReducer = (state = initValues, { type, payload }) => {
    switch (type) {
        case START_NEW_PLAY:
            return { ...state, isPlaying: true, currentSong: payload.currentSong || payload.playlist[0], playlist: payload.playlist };
        case STOP_PLAYING:
            return { ...state, isPlaying: false };
        case START_PLAYING:
            return { ...state, isPlaying: true };
        case NEXT_SONG: {
            const { playlist} = state;
            let nextIndex = playlist.findIndex((song) => song.id = payload.currentSong.id) + 1;
            if (nextIndex >= playlist.length) {
                nextIndex = 0;
            } 
            return { ...state, currentSong: playlist[nextIndex] }
        };
        case PREV_SONG: {
            const { playlist} = state;
            let nextIndex = playlist.findIndex((song) => song.id = payload.currentSong.id) - 1;
            if (nextIndex < 0) {
                nextIndex = playlist.length - 1;
            } 
            return { ...state, currentSong: playlist[nextIndex] }
        };
        default:
            return state;
    }
}