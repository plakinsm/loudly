import Axios from 'axios';
import { getUrl } from './urls';

export const signIn = (data, history) => {
    return new Promise((resolve) => {
        Axios.post(getUrl('/auth/signin'), {
            email: data.email,
            password: data.password
        }).then(({ data, status }) => {
            if (status === 200 && data.error) {
                if (data.data) {
                    resolve({
                        data: data.data,
                        error: true
                    })
                } else {
                    resolve({
                        data: {
                            password: data.message || 'Something went wrong.'
                        },
                        error: true
                    })
                }
            } else if (status === 201) {
                localStorage.clear();
                document.location.href = '/';
            }
        })
    })
}

export const signUp = (data, history) => {
    return new Promise((resolve) => {
        Axios.post(getUrl('/auth/signup'), {
            name: data.name,
            email: data.email,
            password: data.password,
        }).then(({ data, status }) => {
            if (status === 200 && data.error) {
                if (data.data) {
                    resolve({
                        data: data.data,
                        error: true
                    })
                } else {
                    resolve({
                        data: {
                            password: data.message || 'Something went wrong.'
                        },
                        error: true
                    })
                }
            } else if (status === 201) {
                localStorage.clear();
                document.location.href = '/';
            }
        })
    })
}