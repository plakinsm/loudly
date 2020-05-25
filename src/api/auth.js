import { get } from 'lodash';

const token = '23ergeft435cre2341cfvdta4gk2';

export const authorize = (data, history) => {
    return new Promise(resolve => setTimeout(() => {
        if (data.email !== '1') {
            resolve({
                data: {
                    email: 'User does not exist.'
                },
                error: true
            })
        } else if (data.password !== '1') {
            resolve({
                data: {
                    password: 'Wrong password.'
                },
                error: true
            })
        } else {
            localStorage.setItem('authToken', token);
            history.push(get(history, 'location.state.from', '/'), null);
            resolve({
                error: false,
                data: {
                    token
                }
            })
        }
    }, 1000))
}