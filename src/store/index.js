import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import { playerReducer as player } from './player';
import { userReducer as user } from './user';

export const rootReducer = combineReducers({
    user,
    player,
    form: formReducer
});