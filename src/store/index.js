import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import { playerReducer as player } from './player';
import { userReducer as user } from './user';
import { libraryReducer as library } from './library';
import { fetchableReducer as fetchable } from './fetchable';

export const rootReducer = combineReducers({
    user,
    player,
    library,
    fetchable,
    form: formReducer
});