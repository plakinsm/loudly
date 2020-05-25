const PUT_USER = '@@user/putUser';
const REMOVE_USER = '@@user/removeUser';

export const putUser = (user) => ({
    type: PUT_USER,
    payload: {
        user
    }
})

export const removeUser = () => ({
    type: PUT_USER,
    payload: null
})


export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case PUT_USER:
            return { ...action.payload.user };
        case REMOVE_USER:
            return {};
        default:
            return state;
    }
}