export const FETCH_START = '@@fetchable/fetchStart';
export const FETCH_FINISH = '@@fetchable/fetchFinish';

export const fetchStart = (namespace) => ({
    type: FETCH_START,
    payload: { namespace }
})

export const fetchFinish = (namespace) => ({
    type: FETCH_FINISH,
    payload: { namespace }
})

export const doFetch = (namespace, request, { afterAction }) => (dispatch) => {
    dispatch(fetchStart(namespace))
    request
    .then((...result) => {
        dispatch(fetchFinish(namespace));
        if (afterAction) {
            dispatch(afterAction(...result));
        }
    })
}

export const isFetchingSelector = (namespace) => (state) => {
    return !!state.fetchable.namespaces.find((name) => name === namespace);
}

const initValues = {
    namespaces: []
};

export const fetchableReducer = (state = initValues, { type, payload }) => {
    switch (type) {
        case FETCH_START:
            return { ...state, namespaces: [...state.namespaces, payload.namespace] };
        case FETCH_FINISH:
            return { ...state, namespaces: state.namespaces.filter((namespace) => namespace !== payload.namespace) };
        default:
            return state;
    }
}