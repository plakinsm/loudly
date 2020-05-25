import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import { userReducer as user } from './user';

export const rootReducer = combineReducers({
    user,
    form: formReducer
});