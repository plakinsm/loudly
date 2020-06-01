const PUT_SEARCH_RESULTS = '@@search/PUT_SEARCH_RESULTS';
const CLEAR_SEARCH = '@@album/CLEAR_SEARCH';

export const searchActionCreators = {
    putSearchResults: (results) => (dispatch) => {
        dispatch({
            type: PUT_SEARCH_RESULTS,
            payload: { results }
        })
    },
    clearSearch: () => (dispatch) => {
        dispatch({
            type: CLEAR_SEARCH,
            payload: {}
        })
    },
}

const initValues = {
    results: {
        songs: [],
        artists: [],
        albums: []
    }
}

export const searchReducer = (state = initValues, { type, payload }) => {
    switch (type) {
        case PUT_SEARCH_RESULTS:
            return { ...state, results: { ...payload.results } };
        case CLEAR_SEARCH:
            return initValues;
        default:
            return state;
    }
}