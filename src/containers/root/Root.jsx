import React from 'react';
import styles from './Root.module.css'
import { Navbar } from '../navbar/Navbar';
import { Main } from '../main/Main';
import { Playbar } from '../playbar/Playbar';

export const Root = () => (
    <div className={styles.top}>
        <Navbar />
        <Main />
        <Playbar />
    </div>
)