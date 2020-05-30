import { get } from 'lodash';
import axios from 'axios';

export const authorize = (data, history) => {
    return new Promise((resolve) => {
        axios.post('/auth/signin', {
            email: data.email,
            password: data.password
        }).then(({ data, status }) => {
            if (status === 200 && data.error) {
                resolve({
                    data: {
                        password: data.message
                    },
                    error: true
                })
            } else if (status === 200 && !data.error) {
                document.location.href = '/';
            }
        })
    })
}