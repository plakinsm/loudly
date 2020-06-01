import React from 'react';
import styles from './auth.module.css';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SignIn } from './signin';
import { SignUp } from './signup';

export class Auth extends React.Component {
    render() {
        return (
            <div className={styles.main}>
                <div className={styles.logo}>
                    <Logo className={styles.logoImg} />
                    <h1>Loudly</h1>
                </div>
                <Switch>
                    <Route path="/auth/signin" component={SignIn} />
                    <Route path="/auth/signup" component={SignUp} />
                    <Redirect to="/auth/signin" />
                </Switch>
            </div>
        );
    }
}