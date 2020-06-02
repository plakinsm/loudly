import React from 'react';
import { Link } from 'react-router-dom';
import styles from './logout.module.css';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';
import { goToAuth } from '../../utils/auth';

export const Logout = () => (
    <div className={styles.container}>
        <Link to="/auth" onClick={(e) => {
            e.preventDefault();
            goToAuth();
        }} className={styles.link}>
            <LogoutIcon className={styles.icon} />
            Logout
        </Link>
    </div>
)