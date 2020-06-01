const PUT_ALBUM = '@@album/putAlbum';
const CLEAR_ALBUM = '@@album/clearAlbum';

export const albumActionCreators = {
    putAlbum: (album) => (dispatch) => {
        dispatch({
            type: PUT_ALBUM,
            payload: { album }
        })
    },
    clearAlbum: () => (dispatch) => {
        dispatch({
            type: CLEAR_ALBUM,
            payload: {}
        })
    },
}

const initValues = {
    album: {}
}

export const albumReducer = (state = initValues, { type, payload }) => {
    switch (type) {
        case PUT_ALBUM:
            return { ...state, album: { ...payload.album } };
        case CLEAR_ALBUM:
            return initValues;
        default:
            return state;
    }
}