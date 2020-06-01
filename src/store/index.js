import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import { playerReducer as player } from './player';
import { userReducer as user } from './user';
import { libraryReducer as library } from './library';
import { fetchableReducer as fetchable } from './fetchable';
import { artistReducer as artist } from './artist';
import { albumReducer as album } from './album';
import { searchReducer as search } from './search';
import { recommendationsReducer as recommendations } from './recommendations';

export const rootReducer = combineReducers({
    user,
    player,
    library,
    fetchable,
    artist,
    album,
    search,
    recommendations,
    form: formReducer
});