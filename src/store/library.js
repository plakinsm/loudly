const ADD_SONG = '@@library/addSongToLibrary';
const REMOVE_SONG = '@@library/removeSongFromLibrary';
const PUT_SONGS = '@@library/putSongsToLibrary';

export const libraryActionCreators = {
    addSongToLibrary: (song) => (dispatch) => {
        console.log(dispatch);
        dispatch({
            type: ADD_SONG,
            payload: { song }
        })
    },
    removeSongFromLibrary: (song) => ({
        type: REMOVE_SONG,
        payload: { song }
    }),
    putSongsToLibrary: (songs) => ({
        type: PUT_SONGS,
        payload: { songs }
    }),
}

const initValues = {
    songs: []
}

export const libraryReducer = (state = initValues, { type, payload }) => {
    switch (type) {
        case ADD_SONG:
            return { ...state, songs: [payload.song, ...state.songs] };
        case REMOVE_SONG:
            return { ...state, songs: state.songs.filter(({ id }) => id !== payload.song.id) };
        case PUT_SONGS:
            return { ...state, songs: payload.songs };
        default:
            return state;
    }
}