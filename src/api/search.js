import { doFetch } from "../store/fetchable";
import { getUrl } from "./urls";
import Axios from "axios";


let globalTimestamp;
export const searchFetch = (query, after) => (dispatch) => {
    let timestamp = Date.now();
    globalTimestamp = timestamp;
    dispatch(doFetch(
        'search',
        Axios.get(getUrl('/search'), {
            params: {
                query
            }
        }), 
        {
            afterAction: (result) => () => {
                if (globalTimestamp === timestamp) {
                    after && after(result);
                }
            }
        }
    ))
}