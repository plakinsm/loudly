import { uniq } from 'lodash';
import { goToAuth } from '../utils/auth';

export const FETCH_START = '@@fetchable/fetchStart';
export const FETCH_FINISH = '@@fetchable/fetchFinish';

export const fetchStart = (namespace) => ({
    type: FETCH_START,
    payload: { namespace }
})

export const fetchFinish = (namespace) => ({
    type: FETCH_FINISH,
    payload: { namespace }
});

const namespaceTimestamp = {};

export const doFetch = (namespace, request, { afterAction, disableLoading }) => (dispatch) => {
    let timestamp = Date.now();
    if (!disableLoading) {
        dispatch(fetchStart(namespace));
        namespaceTimestamp[namespace] = timestamp;
    }
    request
    .then((...result) => {
        if (namespaceTimestamp[namespace] === timestamp) {
            if (!disableLoading) {
                dispatch(fetchFinish(namespace));
            }
            if (afterAction) {
                dispatch(afterAction(...result));
            }
        }
    })
    .catch((result) => {
        if (namespaceTimestamp[namespace] === timestamp) {
            if (!disableLoading) {
                dispatch(fetchFinish(namespace));
            }
            if (result.response.status === 401) {
                goToAuth();
            }
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
            return { ...state, namespaces: uniq([...state.namespaces, payload.namespace]) };
        case FETCH_FINISH:
            return { ...state, namespaces: state.namespaces.filter((namespace) => namespace !== payload.namespace) };
        default:
            return state;
    }
}