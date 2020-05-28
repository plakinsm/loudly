const PUT_ARTIST = '@@artst/putArtist';
const CLEAR_ARTIST = '@@artist/clearArtist';

export const artistActionCreators = {
    putArtist: (artist) => (dispatch) => {
        dispatch({
            type: PUT_ARTIST,
            payload: { artist }
        })
    },
    clearArtist: () => (dispatch) => {
        dispatch({
            type: CLEAR_ARTIST,
            payload: {}
        })
    },
}

const initValues = {
    artist: {}
}

export const artistReducer = (state = initValues, { type, payload }) => {
    switch (type) {
        case PUT_ARTIST:
            return { ...state, artist: { ...payload.artist } };
        case CLEAR_ARTIST:
            return initValues;
        default:
            return state;
    }
}