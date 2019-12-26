import React from 'react';
import styles from './Navbar.module.css';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

export const Navbar = () => (
    <nav className={styles.nav}>
        <Logo />
        <Navigation />
    </nav>
)