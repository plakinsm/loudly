const START_NEW_PLAY = '@@user/startPlay';
const STOP_PLAYING = '@@player/pauseSong';
const START_PLAYING = '@@player/unpauseSong';
const NEXT_SONG = '@@player/nextSong';
const PREV_SONG = '@@player/prevSong';
const PUT_SONG_FROM_LOCAL_STORAGE = '@@player/PUT_SONG_FROM_LOCAL_STORAGE';


export const playerActionCreators = {
    putSongFromLocalStorage: (playlist, currentSong = null) => ({
        type: PUT_SONG_FROM_LOCAL_STORAGE,
        payload: {
            playlist,
            currentSong
        }
    }),
    startNewPlay: (playlist, currentSong = null) => (dispatch) => {
        localStorage.setItem('currentSong', JSON.stringify({currentSong, playlist}));
        dispatch({
            type: START_NEW_PLAY,
            payload: {
                playlist,
                currentSong
            }
        });
    },
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
        case PUT_SONG_FROM_LOCAL_STORAGE:
            return { ...state, currentSong: payload.currentSong || payload.playlist[0], playlist: payload.playlist }
        case START_NEW_PLAY:
            return { ...state, isPlaying: true, currentSong: payload.currentSong || payload.playlist[0], playlist: payload.playlist };
        case STOP_PLAYING:
            return { ...state, isPlaying: false };
        case START_PLAYING:
            return { ...state, isPlaying: true };
        case NEXT_SONG: {
            const { playlist, currentSong } = state;
            if (playlist.length) {

                let nextIndex = playlist.findIndex((song) => song.id === currentSong.id) + 1;
                if (nextIndex >= playlist.length) {
                    nextIndex = 0;
                }
                return { ...state, currentSong: playlist[nextIndex] }
            }
            return { ...state, isPlaying: false };
        };
        case PREV_SONG: {
            const { playlist} = state;
            if (playlist.length) {
                let nextIndex = playlist.findIndex((song) => song.id === payload.currentSong.id) - 1;
                if (nextIndex < 0) {
                    nextIndex = playlist.length - 1;
                } 
                return { ...state, currentSong: playlist[nextIndex] }
            }
            return { ...state, isPlaying: false };
        };
        default:
            return state;
    }
}