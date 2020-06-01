import { addSongToLibrary, removeSongFromLibrary } from "../api/fetch";

const ADD_SONG = '@@library/addSongToLibrary';
const REMOVE_SONG = '@@library/removeSongFromLibrary';
const PUT_SONGS = '@@library/putSongsToLibrary';

export const libraryActionCreators = {
    addSongToLibrary: (song) => (dispatch) => {
        dispatch(addSongToLibrary(song.id, (result) => {
            dispatch({
                type: PUT_SONGS,
                payload: { songs: result.data.library }
            });
        }));
        dispatch({
            type: ADD_SONG,
            payload: { song }
        })
    },
    removeSongFromLibrary: (song) => (dispatch) => {
        dispatch(removeSongFromLibrary(song.id, (result) => {
            dispatch({
                type: PUT_SONGS,
                payload: { songs: result.data.library }
            })
        }));
        dispatch({
            type: REMOVE_SONG,
            payload: { song }
        })
    },
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