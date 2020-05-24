import React from 'react';
import { reduxForm } from 'redux-form';


@reduxForm({
    form: 'auth',
    onSubmit: (form) => {
        console.log(form);
    }
})
export @dec class Auth extends React.Component {
    render() {
        <div className="main"></div>
    }
}