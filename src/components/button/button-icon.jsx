import React from 'react';
import styles from './button.module.css';

export const ButtonIcon = ({ children, ...rest }) => (
    <button className={styles.buttonIcon} {...rest}>{children}</button>
)