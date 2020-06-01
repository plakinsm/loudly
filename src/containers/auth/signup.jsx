import React from 'react';
import styles from './auth.module.css';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { TextInput, Button } from '../../components'
import { signUp } from '../../api/auth';
import { Link } from 'react-router-dom';

const required = (value) => value ? null : 'Поле должно быть заполнено.'
class SignUpCmp extends React.Component {
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <form className={styles.container} onSubmit={handleSubmit}>
                <Field
                    component={TextInput}
                    name="name"
                    type="text"
                    placeholder="Name"
                    label="Name"
                    validate={required}
                />
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
                        text="Sign up"
                        disabled={submitting}
                    />
                </div>
                <div className={styles.linkContainer}>
                    <Link to="/auth/signin" className={styles.link}>Already have an account?</Link>
                </div>
            </form>
        );
    }
}

export const SignUp = reduxForm({
    form: 'signup',
    onSubmit: (values, dispatch, props) => {
        return signUp(values, props.history)
            .then(response => {
                if (response.error) {
                    throw new SubmissionError(response.data);
                }
            })
    }
})(SignUpCmp)