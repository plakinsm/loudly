const PUT_RECOMMENDATIONS = '@@recomendations/PUT_RECOMMENDATIONS';
const CLEAR_RECOMMENDATIONS = '@@recomendations/CLEAR_RECOMMENDATIONS';

export const recommendationsActionCreators = {
    putRecommendations: (recommendations) => (dispatch) => {
        dispatch({
            type: PUT_RECOMMENDATIONS,
            payload: { recommendations }
        })
    },
    clearRecommendations: () => (dispatch) => {
        dispatch({
            type: CLEAR_RECOMMENDATIONS,
            payload: {}
        })
    },
}

const initValues = {
    recommendations: []
}

export const recommendationsReducer = (state = initValues, { type, payload }) => {
    switch (type) {
        case PUT_RECOMMENDATIONS:
            return { ...state, recommendations: [ ...payload.recommendations ] };
        case CLEAR_RECOMMENDATIONS:
            return initValues;
        default:
            return state;
    }
}