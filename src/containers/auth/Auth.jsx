import React from 'react';
import styles from './auth.module.css';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { TextInput, Button } from '../../components'
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { authorize } from '../../api/auth';

const required = (value) => value ? null : 'Поле должно быть заполнено.'
class AuthCmp extends React.Component {
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div className={styles.main}>
                <div className={styles.logo}>
                    <Logo className={styles.logoImg} />
                    <h1>Loudly</h1>
                </div>
                
                <form className={styles.container} onSubmit={handleSubmit}>
                    <Field
                        component={TextInput}
                        name="email"
                        type="text"
                        placeholder="Email"
                        label="Email"
                        validate={required}
                    />
                    <Field
                        component={TextInput}
                        name="password"
                        type="password"
                        placeholder="Password"
                        label="Password"
                        validate={required}
                    />
                    <div className={styles.buttons}>
                        <Button
                            type="submit"
                            text="Log in"
                            disabled={submitting}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export const Auth = reduxForm({
    form: 'auth',
    onSubmit: (values, dispatch, props) => {
        return authorize(values, props.history)
            .then(response => {
                if (response.error) {
                    throw new SubmissionError(response.data);
                }
            })
    }
})(AuthCmp)