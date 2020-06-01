import { doFetch } from "../store/fetchable";
import { getUrl } from "./urls";
import Axios from "axios";

export const fetchForLibrary = (after) => (dispatch) => {
    dispatch(doFetch(
        'library',
        Axios.get(getUrl('/library')), 
        {
            afterAction: (result) => () => {
                after && after(result);
            }
        }
    ))
}

export const fetchForArtist = (id, after) => (dispatch) => {
    dispatch(doFetch(
        'artist',
        Axios.get(getUrl(`/artists/${id}`)), 
        {
            afterAction: (result) => () => {
                after && after(result);
            }
        }
    ))
}

export const fetchForAlbum = (id, after) => (dispatch) => {
    dispatch(doFetch(
        'album',
        Axios.get(getUrl(`/albums/${id}`)), 
        {
            afterAction: (result) => () => {
                after && after(result);
            }
        }
    ))
}

export const addSongToLibrary = (id, after) => (dispatch) => {
    dispatch(doFetch(
        'library',
        Axios.post(getUrl('/library'), { id }), 
        {
            disableLoading: true,
            afterAction: (result) => () => {
                after && after(result);
            }
        }
    ))
}

export const removeSongFromLibrary = (id, after) => (dispatch) => {
    dispatch(doFetch(
        'library',
        Axios.delete(getUrl('/library'), {
            data: { id }
        }), 
        {
            disableLoading: true,
            afterAction: (result) => () => {
                after && after(result);
            }
        }
    ))
}

export const fetchForRecommendations = (after) => (dispatch) => {
    dispatch(doFetch(
        'home',
        Axios.get(getUrl('/recommendations')), 
        {
            afterAction: (result) => () => {
                after && after(result);
            }
        }
    ))
}