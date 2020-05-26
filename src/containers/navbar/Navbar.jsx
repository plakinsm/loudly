import React from 'react';
import styles from './navbar.module.css';
import { Logo } from './logo';
import { Navigation } from './navigation';

export const Navbar = () => (
    <nav className={styles.nav}>
        <Logo />
        <Navigation />
    </nav>
)