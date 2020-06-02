import React from 'react';
import styles from './auth.module.css';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { TextInput, Button } from '../../components'
import { signIn } from '../../api/auth';
import { Link } from 'react-router-dom';

const required = (name) => (value) => value ? null : `${name} is required.`;
class SignInCmp extends React.Component {
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <form className={styles.container} onSubmit={handleSubmit}>
                <Field
                    component={TextInput}
                    name="email"
                    type="text"
                    placeholder="Email"
                    label="Email"
                    validate={required('Email')}
                />
                <Field
                    component={TextInput}
                    name="password"
                    type="password"
                    placeholder="Password"
                    label="Password"
                    validate={required('Password')}
                />
                <div className={styles.buttons}>
                    <Button
                        type="submit"
                        text="Sign in"
                        disabled={submitting}
                    />
                </div>
                <div className={styles.linkContainer}>
                    <Link to="/auth/signup" className={styles.link}>Don't have an account?</Link>
                </div>
            </form>
        );
    }
}

export const SignIn = reduxForm({
    form: 'signin',
    onSubmit: (values, dispatch, props) => {
        return signIn(values, props.history)
            .then(response => {
                if (response.error) {
                    throw new SubmissionError(response.data);
                }
            })
    }
})(SignInCmp)