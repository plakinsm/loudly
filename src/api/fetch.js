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
                console.log(result);
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
                console.log(result);
                after && after(result);
            }
        }
    ))
}

export const removeSongFromLibrary = (id, after) => (dispatch) => {
    console.log(id);
    dispatch(doFetch(
        'library',
        Axios.delete(getUrl('/library'), {
            data: { id }
        }), 
        {
            disableLoading: true,
            afterAction: (result) => () => {
                console.log(result);
                after && after(result);
            }
        }
    ))
}