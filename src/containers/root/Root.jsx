import React from 'react';
import styles from './root.module.css'
import { Navbar } from '../navbar/navbar';
import { Main } from '../main/main';
import { Playbar } from '../playbar/playbar';

export const Root = () => (
    <div className={styles.top}>
        <Navbar />
        <Main />
        <Playbar />
    </div>
)