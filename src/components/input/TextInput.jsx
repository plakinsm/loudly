import React from 'react';
import styles from './input.module.css';

export const TextInput = (props) => {
    const { meta, input, label, ...rest } = props;
    return (
        <div className={styles.container}>
            {label && <label>{label}</label>}
            <input className={styles.textInput} {...input} { ...rest }/>
            {meta.touched && meta.error && <span className={styles.error}>{meta.error}</span>}
        </div>
    )
};