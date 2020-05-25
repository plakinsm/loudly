import React from 'react';
import styles from './button.module.css';

const primaryStyle = "buttonPrimary";
const secondaryStyle = "buttonSecondary";

export const Button = (props) => {
    const { text, primary, secondary, ...rest } = props;
    const styleName = (primary && primaryStyle) || (secondary && secondaryStyle) || primaryStyle;
    return (
        <div className={styles.container}>
            <button className={styles[styleName]} {...rest}>{text}</button>
        </div>
    )
};