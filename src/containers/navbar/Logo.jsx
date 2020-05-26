import React from 'react';
import { Link } from 'react-router-dom';
import styles from './logo.module.css';
import { ReactComponent as LogoImg } from '../../assets/logo.svg';

export const Logo = () => (
    <div className={styles.container}>
        <Link to="/" className={styles.link}>
            <LogoImg className={styles.img} />
            <h1 className={styles.text}>Loudly</h1>
        </Link>
    </div>
)