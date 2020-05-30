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

export const goToAuth = () => {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    document.location.href = '/auth';
}

export const doFetch = (namespace, request, { afterAction, disableLoading }) => (dispatch) => {
    if (!disableLoading) {
        dispatch(fetchStart(namespace));
    }
    request
    .then((...result) => {
        if (!disableLoading) {
            dispatch(fetchFinish(namespace));
        }
        if (afterAction) {
            dispatch(afterAction(...result));
        }
    })
    .catch(({ response }) => {
        if (response.status === 401) {
            goToAuth();
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